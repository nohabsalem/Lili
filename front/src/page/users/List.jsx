import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, createUser, updateUser } from '../../api/users';
import Modal from "../users/Modal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", role: "", password: "" });

  useEffect(() => {
    getUsers()
      .then(data => {
        console.log("Utilisateurs chargés :", data);
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs', error));
  }, []);

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user ? user.id : null);
    setFormData(user ? { ...user, password: "" } : { firstname: "", lastname: "", email: "", role: "", password: "" });
    setModalOpen(true);
  }

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser);
      setUsers(users.filter(user => user.id !== selectedUser));
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    } finally {
      setModalOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.role) {
      alert("Tous les champs sont obligatoires");
      return;
    }

    try {
      let user;
      // Si un mot de passe est renseigné, on l'ajoute au formulaire de données
      const updatedData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: formData.role
      };

      if (formData.password) {
        updatedData.password = formData.password; // Ajout du mot de passe uniquement s'il est renseigné
      }

      if (modalType === "ajouter") {
        // Créer un nouvel utilisateur
        user = await createUser(updatedData);
        setUsers([...users, user]);  // Ajouter l'utilisateur créé à la liste
      } else if (modalType === "modifier") {
        // Modifier un utilisateur existant
        user = await updateUser(selectedUser, updatedData);
        setUsers(users.map(u => (u.id === user.id ? user : u)));  // Mettre à jour l'utilisateur modifié dans la liste
      }

      setModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la modification de l\'utilisateur', error);
    }
  };

  return (
    <div className="p-5 flex-1">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Liste des utilisateurs</h1>
        <button onClick={() => openModal("ajouter")} className="bg-[#3c7460] text-white hover:bg-[#2e5a4a] p-2 block rounded">
          Ajouter un utilisateur
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Nom</th>
            <th className="border border-gray-300 p-2">Prénom</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Rôle</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 p-2">{user.lastname}</td>
                <td className="border border-gray-300 p-2">{user.firstname}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">
                  <button onClick={() => openModal("modifier", user)} className="text-blue-500 font-semibold px-3 py-1 mr-2">
                    Modifier
                  </button>

                  <button onClick={() => openModal("supprimer", user)} className="text-red-500 font-semibold px-3 py-1">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center p-2">Aucun utilisateur trouvé</td></tr>
          )}
        </tbody>
      </table>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalType === "ajouter" ? "Ajouter un utilisateur" :
            modalType === "modifier" ? "Modifier l'utilisateur" :
              "Confirmer la suppression"
        }

        onConfirm={modalType === "supprimer" ? () => handleDelete() : null}
        confirmText={modalType === "supprimer" ? "Supprimer" : undefined}>

        {/* //Supprimer */}
        {modalType === "supprimer" && (
          <p>Êtes-vous sûr de vouloir supprimer <strong>{formData.firstname} {formData.lastname}</strong> ?</p>
        )}

        {(modalType === "ajouter" || modalType === "modifier") && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label>Nom :
              <input type="text" placeholder="Nom :" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} className="w-full p-2 border rounded" />
            </label>

            <label>Prénom :
              <input type="text" placeholder="Prénom :" value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} className="w-full p-2 border rounded" />
            </label>

            <label>Adresse mail :
              <input type="email" placeholder="Email : " value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border rounded" />
            </label>

            <label>Mot de passe :
              <input type="password" placeholder="Mot de passe :" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border rounded" />
            </label>

            <select value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2 border rounded">
              <option value="">Sélectionnez un rôle :</option>
              <option value="ADMIN">Administrateur</option>
              <option value="RESTAURATEUR">Restaurant</option>
              <option value="ASSOCIATION">Association</option>
              <option value="MANAGER">Gestionnaire Association</option>
              <option value="BENEFICIARY">Bénéficiaire</option>

            </select>
            <button type="submit" className="bg-[#3c7460] text-white px-4 py-2 rounded w-full">
              {modalType === "ajouter" ? "Ajouter" : "Modifier"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default UserList;