import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAsso, deleteAsso, updateAsso, createAsso } from '@/api/asso';

const AssoList = () => {
  const [asso, setAsso] = useState([]);
  const [selectedAsso, setSelectedAsso] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // État pour la modale d'ajout
  const [formData, setFormData] = useState({ name: '', phone_number: '' });
  const [addFormData, setAddFormData] = useState({ name: '', siret: '', phone_number: '' }); // État pour le formulaire d'ajout

  // Charger les associations au montage du composant
  useEffect(() => {
    getAsso()
      .then(data => {
        console.log("Associations chargées :", data);
        setAsso(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Erreur lors de la récupération des associations', error));
  }, [asso]); // Recharger les associations si l'état `asso` change

  // Supprimer une association
  const handleDelete = async (assoId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette association ?')) {
      try {
        await deleteAsso(assoId);
        setAsso(asso.filter(a => a.id !== assoId));
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };
    
  // Ouvrir la modale avec les données de l'association sélectionnée
  const openEditModal = (asso) => {
    setSelectedAsso(asso);
    setFormData({
      name: asso.name,
      siret: asso.siret, // Ajoutez le SIRET ici
      phone_number: asso.phone_number,
    });
    setShowModal(true);
  };

  // Fermer la modale
  const closeEditModal = () => {
    setShowModal(false);
    setSelectedAsso(null);
    setFormData({ name: '', phone_number: '' });
  };

  // Ouvrir la modale d'ajout
  const openAddModal = () => {
    setShowAddModal(true);
  };

  // Fermer la modale d'ajout
  const closeAddModal = () => {
    setShowAddModal(false);
    setAddFormData({ name: '', siret: '', phone_number: '' });
  };

  // Gérer les changements dans le formulaire de la modale
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gérer les changements dans le formulaire d'ajout
  const handleAddChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  // Envoyer la mise à jour à l'API
  const handleUpdate = async () => {
    if (!selectedAsso) return;
  
    try {
      await updateAsso(selectedAsso.id, formData);
      setAsso(asso.map(a => (a.id === selectedAsso.id ? { ...a, ...formData } : a)));
      closeEditModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  // Envoyer l'ajout à l'API
  const handleAdd = async () => {
    try {
      const newAsso = await createAsso(addFormData);
      setAsso([...asso, newAsso]);
      closeAddModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <div className="p-5 flex-1">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Liste des associations :</h1>
        <button onClick={openAddModal} className="bg-[#3c7460] text-white hover:bg-[#2e5a4a] p-2 block rounded">
          Ajouter une association
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Siret</th>
            <th className="border border-gray-300 p-2">Téléphone</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {asso.length > 0 ? (
            asso.map(a => (
              <tr key={a.id} className="text-center">
                <td className="border border-gray-300 p-2">{a.name}</td>
                <td className="border border-gray-300 p-2">{a.siret}</td>
                <td className="border border-gray-300 p-2">{a.phone_number}</td>
                <td className="border border-gray-300 p-2">
                  <button onClick={() => openEditModal(a)} className="text-blue-500 font-semibold px-3 py-1 mr-2">
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-500 font-semibold px-3 py-1">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" className="text-center p-2">Aucune association détectée.</td></tr>
          )}
        </tbody>
      </table>

      {/* MODALE POUR MODIFIER UNE ASSOCIATION */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-3">Modifier l'association</h2>
            <label className="block mb-2">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
      <label className="block mb-2">Siret</label>
      <input
        type="text"
        name="siret"
        value={formData.siret}
        onChange={handleChange}
        maxLength={14}
        className="w-full p-2 border border-gray-300 rounded mb-3"
      />
            <label className="block mb-2">Téléphone</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              maxLength={15}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <div className="flex justify-end">
              <button onClick={closeEditModal} className="mr-2 bg-gray-500 text-white px-3 py-1 rounded">
                Annuler
              </button>
              <button onClick={handleUpdate} className="bg-[#3c7460] text-white px-3 py-1 rounded">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE POUR AJOUTER UNE ASSOCIATION */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-3">Ajouter une association</h2>
            <label className="block mb-2">Nom</label>
            <input
              type="text"
              name="name"
              value={addFormData.name}
              onChange={handleAddChange}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <label className="block mb-2">Siret</label>
            <input
              type="text"
              name="siret"
              value={addFormData.siret}
              maxLength={14}
              onChange={handleAddChange}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <label className="block mb-2">Téléphone</label>
            <input
              type="text"
              name="phone_number"
              value={addFormData.phone_number}
              maxLength={15}
              onChange={handleAddChange}
              className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            <div className="flex justify-end">
              <button onClick={closeAddModal} className="mr-2 bg-gray-500 text-white px-3 py-1 rounded">
                Annuler
              </button>
              <button onClick={handleAdd} className="bg-[#3c7460] text-white px-3 py-1 rounded">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssoList;