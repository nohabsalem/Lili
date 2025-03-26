import React from "react";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-black">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h1 className="contact-title">
          Contactez nous
        </h1>
        <p className="mb-8 lg:mb-16 font-light text-center text-black sm:text-xl">
        Vous avez le souhait de nous rejoindre ? Vous souhaitez nous faire part de vos commentaires ? Faites-le nous savoir.
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-black dark:text-black"
            >
              Votre e-mail
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
              placeholder="nom@exemple.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-black dark:text-white"
            >
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
              placeholder="Dites nous comment nous pouvons vous aider"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Votre message
            </label>
            <textarea
              id="message"
              rows="6"
              className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
              placeholder="Laissez un message..."
            ></textarea>
          </div>
          
          
          <div className="flex justify-between mt-6">
         <button className="btn ml-72" onClick={() => navigate(-1)}>ENVOYER</button>
         
       
         
       </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
