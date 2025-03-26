import reservationService from '../services/reservation.service.js';
import { z } from 'zod';

// console.log("Chargement du fichier reservation.controller.js");

// Schéma de validation avec Zod
const reservationSchema = z.object({
  client: z.string().min(1, "Le champ client est requis."),
  phone: z.string().min(10, "Le champ téléphone doit avoir au moins 10 caractères."),
  association: z.string().min(1, "Le champ association est requis."),
  meal: z.number().int().positive("Le champ repas doit être un nombre positif."),
  date: z.string(),
  comments: z.string().optional(),
  status: z.enum(["En attente", "Confirmé", "Annulé"]).default("En attente"),
});

// Créer une nouvelle réservation
const createReservation = async (c) => {
  try {
    console.log("[CREATE] Requête reçue pour créer une réservation");
    const data = await c.req.json();
    console.log("[CREATE] Données reçues :", data);

    // Validation des données
    reservationSchema.parse(data);

    // Appel au service pour créer la réservation
    const createdReservation = await reservationService.createReservation(data);

    console.log("[CREATE] Réservation créée avec succès");
    return c.json({ message: 'Réservation créée avec succès.', reservation: createdReservation }, 201);
  } catch (error) {
    console.error("[CREATE] Erreur :", error);
    // Gestion des erreurs de validation
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation échouée', details: error.errors }, 400);
    }
    // Autres erreurs de création
    return c.json({ error: 'Échec de la création de la réservation.', details: error.message }, 500);
  }
};

// Récupérer toutes les réservations
const getAllReservations = async (c) => {
  try {
    console.log("[GET ALL] Récupération de toutes les réservations");
    const reservations = await reservationService.getReservations();
    console.log("[GET ALL] Réservations récupérées :", reservations);

    // Assurez-vous que les données de réservation sont un tableau
    return c.json(
      {
        reservations,
      },
      201
    );
  } catch (error) {
    console.error("[GET ALL] Erreur :", error);
    return c.json({ error: 'Échec de la récupération des réservations.', details: error.message }, 500);
  }
};

// Récupérer une réservation par ID
const getReservationById = async (c) => {
  const id = c.req.param('id');
  try {
    console.log("[GET BY ID] Recherche de la réservation avec ID :", id);
    const reservation = await reservationService.getReservationById(id);

    if (reservation) {
      console.log("[GET BY ID] Réservation trouvée :", reservation);
      return c.json(reservation, 200);
    } else {
      console.log("[GET BY ID] Aucune réservation trouvée pour cet ID");
      return c.json({ error: 'Réservation non trouvée.' }, 404);
    }
  } catch (error) {
    console.error("[GET BY ID] Erreur :", error);
    return c.json({ error: 'Échec de la récupération de la réservation.', details: error.message }, 500);
  }
};

// Mettre à jour une réservation
const updateReservation = async (c) => {
  const id = c.req.param('id');
  try {
    console.log("[UPDATE] Mise à jour de la réservation avec ID :", id);
    const parsedBody = await c.req.json();
    console.log("[UPDATE] Données reçues :", parsedBody);

    // Validation des données (partielle)
    const validatedData = reservationSchema.partial().parse(parsedBody);
    const updatedReservation = await reservationService.updateReservation(id, validatedData);

    console.log("[UPDATE] Réservation mise à jour avec succès");
    return c.json({ message: 'Réservation mise à jour avec succès.', reservation: updatedReservation }, 200);
  } catch (error) {
    console.error("[UPDATE] Erreur :", error);
    // Gestion des erreurs de validation
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation échouée', details: error.errors }, 400);
    }
    return c.json({ error: 'Échec de la mise à jour de la réservation.', details: error.message }, 500);
  }
};

// Supprimer une réservation
const deleteReservation = async (c) => {
  const id = c.req.param('id');
  try {
    console.log("[DELETE] Suppression de la réservation avec ID :", id);
    const success = await reservationService.deleteReservation(id);

    if (success) {
      console.log("[DELETE] Réservation supprimée avec succès");
      return c.json({ message: 'Réservation supprimée avec succès.' }, 200);
    } else {
      console.log("[DELETE] Aucune réservation trouvée pour cet ID");
      return c.json({ error: 'Réservation non trouvée.' }, 404);
    }
  } catch (error) {
    console.error("[DELETE] Erreur :", error);
    return c.json({ error: 'Échec de la suppression de la réservation.', details: error.message }, 500);
  }
};

// Exportation des fonctions du contrôleur
export {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};