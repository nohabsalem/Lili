import { sign, verify } from 'hono/jwt';
import db from '../config/database.js';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/email.js';
import { decodeToken, generateToken } from '../utils/jwt.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import env from '../config/env.js';


async function deleteUser(userId) {
  console.log("userId:", userId)
  const query = 'DELETE FROM users WHERE id = ?';
  const result = db.prepare(query).run(userId);
  return result.changes > 0; // returns true if an user was deleted, false if no user was found
}

async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = ?';
  const result = await db.prepare(query).get(email);
  return result;
}

async function findUserById(userId) {
  const query = 'SELECT id, firstname, lastname, role FROM users WHERE id = ?';
  const result = await db.prepare(query).get(userId);
  return result;
}

async function findAllUsers() {
  const query = 'SELECT * FROM users';
  const result = await db.prepare(query).all();
  return result;
}

async function createUser(data) {
  const query = `
    INSERT INTO users (email, password, firstname, lastname, role, created_at, verified )
    VALUES (?, ?, ?, ?, ?, ?, ? )`;
  const values = [data.email, data.password, data.firstname, data.lastname, data.role, 0];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
}

async function updateUser(userId, data) {
  const setClauses = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    setClauses.push(`${key} = ?`);
    values.push(value);
  });
  values.push(userId);

  const query = `
    UPDATE users 
    SET ${setClauses.join(', ')}
    WHERE id = ?
  `;

  await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
}

async function register(data) {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);
  data.password = hashedPassword;
  const user = await createUser(data);

  // Send verification email
  sendVerificationEmail(user.email);

  return user;
}

async function login(email, password) {
  //Trouve l'utilisateur en fonction de son mail
  const user = await findUserByEmail(email);
  //Si l'utilisateur n'existe pas ou le mdp de correspond pas
  if (!user || !(await comparePassword(password, user.password))) {
    //Éxécute une erreur
    throw new Error("Invalid credentials");
  }
  //Si l'utilisateur n'a pas été vérifié : 
  if (!user.verified) throw new Error("user-not-verified");
  //Me renvoie l'user avec son token
  const { accessToken, refreshToken } = await generateToken(user);
  return { accessToken, refreshToken, role: user.role };
}

async function verifyEmail(token) {
  try {
    const decodedToken = await decodeToken(token);
    console.log("decodedToken:", decodedToken);
    if (decodedToken == null) throw new Error("token couldn't be decoded");

    const user = await findUserByEmail(decodedToken.email);
    if (!user) throw new Error("User not found");

    const updatedUser = await updateUser(user.id, { verified: 1 });
    console.log("updatedUser:", updatedUser);
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function forgotPassword(email) {
  const user = await findUserByEmail(email);
  if (!user) {
    return true;
  }

  const resetToken = await sign(
    {
      id: user.id,
      email: user.email,
      type: "password-reset",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    env.JWT_SECRET
  );

  // Store the reset token in the database
  await updateUser(user.id, {
    reset_token: resetToken
  });

  // Send password reset email
  await sendPasswordResetEmail(user.email, resetToken);

  return true;
}

async function resetPassword(token, newPassword) {
  // Verify token
  const decoded = await verify(token, env.JWT_SECRET);
  if (!decoded) {
    throw new Error("Invalid or expired reset token");
  }

  // Find user with valid reset token
  const user = await findUserByEmail(decoded.email);
  if (!user || user.reset_token !== token) {
    throw new Error("Invalid or expired reset token");
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update user password and clear reset token
  await updateUser(user.id, {
    password: hashedPassword,
    reset_token: null
  });

  return true;
}

async function sendEmailVerification(email) {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  await sendVerificationEmail(email);
}


export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  sendEmailVerification,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findAllUsers
};
