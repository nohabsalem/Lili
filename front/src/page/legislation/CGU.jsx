import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Cgu.css";

const Cgu = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <div className="Cgu-container">
        <h1 className="Cgu-title mb-4 text-xl tracking-tight font-medium text-center text-black">
          Conditions Générales d'Utilisation
        </h1>

        <div className="Cgu-content">
          <h2>1. Introduction</h2>
          <p>
            Bienvenue sur notre plateforme. En utilisant ce site, vous acceptez les présentes conditions générales d'utilisation.
          </p>

          <h2>2. Accès au Service</h2>
          <p>
            L'accès à nos services est réservé aux utilisateurs ayant accepté ces conditions. L'utilisation du site est  gratuite mais peut inclure des fonctionnalités payantes.
          </p>

          <h2>3. Responsabilités</h2>
          <p>
            L'utilisateur est responsable de son usage du site. Toute fraude, tentative de piratage ou activité malveillante entraînera une suspension de compte.
          </p>

          <h2>4. Protection des Données</h2>
          <p>
            Nous collectons et traitons certaines données personnelles conformément à notre politique de confidentialité.
          </p>

          <h2>5. Modifications des CGU</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des mises à jour.
          </p>
        </div>

        {/* Boutons */}
        <div className="flex justify-between mt-6">
          <button className="btn" onClick={() => navigate(-1)}>RETOUR</button>
          
        </div>
      </div>
    </div>
  );
};

export default Cgu;
