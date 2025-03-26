import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getResto } from "@/api/resto";

const RestaurantListe = () => {
  const location = useLocation();
  const [resto, setResto] = useState([]);
  const [filteredResto, setFilteredResto] = useState([]);

  // Récupérer les filtres passés depuis RestaurantType
  const filters = location.state?.filters || [];
  const postalCode = location.state?.postalCode || "";
  const covers = location.state?.covers || 1;

  // Charger les restaurants
  useEffect(() => {
    getResto()
      .then((data) => {
        setResto(data);
        applyFilters(data, filters, postalCode, covers);
      })
      .catch((error) => console.error("Erreur lors de la récupération des restaurants", error));
  }, []);

  // Appliquer les filtres
  const applyFilters = (restaurants, filters, postalCode, covers) => {
    let filtered = restaurants;

    // Filtrer par code postal
    if (postalCode) {
      filtered = filtered.filter((r) => r.postalCode === postalCode);
    }

    // Filtrer par choix de cuisine et spécialités
    if (filters.length > 0) {
      filtered = filtered.filter((r) =>
        filters.every((filter) => r.cuisineTypes.includes(filter))
      );
    }

    setFilteredResto(filtered);
  };

  return (
    <div>
      <h1>Restaurants filtrés</h1>
      <ul>
        {filteredResto.map((r) => (
          <li key={r.id}>{r.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantListe;