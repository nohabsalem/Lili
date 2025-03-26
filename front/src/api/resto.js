import axios from "axios";

const API_URL = "http://localhost:3000/api/resto"; // Vérifie que c'est bien l'URL correcte de ton backend

//  Récupérer tous les restaurants
export const getResto = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("Données récupérées :", response.data); // Debugging
    return Array.isArray(response.data) ? response.data : response.data.resto || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des restaurants :", error);
    return [];
  }
};

// Supprimer un restaurant par ID
export const deleteResto = async (restoId) => {
  try {
    await axios.delete(`${API_URL}/${restoId}`);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
};


// Mettre à jour un restaurant
export const updateResto = async (restoId, restoData) => {
  try {
    const response = await axios.put(`${API_URL}/${restoId}`, restoData);  
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
};

//  Créer un nouveeau restaurant
export const createResto = async (restoData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, restoData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du restaurant :", error);
  }
};

// Récupérer les réservations d'un restaurant par son ID
// export const getReservationsByResto = async (restoId) => {
//   try {
//     const response = await axios.get(`${API_URL}/${restoId}/reservations`);
//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des réservations :", error);
//     throw error;
//   }
// };

//http://localhost:3000/api/reservation

export const getReservationsByResto = async (restoId) => {
  try {
    const response = await axios.get(`${API_URL}/reservation/${restoId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    throw error;
  }
};
