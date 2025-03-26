import React from "react";
import { useNavigate } from "react-router-dom"; 
// import "./Cgu.css";

const MentionsLegales = () => {
  const navigate = useNavigate();


 return (
   <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
     <div className="Cgu-container">
       <h1 className="Cgu-title mb-4 text-xl tracking-tight font-medium text-center text-black">Mentions Légales</h1>

       <div className="Cgu-content">
       <h2>1. Editeur</h2>
           <div className="flex flex-col">
           <p>
             Les repas de Lili </p>
             <p>
             Adresse: Marseille </p>
             <p>
             Tel: </p>
             <p>
             Email: </p>
             <p>
             SIRET: RCS: </p>
             <p>
             Date d'immatriculation RCS:
           </p>
           </div>

           <h2>2. Responsable de la publication</h2>
           <div className="flex flex-col">
           <p>
             La Plateforme
           </p>
           </div>

           <h2>3. Réalisation du site internet</h2>
           <div className="flex flex-col">
           <p>
             La Plateforme </p>
             <p>
             Adresse: </p>
             <p>
             Tel: </p>
             <p>
             Email: Web:

           </p>
           </div>

           <h2>4. Ebergement du site internet</h2>
           <div className="flex flex-col">
             <p>
             OVH </p>
             <p>
             Adresse: </p>
             <p>
             Tel: </p>
             <p>
             Web:
           </p>
           </div>

           <h2>5. Protection des données personnelles</h2>
<div className="flex flex-col">
    <p>
        Toutes les données que vous nous confiez le sont afin de pouvoir traiter vos commandes.
    </p>
    <p>
        En vertu de la loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, vous disposez auprès de ROSELLO LAURENT, 572 CHEMIN DU HAUT COULOUBRIER, 0610 AURIBEAU SUR SIAGNE, FRANCE ou en adressant un mail à <a href="mailto:armurerieross@gmail.com">armurerieross@gmail.com</a> d’un droit de rectification, de consultation, de modification et de suppression des données que vous nous avez communiquées. Ce droit peut également être exercé en ligne.
    </p>
    <p><strong>FORMULAIRE DE LIMITATION DU TRAITEMENT DE VOS DONNÉES</strong></p>
    <p><strong>FORMULAIRE DROIT À L'OUBLI</strong></p>
    <p><strong>FORMULAIRE PORTABILITÉ DE VOS DONNÉES</strong></p>
</div>


         </div>

       {/* Boutons */}
       <div className="flex justify-between mt-6">
          <button className="btn" onClick={() => navigate(-1)}>RETOUR</button>
         
       </div>
    </div>
   </div>
 );
};

export default MentionsLegales;
