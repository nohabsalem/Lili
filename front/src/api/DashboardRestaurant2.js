import axios from "axios";

const API_URL = "http://localhost:3000/api/resto"; // URL de l'API

// Récupérer les informations d'un restaurant par son ID
export const getResto = async (restoId) => {
  try {
    const response = await axios.get(`${API_URL}/${restoId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du restaurant :", error);
    throw error;
  }
};

// Récupérer les réservations d'un restaurant par son ID
export const getReservationsByResto = async (restoId) => {
  try {
    const response = await axios.get(`${API_URL}/${restoId}/reservations`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    throw error;
  }
};

// Mettre à jour les informations d'un restaurant
export const updateResto = async (restoId, data) => {
  try {
    const response = await axios.put(`${API_URL}/${restoId}`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du restaurant :", error);
    throw error;
  }
};