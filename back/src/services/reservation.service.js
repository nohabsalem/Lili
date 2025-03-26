import db from '../config/database.js';

async function createReservation(reservationData) {
  console.log("[CREATE] Tentative de création d'une réservation avec :", reservationData);

  const { client, phone, association, meal, date, comments, status } = reservationData;
  
  // Vérifiez que toutes les données nécessaires sont présentes
  console.log("[CREATE] Données à insérer :", { client, phone, association, meal, date, comments, status });
  
  const query = `INSERT INTO reservations (client, phone, association, meal, date, comments, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  try {
    const result = db.prepare(query).run(client, phone, association, meal, date, comments || null, status || "Non spécifié");
    console.log("[CREATE] Réservation créée avec l'ID :", result.lastInsertRowid);

    return db.prepare('SELECT * FROM reservations WHERE id = ?').get(result.lastInsertRowid);
  } catch (error) {
    console.error("[CREATE] Erreur lors de la création :", error);
    throw error;
  }
}

async function getReservations() {
  console.log("[GET ALL] Récupération de toutes les réservations");
  
  try {
    const reservations = db.prepare('SELECT * FROM reservations').all();
    
    return reservations;
  } catch (error) {
    throw error;
  }
}

async function getReservationById(id) {

  try {
    const reservation = db.prepare('SELECT * FROM reservations WHERE id = ?').get(id);
    if (reservation) {
      console.log("[GET BY ID] Réservation trouvée :", reservation);
    } else {
      console.log("[GET BY ID] Aucune réservation trouvée pour cet ID");
    }
    
    return reservation;
  } catch (error) {
    console.error("[GET BY ID] Erreur lors de la récupération :", error);
    throw error;
  }
}

async function updateReservation(id, reservationData) {
  console.log("[UPDATE] Mise à jour de la réservation avec ID :", id);
  console.log("[UPDATE] Données reçues :", reservationData);

  const setClauses = [];
  const values = [];

  Object.entries(reservationData).forEach(([key, value]) => {
    setClauses.push(`${key} = ?`);
    values.push(value);
  });

  if (setClauses.length === 0) {
    console.error("[UPDATE] Aucune donnée fournie pour la mise à jour.");
    throw new Error("Aucune donnée à mettre à jour");
  }

  values.push(id);
  const query = `UPDATE reservations SET ${setClauses.join(', ')} WHERE id = ?`;

  try {
    db.prepare(query).run(...values);
    console.log("[UPDATE] Réservation mise à jour avec succès");
    
    return db.prepare('SELECT * FROM reservations WHERE id = ?').get(id);
  } catch (error) {
    console.error("[UPDATE] Erreur lors de la mise à jour :", error);
    throw error;
  }
}

async function deleteReservation(id) {
  console.log("[DELETE] Suppression de la réservation avec ID :", id);

  try {
    const result = db.prepare('DELETE FROM reservations WHERE id = ?').run(id);
    if (result.changes > 0) {
      console.log("[DELETE] Réservation supprimée avec succès");
      return true;
    } else {
      console.log("[DELETE] Aucune réservation trouvée pour cet ID");
      return false;
    }
  } catch (error) {
    console.error("[DELETE] Erreur lors de la suppression :", error);
    throw error;
  }
}

export default {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
