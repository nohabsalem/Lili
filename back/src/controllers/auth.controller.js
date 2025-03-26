
import authService from '../services/auth.service.js'

async function register(c) {
  try {
    //Envoi du JSON
    const data = c.req.valid('json')
    await authService.register(data)
    //Promesses
    return c.json({
      message: 'Registration successful. Please check your email for verification.'
    }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Registration failed' }, 400)
  }
}

async function login(c) {
  try {
    const { email, password } = c.req.valid('json')
    const token = await authService.login(email, password)

    return c.json({ message: 'Login successful', token })
  } catch (error) {
    console.log("error:", error.message)

    return c.json({ error: error.message }, 401)
  }
}

async function forgotPassword(c) {
  try {
    const { email } = c.req.valid('json')
    await authService.forgotPassword(email)
    return c.json({
      message: 'Password reset instructions sent to your email'
    })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Password reset request failed' }, 400)
  }
}

async function sendVerification(c) {
  try {
    const { email } = c.req.valid('json')
    await authService.sendEmailVerification(email)
    return c.json({
      message: 'Veification Email Sent'
    })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Verification email couldnt be sent' }, 400)
  }
}

async function resetPassword(c) {
  try {
    const { token, password } = c.req.valid('json')
    await authService.resetPassword(token, password)
    return c.json({ message: 'Password successfully reset' })
  } catch (error) {
    console.error("error:", error)
    return c.json({ error: 'Password reset failed' }, 400)
  }
}

async function verifyUserEmail(c) {

  try {
    const token = c.req.param('token')
    console.log("token:", token)
    await authService.verifyEmail(token)
    return c.json({ message: 'Email verified successfully' })
  } catch (error) {
    console.log("error:", error)
    return c.json({ error: 'Email verification failed' }, 400)
  }
}

async function updateUser(c) {
  try {
    //Envoi du JSON
    const userId = c.req.param('userId')
    const data = c.req.valid('json')
    const user = await authService.findUserById(userId)

    if (!user) {
      return c.json({ error: "Données de l'utilisateur incorrectes." }, 400)
    }

    await authService.updateUser(userId, data)
    //Promesses
    return c.json({
      message: 'Modifications bien prises en compte.'
    }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Erreur lors des modifications' }, 400)
  }
}

async function deleteUser(c) {
  try {
    const id = c.req.param("userId"); // Correction de l'accès au paramètre
    const user = await authService.findUserById(id);

    if (!user) {
      return c.json(
        {
          message: "Utilisateur introuvable.",
        },
        404
      );
    }

    await authService.deleteUser(id);
    return c.json(
      {
        message: "Utilisateur supprimé avec succès !",
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json({ error: "Échec lors de la suppression." }, 400);
  }
}

async function findAllUsers(c) {
  try {
    const users = await authService.findAllUsers(); // Récupère les utilisateurs depuis la DB

    return c.json(
      {
        message: "Liste des utilisateurs récupérée avec succès.",
        users // Ici, `users` est directement le résultat de la requête SQL
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        error: "Échec lors de la récupération des utilisateurs."
      },
      500
    );
  }
}
async function getUserById(c) {
  try {
    const userId = c.req.param("userId");
    const user = await authService.findUserById(userId);
    if (!user) {
      return c.json(
        {
          message: "Utilisateur introuvable.",
        },
        404
      );
    }

    return c.json(
      {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        error: "Une erreur est survenue lors de la récupération de l'utilisateur.",
      },
      500
    );
  }
}

export default { register, verifyUserEmail, resetPassword, forgotPassword, login, sendVerification, updateUser, deleteUser, findAllUsers }

