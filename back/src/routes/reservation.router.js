import { Hono } from "hono";
import { authGuard } from "../middlewares/authguard.js";
import { ADMIN, RESTO } from "../config/const.js";
import { 
  createReservation, 
  getAllReservations,
  getReservationById, 
  updateReservation, 
  deleteReservation 
} from "../controllers/reservation.controller.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const reservationRouter = new Hono();

reservationRouter.get(
  "/", getAllReservations
);

reservationRouter.post(
  "/",
  authGuard([ADMIN, RESTO]),
  zValidator(
    "json",
    z.object({
      client: z.string().min(1),
      phone: z.string().min(10),
      association: z.string().min(1),
      meal: z.number().int().positive(),
      date: z.string(),
      comments: z.string().optional(),
      status: z.enum(["En attente", "confirmé", "annulé"]).default("En attente"),
    })
  ),
  createReservation
);

reservationRouter.get(
  "/:id",
  authGuard([ADMIN, RESTO]),
  zValidator("params", z.object({ id: z.coerce.number().int() })),
  async (c) => {
    try {
      const reservation = await getReservationById(c.req.params.id);
      if (!reservation) {
        return c.json({ error: "Réservation non trouvée." }, 404);
      }
      return c.json(reservation);
    } catch (error) {
      return c.json({ error: "Échec de la récupération de la réservation", details: error.message }, 500);
    }
  }
);

reservationRouter.put(
  "/:id",
  authGuard([ADMIN, RESTO]),
  zValidator("params", z.object({ id: z.coerce.number().int() })),
  zValidator(
    "json",
    z.object({
      client: z.string().optional(),
      phone: z.string().min(10).optional(),
      association: z.string().optional(),
      meal: z.number().int().positive().optional(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      comments: z.string().optional(),
      status: z.string().optional(),
    })
  ),
  async (c) => {
    try {
      const updateData = await c.req.json();
      await updateReservation(c.req.params.id, updateData);
      return c.json({ message: "Réservation mise à jour avec succès." });
    } catch (error) {
      return c.json({ error: "Échec de la mise à jour de la réservation", details: error.message }, 500);
    }
  }
);

reservationRouter.delete(
  "/:id",
  authGuard([ADMIN, RESTO]),
  zValidator("params", z.object({ id: z.coerce.number().int() })),
  async (c) => {
    try {
      await deleteReservation(c.req.params.id);
      return c.json({ message: "Réservation supprimée avec succès." });
    } catch (error) {
      return c.json({ error: "Échec de la suppression de la réservation", details: error.message }, 500);
    }
  }
);

export default reservationRouter;