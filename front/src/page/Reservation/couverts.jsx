import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurantType.css";

const RestaurantType = () => {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState("");
  const [covers, setCovers] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCheckboxChange = (value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [value]: !prev[value], // Toggle sélection
    }));
  };

  // Incrémenter/décrémenter le nombre de couverts
  const handleCoversChange = (increment) => {
    setCovers((prev) => Math.max(1, prev + increment)); // Minimum 1 couvert
  };

  // Liste des catégories
  const categories = {
    Type: ["Fast Food", "Restaurant", "Brasserie", "Buffet"],
    Choix: ["Vegan", "Sans Gluten", "Halal"],
    Spécialités: [
      "Créole",
      "Méditerranéenne",
      "Africaine",
      "Pizza",
      "Indienne",
      "Asiatique",
      "Poisson",
      "Libanaise",
      "Sur place",
      "A emporter",
    ],
  };

  // Fonction pour filtrer les restaurants
  const handleFilterRestaurants = () => {
    // Récupérer les options sélectionnées
    const selectedChoices = Object.keys(selectedOptions).filter(
      (key) => selectedOptions[key]
    );

    // Envoyer les filtres à l'API ou à une fonction de filtrage
    console.log("Filtres sélectionnés :", selectedChoices);
    console.log("Code postal :", postalCode);
    console.log("Nombre de couverts :", covers);

    // Exemple : Rediriger vers la page des restaurants filtrés
    navigate("/page/restaurant-liste", {
      state: {
        filters: selectedChoices,
        postalCode,
        covers,
      },
    });
  };

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <div className="restaurant-type-container">
        {/* Boucle sur les catégories */}
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="category">
            <h2 className="category-title">{category}</h2>
            <div className="category-grid">
              {items.map((item) => (
                <label key={item} className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={!!selectedOptions[item]}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Code Postal & Nb de Couverts */}
        <div className="flex justify-between items-center text-lg font-semibold my-4">
          <div>
            <label>Code postal</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="input-postal"
            />
          </div>
          <div className="covers-container">
            <label>Nb de Couverts:</label>
            <button className="covers-btn" onClick={() => handleCoversChange(-1)}>-</button>
            <input
              type="number"
              value={covers}
              min="1"
              onChange={(e) => setCovers(Math.max(1, Number(e.target.value)))}
              className="covers-input"
            />
            <button className="covers-btn" onClick={() => handleCoversChange(1)}>+</button>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex justify-between mt-6">
          <button className="btn" onClick={() => navigate(-1)}>RETOUR</button>
          <button className="btn" onClick={handleFilterRestaurants}>VALIDER</button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantType;