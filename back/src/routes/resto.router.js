import { Hono } from "hono";
import { authGuard } from "../middlewares/authguard.js";
import { ADMIN, RESTO } from "../config/const.js";
import { create, getAll,updateResto, deleteResto, loginResto } from "../controllers/resto.controller.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
const restoRouter = new Hono();

restoRouter.get (
  "/", getAll
); 

restoRouter.post(
  "/register",
  zValidator(
    "json",
    z.object({
      siret: z.string(),
      name: z.string().min(2),
      phone_number: z.string().optional(),
      // email: z.string().email(), 
      // password: z.string().min(8),
    })
  ),
  create
);

// Route pour connecter un resto (login)
// restoRouter.post("/login", 
//  zValidator('json', z.object({
//     email: z.string().email(),
//     password: z.string().min(8),
//   })),
//   loginResto
// );

restoRouter.put(
  "/:restoId", zValidator('json',
    z.object({
      name: z.string(),
      siret: z.string(),
      phone_number: z.string().optional(),
      // type: z.string().optional(),
    })
  ),
  updateResto
);


restoRouter.delete(
  "/:restoId", deleteResto
);

export default restoRouter;
