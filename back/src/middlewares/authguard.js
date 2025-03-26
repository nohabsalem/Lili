import { verify } from "hono/jwt";
import { createMiddleware } from "hono/factory";
import env from "../config/env.js";
import authService from "../services/auth.service.js";

export function authGuard(roles) {
	return createMiddleware(async (c, next) => {
		const [prefix, token] = c.req.header("Authorization")?.split(" ") || [
			null,
			undefined,
		];
		if (prefix !== "Bearer") {
			return c.json({ error: "Token manquant dans le 'Bearer' " }, 401);
			//throw new Error("Invalid token prefix");
		}
		if (!token) {
			return c.json({ error: "Vous devez être connecté pour pour accéder à cette fonctionnalité." }, 401);
			//throw new Error(
			//	"You must be authenticated to access this resource"
			//);
		}
		try {
			const decoded = (await verify(token, env.JWT_SECRET));
			if (!decoded) {
				//throw new Error("Invalid Payload");
				return c.json({ error: "Format de données incorrect. " }, 401);
			}

			const user = await authService.findUserByEmail(decoded.email);
			if (user && roles.includes(user.role)) {
				c.set("user", user);
				await next();
			} else {
				return c.json({ error: "Vous n'avez pas les permissions requises." }, 401);
				await next();
				//throw new Error(
				//"Permission denied, you are not authorized to access this resource");
			}
		} catch (error) {
			return c.json({
				error: "Flop (erreur interne)"
			}, 401);
		}
	})
}
