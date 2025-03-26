
// import axios from "axios";
// import { AuthGuard } from "@/components/ui/authGuard";

// const API_URL = "http://localhost:3000/api/reservation";
// const role = localStorage.getItem("role");

// console.log(role);
// if (role) {
//   localStorage.setItem("role", role);
// }

// // Récupérer toutes les réservations
// export const getAllReservations = async () => {
//   try {
//     const response = await axios.get(API_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });
//     console.log("Données récupérées :", response.data);
//     return Array.isArray(response.data) ? response.data : response.data.reservations || [];
//   } catch (error) {
//     console.error("Erreur lors de la récupération des réservations :", error.response?.data || error.message);
//     throw new Error("Erreur lors de la récupération des réservations.");
//   }
// };

// // Supprimer une réservation par ID
// export const deleteReservation = async (reservationId) => {
//   try {
//     await axios.delete(`${API_URL}/${reservationId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     console.log(`Réservation avec ID ${reservationId} supprimée avec succès.`);
//   } catch (error) {
//     console.error("Erreur lors de la suppression de la réservation :", error.response?.data || error.message);
//     throw new Error("Erreur lors de la suppression de la réservation.");
//   }
// };

// // Mettre à jour une réservation
// export const updateReservation = async (reservationId, updatedData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${reservationId}`, updatedData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });
//     console.log(`Réservation avec ID ${reservationId} mise à jour avec succès.`);
//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour de la réservation :", error.response?.data || error.message);
//     throw new Error("Erreur lors de la mise à jour de la réservation.");
//   }
// };

// // Créer une nouvelle réservation
// export const createReservation = async (reservationData) => {
//   try {
//     console.log("Données de réservation envoyées :", reservationData); // Pour le débogage
//     const response = await axios.post(API_URL, reservationData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });
//     console.log("Nouvelle réservation créée :", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de la création de la réservation :", error.response?.data || error.message);
//     throw new Error("Erreur lors de la création de la réservation.");
//   }
// };

import axios from "axios";

const API_URL = "http://localhost:3000/api/reservation";
const role = localStorage.getItem("role");
const token = localStorage.getItem("accessToken");

console.log("Rôle utilisateur :", role);

// Vérifier si l'utilisateur est ADMIN
const isADMIN = role === "ADMIN";

// Fonction pour récupérer toutes les réservations
export const getAllReservations = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log("Données récupérées :", response.data);
    return Array.isArray(response.data) ? response.data : response.data.reservations || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error.response?.data || error.message);
    throw new Error("Erreur lors de la récupération des réservations.");
  }
};

// Fonction pour supprimer une réservation
export const deleteReservation = async (reservationId) => {
  if (!isADMIN) {
    throw new Error("Accès refusé : seuls les ADMINistrateurs peuvent supprimer une réservation.");
  }

  try {
    await axios.delete(`${API_URL}/${reservationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`Réservation avec ID ${reservationId} supprimée avec succès.`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation :", error.response?.data || error.message);
    throw new Error("Erreur lors de la suppression de la réservation.");
  }
};

// Fonction pour mettre à jour une réservation
export const updateReservation = async (reservationId, updatedData) => {
  if (!isADMIN) {
    throw new Error("Accès refusé : seuls les ADMINistrateurs peuvent mettre à jour une réservation.");
  }

  try {
    const response = await axios.put(`${API_URL}/${reservationId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log(`Réservation avec ID ${reservationId} mise à jour avec succès.`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réservation :", error.response?.data || error.message);
    throw new Error("Erreur lors de la mise à jour de la réservation.");
  }
};

// Fonction pour créer une nouvelle réservation
export const createReservation = async (reservationData) => {
  if (!isADMIN) {
    throw new Error("Accès refusé : seuls les ADMINistrateurs peuvent créer une réservation.");
  }

  try {
    console.log("Données de réservation envoyées :", reservationData);
    const response = await axios.post(API_URL, reservationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log("Nouvelle réservation créée :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la réservation :", error.response?.data || error.message);
    throw new Error("Erreur lors de la création de la réservation.");
  }
};
