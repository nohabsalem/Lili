import env from '../config/env.js'
import { sign } from 'hono/jwt'
import { sendEmail } from './mailer.js'

/**
 * Sends a verification email to the user
 * @param userEmail The email address of the user
 * @returns Promise<boolean> True if email was sent successfully
 */
export async function sendVerificationEmail(userEmail) {
  const verificationToken = await sign(
    {
      email: userEmail,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
    },
    env.JWT_SECRET,
  )
  const verificationUrl = `http://127.0.0.1:3000/api/verify/${verificationToken}`
  const html = `
        <h1>Vérification de mail</h1>
        <p>Cliquez ci-dessous pour confirmer votre adresse mail:</p>
        <a href="${verificationUrl}">Confirmer mon email</a>
        <p>Ce lien expirera dans 24 heures.</p>
        <p>Si vous n'êtes pas à l'origine de ce mail, ignorez-le.</p>
      `
  try {
    await sendEmail(userEmail, 'Verify your email address', html)
    return true
  } catch (error) {
    console.error('Error sending verification email:', error)
    return false
  }
}

export async function sendPasswordResetEmail(email, resetToken) {
  const verificationUrl = `http://localhost:5173/confirmer-mot-de-passe?token=${resetToken}`;
  // const verificationUrl = `${env.APP_URL}/api/reset-password?token=${resetToken}`
  const html = `
        <h1>Réinitialisation du mot de passe </h1>
        <p>Cliquez sur le lien ci-dessous pour récupérer votre mot de passe :</p>
        <a href="${verificationUrl}">Créer mon nouveau mot de passe </a>
        <p>Ce lien expirera dans 24 heures.</p>
      `
  try {
    await sendEmail(email, 'Verify your email address', html)
    return true
  } catch (error) {
    console.error('Error sending verification email:', error)
    return false
  }
}

