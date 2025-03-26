
import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import authController from "../controllers/auth.controller.js";
import { authGuard } from "../middlewares/authguard.js";
import { ADMIN, AGENT, ASSO, RESTO, MANAGER } from "../config/const.js"
const authRouter = new Hono()

authRouter.post(
  "/register", zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(8),
      firstname: z.string().min(2),
      lastname: z.string().min(2),
      role: z.string().min(4)

    })
  ),
  authController.register
);

authRouter.post(
  "/login",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(8),
    })
  ),
  authController.login
);

authRouter.post(
  "/forgot-password",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
    })
  ),
  authController.forgotPassword
);

authRouter.post(
  "/reset-password",
  zValidator('json',
    z.object({
      token: z.string(),
      password: z.string().min(8),
    })
  ),
  authController.resetPassword
);

authRouter.post(
  "/send-verification",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
    })
  ),
  authController.sendVerification
);

authRouter.get(
  "/verify/:token",
  authController.verifyUserEmail
);

authRouter.put(
  "/users/:userId",
  // authGuard([MANAGER]), <--- Ne peut s'éxecuter qu'avez le rôle MANAGER (exemple)
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(8).optional(),
      firstname: z.string().min(2),
      lastname: z.string().min(2),
      role: z.string().min(2)
    })
  ),
  authController.updateUser
);


authRouter.delete(
  "/users/:userId", authController.deleteUser
);

authRouter.get(
  "/users", authController.findAllUsers
)

authRouter.get(
  "/users/:userId", authController.getUserById);

export default authRouter;
