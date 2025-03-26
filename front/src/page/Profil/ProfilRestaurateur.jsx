import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilRestaurateur.css";

const ProfilRestaurateur = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nomRestaurant: "Le République",
    telephone: "0906006699",
    email: "anguyenvan@gmail.com",
    responsable: "Alfred Dufour",
    numeroResponsable: "065852462",
    siret: "784 671 695 00087",
    repasAn: "450",
    adresse: "37 Boulevard De La République, Marseille, 13000",
  });

  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
    option7: false,
    option8: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="profil-container">
      <h1 className="profil-title">Profil Restaurant</h1>

      <div className="profil-header">
        <div className="profil-info">
          <div className="profil-grid">
            <label>Nom Restaurant</label>
            <input
              type="text"
              name="nomRestaurant"
              value={formData.nomRestaurant}
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

            <label>Nom Du Responsable</label>
            <input
              type="text"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Numéro Du Responsable</label>
            <input
              type="text"
              name="numeroResponsable"
              value={formData.numeroResponsable}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Numéro De SIRET</label>
            <input
              type="text"
              name="siret"
              value={formData.siret}
              onChange={handleChange}
              readOnly={!isEditing}
            />

            <label>Nombre De Repas / An</label>
            <input type="text" name="repasAn" value={formData.repasAn} readOnly />
          </div>
        </div>
      </div>

      <div className="profil-controls">
        <div className="profil-status">
          <span>Status</span>
          <div className="status-buttons">
            <button
              className={isOpen ? "btn-open active" : "btn-open"}
              onClick={() => setIsOpen(true)}
            >
              Ouvert
            </button>
            <button
              className={!isOpen ? "btn-closed active" : "btn-closed"}
              onClick={() => setIsOpen(false)}
            >
              Fermé
            </button>
          </div>
        </div>

        <div className="dropdown-container">
          <div className="dropdown">
            <button className="dropdown-btn">Choisir ses options</button>
            <ul className="dropdown-menu">
              <li>
                <input
                  type="checkbox"
                  name="option1"
                  checked={checkboxes.option1}
                  onChange={handleCheckboxChange}
                />{" "}
                Vegan
              </li>
              <li>
                <input
                  type="checkbox"
                  name="option2"
                  checked={checkboxes.option2}
                  onChange={handleCheckboxChange}
                />{" "}
                Flexitarien
              </li>
              <li>
                <input
                  type="checkbox"
                  name="option3"
                  checked={checkboxes.option3}
                  onChange={handleCheckboxChange}
                />{" "}
                Halal
              </li>
              <li>
                <input
                  type="checkbox"
                  name="option4"
                  checked={checkboxes.option4}
                  onChange={handleCheckboxChange}
                />{" "}
                Sans Gluten
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button className="dropdown-btn">Type de Cuisine</button>
            <ul className="dropdown-menu">
              <li>
                <input
                  type="checkbox"
                  name="option5"
                  checked={checkboxes.option5}
                  onChange={handleCheckboxChange}
                />{" "}
                Thai
              </li>
              <li>
                <input
                  type="checkbox"
                  name="option6"
                  checked={checkboxes.option6}
                  onChange={handleCheckboxChange}
                />{" "}
                Chinois
              </li>
              <li>
                <input
                  type="checkbox"
                  name="option7"
                  checked={checkboxes.option7}
                  onChange={handleCheckboxChange}
                />{" "}
                Japonais
              </li>
              <li>
                <input
                  type="checkbox"
                  name="option8"
                  checked={checkboxes.option8}
                  onChange={handleCheckboxChange}
                />{" "}
                Africain
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="profil-address">
        <h2>ADRESSE</h2>
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

      <div className="profil-menu">
        <button className="btn-menu" onClick={() => navigate("#")}>
          Voir le menu
        </button>
      </div>
    </div>
  );
};

export default ProfilRestaurateur;
