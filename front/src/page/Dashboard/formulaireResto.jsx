import React, { useState } from 'react';

const RestaurantModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Ajouter un Restaurant</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Nom" className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="Adresse" className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="Ville" className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="Code Postal" className="w-full p-2 border rounded-md" />
          <input type="tel" placeholder="Téléphone" className="w-full p-2 border rounded-md" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
          <input type="text" placeholder="SIRET" className="w-full p-2 border rounded-md" />
          
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-6">
      <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-md">
        Ajouter un restaurant
      </button>
      <RestaurantModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default App;