import React, { useState } from "react";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
    restaurants: [],
  });

  const restaurantOptions = [
    "Restaurant A",
    "Restaurant B",
    "Restaurant C",
    "Restaurant D",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRestaurantChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, restaurants: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Réserver une table</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nom :</label>
          <input
            
            type="email"
            id="email"
            className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
            placeholder="votre nom"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email :</label>
          <input
          
            type="email"
            id="email"
            className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
            placeholder="nom@exemple.com"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Date :</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
          />
        </div>
        <div>
          <label className="block font-medium">Heure :</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
          />
        </div>
        <div>
          <label className="block font-medium">Nombre de personnes :</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            required
            className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
          />
        </div>
        <div>
          <label className="block font-medium">Sélectionnez les restaurants :</label>
          <select
            multiple
            name="restaurants"
            onChange={handleRestaurantChange}
            className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white dark:shadow-sm-light"
          >
            {restaurantOptions.map((restaurant, index) => (
              <option key={index} value={restaurant}>{restaurant}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between mt-6">
          <button className="btn" onClick={() => navigate(-1)}>RETOUR</button>
          <button className="btn" onClick={() => navigate("/page/restaurant-liste")}>VALIDER</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
