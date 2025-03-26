import { Hono } from "hono";
import { authGuard } from "../middlewares/authguard.js";
import { ADMIN, ASSO } from "../config/const.js";
import { create, getAll, updateAsso, deleteAsso, loginAsso } from "../controllers/asso.controller.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
const assoRouter = new Hono();

assoRouter.get(
    "/", getAll
);

assoRouter.post(
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

assoRouter.put(
    "/:assoId", zValidator('json',
        z.object({
            name: z.string(),
            siret: z.string(),
            phone_number: z.string().optional(),
            // type: z.string().optional(),
        })
    ),
    updateAsso
);


assoRouter.delete(
    "/:assoId", deleteAsso
);

export default assoRouter;

