import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./resaResto.css";
import { FileArchive } from "lucide-react";

const resaRestoVal = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHeure, setSelectedHeure] = useState(null);
  
  const [guests, setGuests] = useState(0);
  const [takeaway, setTakeaway] = useState(false);

  const dates = [23, 24, 25, 26, 27, 28, 29]; // Exemple de dates disponibles
  const heures = [10, 11, 12, 13, 19, 20, 21]; // Exemple d'heures disponibles

  const handleValidation = () => {
    navigate("/page/RestaurantListe");
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-8 bg-gray-100">
      <div className="resa-container">
      {/* <div className="resa-container mt-30"> */}
        

        <div className="resa-section flex flex-col items-center gap-6 mt-4">
          <button className="resa-btn w-48 rounded-lg ">(Nom Restaurant)</button>
          <button className="resa-btn w-48 rounded-lg ">(Nom Bénéficiaire)</button>
          <button className="resa-btn w-48 rounded-lg">(Prescripteur)</button>
        </div>
        

        <div className="resa-section">
  <h2 className="text-lg font-medium pl-6 mt-8 capitalize">
    Date de réservation - {new Date().toLocaleString("fr-FR", { month: "long" })}
  </h2>
  <div className="resa-dates flex gap-2 mt-8">
    {dates.map((day) => {
      // Convertir le jour en objet Date pourquoi?
      const dateObj = new Date();
      dateObj.setDate(day);
      
      // Pour mettre le jour de la semaine en français
      const weekday = dateObj.toLocaleString("fr-FR", { weekday: "short" });

      return (
        <button
          key={day}
          className={`resa-date p-2 rounded-full flex flex-col items-center justify-center ${
            selectedDate === day ? "bg-black text-green-400" : "bg-yellow-200"
          }`}
          onClick={() => setSelectedDate(day)}
        >
          <span className="font-bold">{day}</span>
          <span className="text-base text-bg-black mt-2">{weekday}</span> {/* mt-2 rend ovale la date*/}
        </button>
      );
    })}
  </div>
</div>



        <div className="resa-section">
        <h2 className="text-lg font-medium pl-6 mt-8">Heure de réservation</h2>
          <div className="resa-time items-center mt-8">
            {heures.map((hour) => (
              <button
                key={hour}
                className={`resa-time p-2 rounded-full ${selectedHeure === hour ? "bg-black text-green-400" : "bg-yellow-200"}`}
                onClick={() => setSelectedHeure(hour)}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>

       

      

        <div className="resa-section flex flex-col items-start w-full">
  <h2 className="text-lg font-medium pl-1 mt-8">Nombre de personnes</h2> {/* pl-1 décale vers la droite mt-8 augmente l'écart à la verticale*/}
  <div className="choix-beneficiaire">

      <div className="choix-bénéficiaire items-center mt-4 pl-6">

  <div className="flex gap-2 items-center mt-4 pl-6">
    <button className="resa-btn bg-gray-300 p-2 w-11 " onClick={() => setGuests(Math.max(0, guests - 1))}>-</button>
    <span className="text-lg font-bold">{guests}</span>
    <button className="resa-btn bg-gray-300 p-2 w-11" onClick={() => setGuests(guests + 1)}>+</button>
  </div>
</div>


        <div className="flex justify-end">
  <div className="resa-section flex flex-col gap-2 mt-4 pl-24">
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={!takeaway} onChange={() => setTakeaway(false)} /> Sur place
    </label>
    <label className="flex items-center gap-2 mt-5">
      <input type="checkbox" checked={takeaway} onChange={() => setTakeaway(true)} /> À emporter
    </label>
  </div>
    </div>  
    </div> 
  
    </div>

        <div className="resa-buttons flex justify-between mt-6">
          <button className="resa-btn w-40 bg-yellow-500 px-4 py-2 rounded-lg" onClick={() => navigate(-1)}>RETOUR</button>
          <button className="resa-btn w-40 bg-yellow-500 px-4 py-2" onClick={handleValidation}>SUIVANT</button>
        </div>
      </div>
    </div>
  );
};

export default resaRestoVal;

// Les boutons sont reroupé avec <resa-btn>
// pl-1 decale les class vers la droite 
// mt-8 augmente l'écart des class à la verticale, ça ser aussi à ovaliser la date ligne 53

// Reste a Faire:

// Mettre les bonne CSSCounterStyleRule, utiliser le CSS car la bonne teinte n'existe pas dans tailwin
// Mettre la possibilité de choisir un autre mois de réservation autre que le courant 
// Automatiser le bouton bénéficiaire
// Automatiser le bouton prescripteur, le nom de la personne connecté doit apparaitre
// Limité la selection du nombre de personne 


