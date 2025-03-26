import axios from "axios";

const API_URL = "http://localhost:3000/api/asso"; // Vérifie que c'est bien l'URL correcte de ton backend

// Récupérer tous les associations
export const getAsso = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("Données récupérées :", response.data); // Debugging
    return Array.isArray(response.data) ? response.data : response.data.asso || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des associations :", error);
    return [];
  }
};

// Supprimer une association par ID
export const deleteAsso = async (assoId) => {
  try {
    await axios.delete(`${API_URL}/${assoId}`);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
};

// Mettre à jour une association
export const updateAsso = async (assoId, assoData) => {
  try {
    const response = await axios.put(`${API_URL}/${assoId}`, assoData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
};

// Créer une nouvelle association
export const createAsso = async (assoData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, assoData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'association :", error);
  }
};
