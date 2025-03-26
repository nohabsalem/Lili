import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilAsso.css";

const ProfilAsso = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nomAssociation: "La Petite Lili",
    telephone: "0906006699",
    email: "lapetitelili@gmail.com",
    responsable: "Alfred Dufour",
    numeroResponsable: "065852462",
    siret: "784 671 695 00087",
    repasAn: "450",
    adresse: "14 rue Mistral Marseille",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="profil-container">
      <h1 className="profil-title">Profil Association</h1>

      <div className="profil-header">
        <div className="profil-info">
          <div className="profil-grid">
            <label>Nom de l'Association</label>
            <input
              type="text"
              name="nomAssociation"
              value={formData.nomAssociation}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Nom du Responsable</label>
            <input
              type="text"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Numéro du Responsable</label>
            <input
              type="text"
              name="numeroResponsable"
              value={formData.numeroResponsable}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Numéro de SIRET</label>
            <input
              type="text"
              name="siret"
              value={formData.siret}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Nombre de Repas disponible par An</label>
            <input
              type="text"
              name="repasAn"
              value={formData.repasAn}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="profil-address">
        <h2>Adresse</h2>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </div>

      <div className="profil-actions">
        <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Annuler" : "Modifier"}
        </button>
        <button className="btn-save" onClick={() => setIsEditing(false)}>
          Sauvegarder
        </button>
      </div>

    </div>
  );
};

export default ProfilAsso;
