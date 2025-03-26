import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    nom: "",
    adresse: "",
    ville: "",
    codePostal: "",
    tel: "",
    mail: "",
    siret: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom du restaurant"
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="adresse"
          placeholder="Adresse"
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ville"
          placeholder="Ville"
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="codePostal"
          placeholder="Code Postal"
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="tel"
          placeholder="Téléphone"
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="mail"
          placeholder="E-mail"
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="siret"
          placeholder="Numéro SIRET"
          className="w-full p-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
