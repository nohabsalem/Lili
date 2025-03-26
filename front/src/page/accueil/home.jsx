// import React from "react";
// import { Link } from "react-router-dom";
// import "./home.css";

// const HomeGuest = () => {
//   return (
//     <div className="home-guest">
//       <h1 className="home-title">Bienvenue sur Les Repas de Lili</h1>
//       <p className="home-description">
//         Les repas de Lili est une association solidaire dédiée à aider les personnes dans le besoin. Nous avons pour mission de faciliter l'accès à des repas chauds et équilibrés en mettant en relation des associations d'entraide et 
//         des restaurateurs locaux, qu'il s'agisse de restaurants, brasseries, fast-foods, et bien d'autres encore.
//         Grâce à notre plateforme, les associations peuvent réserver des repas à 1 euro pour ceux qui traversent des moments difficiles, contribuant ainsi à leur offrir un soutien essentiel, tout en soutenant nos commerçants partenaires.
//         Chaque geste compte. En collaborant avec "Les repas de Lili", vous participez à un projet de solidarité qui a un impact direct sur la vie de nombreuses personnes.
//         Vous êtes un restaurateur ou une association ? Rejoignez-nous dès aujourd'hui pour faire une différence ensemble!
//       </p>
//       <Link to="/auth/login">
//         <button className="home-button">En savoir plus</button>
//       </Link>
//     </div>

//   );
// };

// export default HomeGuest;


import React from 'react';
import republique from "../../assets/img/republique22.png"
import republique_staff from "../../assets/img/le-republique-staff.jpg"

const HomeGuest = () => {
  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="w-full">
        <img
          src={republique}
          alt="Restaurant Le République"
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>


      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-black rounded-md p-2 text-l/6">
              <i>Les repas de Lili</i> est une association solidaire dédiée à aider les personnes dans le besoin.
              Nous avons pour mission de faciliter l'accès à des repas chauds et équilibrés en mettant en relation des
              associations d'entraide et des restaurateurs locaux, qu'il s'agisse de restaurants, brasseries, fast-foods, et bien d'autres encore.
            </p>
            <p className="text-black rounded-md p-2 text-l/6">
              Grâce à notre plateforme, les associations peuvent réserver des repas à 1 euro pour ceux qui traversent des moments difficiles,
              contribuant ainsi à leur offrir un soutien essentiel, tout en soutenant nos commerçants partenaires.
            </p>
            <p className="text-black rounded-md p-2 text-l/6">
              Chaque geste compte. En collaborant avec "Les repas de Lili", vous participez à un projet de solidarité qui a un impact direct sur la vie de nombreuses personnes.
            </p>
            <p className="text-black rounded-md p-2 text-l/6">
              Vous êtes un restaurateur ou une association ? Rejoignez-nous dès aujourd'hui pour faire une différence ensemble !
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              src={republique_staff}
              alt="Solidarité"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#3c7460]">Rejoignez notre mission !</h2>
          <p className="mt-4 text-lg">
            Si vous êtes un restaurateur ou une association prête à faire une différence, n'hésitez pas à nous contacter !
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block bg-[#3c7460] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#346c59]"
          >
            Nous contacter
          </a>
        </section>
      </main>
    </div>
  );
};

export default HomeGuest;