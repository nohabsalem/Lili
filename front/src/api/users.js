import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Vérifie que c'est bien l'URL correcte de ton backend

// 📌 Récupérer tous les utilisateurs
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    console.log("Données récupérées :", response.data); // Debugging
    return Array.isArray(response.data) ? response.data : response.data.users || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return [];
  }
};

// 📌 Supprimer un utilisateur par ID
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
  }
};

// 📌 Mettre à jour un utilisateur
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    con
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
};

// 📌 Créer un nouvel utilisateur
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
  }
};


// 📌 Pouvoir oublier le mot de passe
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation :", error);
    throw error;
  }
};

// 📌 Réinitialiser le mot de passe avec le TOKEN
export const resetPassword = async (token, password) => {  // Renommer newPassword -> password
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      password, // Changer newPassword -> password
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe :", error);
    throw error;
  }
};

// 📌 Obtenir un user et ses infos :
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;

  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error;
  }
};