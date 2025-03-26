import axios from "axios";

const API_URL = "http://localhost:3000/api/resto"; // URL de l'API

// Récupérer tous les restaurants
export const getResto = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("Données récupérées :", response.data);
    return Array.isArray(response.data) ? response.data : response.data.resto || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des restaurants :", error);
    return [];
  }
};