import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import du hook pour la navigation
import { getResto } from "@/api/resto";

const AssoChoixResto = () => {
  const [resto, setResto] = useState([]);
  const [selectedResto, setSelectedResto] = useState(null);
  const navigate = useNavigate(); // Hook pour la navigation

  // Charger les restaurants au montage du composant
  useEffect(() => {
    getResto()
      .then((data) => {
        console.log("Restaurants chargés :", data);
        setResto(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Erreur lors de la récupération des restaurants", error));
  }, []);

  // Sélectionner un restaurant
  const handleSelectResto = (resto) => {
    setSelectedResto(resto);
    console.log("Restaurant sélectionné :", resto);
  };

  // Redirection vers la page de réservation
  const handleReservation = () => {
    navigate("/association/RestaurantReservation"); // Redirige vers la bonne page
  };

  return (
    <div className="p-5 flex-1">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Liste des restaurants :</h1>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Téléphone</th>
            <th className="border border-gray-300 p-2">Type de nourriture</th>
            <th className="border border-gray-300 p-2">Type de cuisine</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resto.length > 0 ? (
            resto.map((r) => (
              <tr key={r.id} className="text-center">
                <td className="border border-gray-300 p-2">{r.name}</td>
                <td className="border border-gray-300 p-2">{r.phone_number}</td>
                <td className="border border-gray-300 p-2">{r.foodType}</td>
                <td className="border border-gray-300 p-2">{r.cuisineType}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleSelectResto(r)}
                    className="bg-[#3c7460] text-white px-3 py-1 rounded"
                  >
                    Sélectionner
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-2">
                Aucun restaurant détecté.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Afficher les détails du restaurant sélectionné */}
      {selectedResto && (
        <div className="mt-5 p-5 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Restaurant sélectionné :</h2>
          <p><strong>Nom :</strong> {selectedResto.name}</p>
          <p><strong>Téléphone :</strong> {selectedResto.phone_number}</p>
          <p><strong>Type de nourriture :</strong> {selectedResto.foodType}</p>
          <p><strong>Type de cuisine :</strong> {selectedResto.cuisineType}</p>
          <button 
            onClick={handleReservation}
            className="bg-[#3c7460] text-white px-3 py-1 rounded mt-3"
          >
            Réserver
          </button>
        </div>
      )}
    </div>
  );
};

export default AssoChoixResto;
