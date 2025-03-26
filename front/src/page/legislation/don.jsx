import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Cgu.css";

const don = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <div className="Cgu-container">
        <h1 className="Cgu-title mb-4 text-xl tracking-tight font-medium text-center text-black">
          Faire un don
        </h1>

        <div className="Cgu-content">
          <h2>Je soutiens financièrement Lili</h2>
          <p>
          Grâce à votre générosité, nous pouvons fournir des repas aux bénéficaires des associations.
          </p>
          

          <h2>Comment faire un don?</h2>
          <p>
          Pour faire un don, il vous suffit de cliquer sur le lien ci-dessous
          </p>
          <p>
          💳 En ligne : <a href="https://www.helloasso.com/">Helloasso</a>
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

export default don;
