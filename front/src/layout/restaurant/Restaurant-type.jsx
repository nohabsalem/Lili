// // import React, { useEffect, useState } from "react";
// // import { getResto, getReservationsByResto } from "@/api/resto"; // Fonctions API pour récupérer les données
// // // import { useAuth } from "@/context/AuthContext"; 

// // const RestaurantType = () => {
// //   const { user } = useAuth(); // Récupérer l'utilisateur connecté (ici, le restaurant)
// //   const [resto, setResto] = useState(null); // Informations du restaurant
// //   const [reservations, setReservations] = useState([]); // Réservations du restaurant
// //   const [loading, setLoading] = useState(true); // État de chargement

// //   // Charger les informations du restaurant et ses réservations
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Récupérer les informations du restaurant connecté
// //         const restoData = await getResto(user.id); // Supposons que `user.id` contient l'ID du restaurant
// //         setResto(restoData);

// //         // Récupérer les réservations du restaurant
// //         const reservationsData = await getReservationsByResto(user.id);
// //         setReservations(reservationsData);
// //       } catch (error) {
// //         console.error("Erreur lors du chargement des données :", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [user.id]);

// //   if (loading) {
// //     return <div>Chargement en cours...</div>;
// //   }

// //   return (
// //     <div className="p-5 flex-1">
// //       <h1 className="text-2xl font-bold mb-5">Tableau de bord du restaurant</h1>

// //       {/* Informations du restaurant */}
// //       <div className="mb-8">
// //         <h2 className="text-xl font-semibold mb-3">Informations du restaurant</h2>
// //         <div className="bg-white p-5 rounded-lg shadow-md">
// //           <p><strong>Nom :</strong> {resto.name}</p>
// //           <p><strong>Téléphone :</strong> {resto.phone_number}</p>
// //           <p><strong>Type de nourriture :</strong> {resto.foodType}</p>
// //           <p><strong>Type de cuisine :</strong> {resto.cuisineType}</p>
// //         </div>
// //       </div>

// //       {/* Réservations du restaurant */}
// //       <div>
// //         <h2 className="text-xl font-semibold mb-3">Réservations</h2>
// //         <table className="w-full border-collapse border border-gray-300">
// //           <thead>
// //             <tr className="bg-gray-200">
// //               <th className="border border-gray-300 p-2">Client</th>
// //               <th className="border border-gray-300 p-2">Téléphone</th>
// //               <th className="border border-gray-300 p-2">Date</th>
// //               <th className="border border-gray-300 p-2">Nombre de couverts</th>
// //               <th className="border border-gray-300 p-2">Statut</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {reservations.length > 0 ? (
// //               reservations.map((res) => (
// //                 <tr key={res.id} className="text-center">
// //                   <td className="border border-gray-300 p-2">{res.client}</td>
// //                   <td className="border border-gray-300 p-2">{res.phone}</td>
// //                   <td className="border border-gray-300 p-2">{res.date}</td>
// //                   <td className="border border-gray-300 p-2">{res.covers}</td>
// //                   <td className="border border-gray-300 p-2">{res.status}</td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td colSpan="5" className="text-center p-2">
// //                   Aucune réservation trouvée.
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RestaurantType;




// import React, { useEffect, useState } from "react";
// import { getResto, getReservationsByResto, updateResto, deleteResto, createResto } from "@/api/resto";
// // import { useAuth } from "@/context/AuthContext";

// const RestaurantType = () => {
//   // const { user } = useAuth(); // Récupérer l'utilisateur connecté (ici, le restaurant)
//   const [resto, setResto] = useState(null); // Informations du restaurant
//   const [reservations, setReservations] = useState([]); // Réservations du restaurant
//   const [loading, setLoading] = useState(true); // État de chargement
//   const [showEditModal, setShowEditModal] = useState(false); // Modale de modification
//   const [showAvailabilityModal, setShowAvailabilityModal] = useState(false); // Modale de disponibilités
//   const [formData, setFormData] = useState({}); // Données du formulaire

//   // Charger les informations du restaurant et ses réservations
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Récupérer les informations du restaurant connecté
//         const restoData = await getResto(user.id);
//         setResto(restoData);

//         // Récupérer les réservations du restaurant
//         const reservationsData = await getReservationsByResto(user.id);
//         setReservations(reservationsData);
//       } catch (error) {
//         console.error("Erreur lors du chargement des données :", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user.id]);

//   // Ouvrir la modale de modification
//   const openEditModal = () => {
//     setFormData(resto); // Pré-remplir le formulaire avec les données actuelles
//     setShowEditModal(true);
//   };

//   // Fermer la modale de modification
//   const closeEditModal = () => {
//     setShowEditModal(false);
//     setFormData({});
//   };

//   // Ouvrir la modale de disponibilités
//   const openAvailabilityModal = () => {
//     setShowAvailabilityModal(true);
//   };

//   // Fermer la modale de disponibilités
//   const closeAvailabilityModal = () => {
//     setShowAvailabilityModal(false);
//   };

//   // Gérer les changements dans le formulaire
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Envoyer la mise à jour à l'API
//   const handleUpdate = async () => {
//     try {
//       await updateResto(user.id, formData);
//       setResto(formData); // Mettre à jour l'état local
//       closeEditModal();
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour :", error);
//     }
//   };

//   // Gérer les disponibilités
//   const handleAvailabilityUpdate = async () => {
//     try {
//       await updateResto(user.id, { availability: formData.availability });
//       setResto({ ...resto, availability: formData.availability }); // Mettre à jour l'état local
//       closeAvailabilityModal();
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour des disponibilités :", error);
//     }
//   };

//   if (loading) {
//     return <div>Chargement en cours...</div>;
//   }

//   return (
//     <div className="p-5 flex-1">
//       <h1 className="text-2xl font-bold mb-5">Tableau de bord du restaurant</h1>

//       {/* Informations du restaurant */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-3">Informations du restaurant</h2>
//         <div className="bg-white p-5 rounded-lg shadow-md">
//           <p><strong>Nom :</strong> {resto.name}</p>
//           <p><strong>Téléphone :</strong> {resto.phone_number}</p>
//           <p><strong>Type de nourriture :</strong> {resto.foodType}</p>
//           <p><strong>Type de cuisine :</strong> {resto.cuisineType}</p>
//           <p><strong>Disponibilités :</strong> {resto.availability}</p>
//           <button onClick={openEditModal} className="bg-[#3c7460] text-white px-3 py-1 rounded mt-3">
//             Modifier les informations
//           </button>
//           <button onClick={openAvailabilityModal} className="bg-[#3c7460] text-white px-3 py-1 rounded mt-3 ml-3">
//             Gérer les disponibilités
//           </button>
//         </div>
//       </div>

//       {/* Réservations du restaurant */}
//       <div>
//         <h2 className="text-xl font-semibold mb-3">Réservations</h2>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-300 p-2">Client</th>
//               <th className="border border-gray-300 p-2">Téléphone</th>
//               <th className="border border-gray-300 p-2">Date</th>
//               <th className="border border-gray-300 p-2">Nombre de couverts</th>
//               <th className="border border-gray-300 p-2">Statut</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reservations.length > 0 ? (
//               reservations.map((res) => (
//                 <tr key={res.id} className="text-center">
//                   <td className="border border-gray-300 p-2">{res.client}</td>
//                   <td className="border border-gray-300 p-2">{res.phone}</td>
//                   <td className="border border-gray-300 p-2">{res.date}</td>
//                   <td className="border border-gray-300 p-2">{res.covers}</td>
//                   <td className="border border-gray-300 p-2">{res.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-2">
//                   Aucune réservation trouvée.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modale de modification des informations */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
//             <h2 className="text-xl font-bold mb-3">Modifier les informations</h2>
//             <label className="block mb-2">Nom</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name || ""}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mb-3"
//             />
//             <label className="block mb-2">Téléphone</label>
//             <input
//               type="text"
//               name="phone_number"
//               value={formData.phone_number || ""}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mb-3"
//             />
//             <label className="block mb-2">Type de nourriture</label>
//             <input
//               type="text"
//               name="foodType"
//               value={formData.foodType || ""}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mb-3"
//             />
//             <label className="block mb-2">Type de cuisine</label>
//             <input
//               type="text"
//               name="cuisineType"
//               value={formData.cuisineType || ""}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mb-3"
//             />
//             <div className="flex justify-end">
//               <button onClick={closeEditModal} className="mr-2 bg-gray-500 text-white px-3 py-1 rounded">
//                 Annuler
//               </button>
//               <button onClick={handleUpdate} className="bg-[#3c7460] text-white px-3 py-1 rounded">
//                 Enregistrer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modale de gestion des disponibilités */}
//       {showAvailabilityModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
//             <h2 className="text-xl font-bold mb-3">Gérer les disponibilités</h2>
//             <label className="block mb-2">Disponibilités</label>
//             <textarea
//               name="availability"
//               value={formData.availability || ""}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mb-3"
//               rows="4"
//             />
//             <div className="flex justify-end">
//               <button onClick={closeAvailabilityModal} className="mr-2 bg-gray-500 text-white px-3 py-1 rounded">
//                 Annuler
//               </button>
//               <button onClick={handleAvailabilityUpdate} className="bg-[#3c7460] text-white px-3 py-1 rounded">
//                 Enregistrer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RestaurantType;



import React, { useEffect, useState } from "react";
import { getResto, getReservationsByResto, updateResto } from "@/api/resto";

const RestaurantType = () => {
  const [resto, setResto] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restoData = await getResto();
        setResto(restoData);

        const reservationsData = await getReservationsByResto(restoData.id);
        setReservations(reservationsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openEditModal = () => {
    setFormData(resto);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setFormData({});
  };

  const openAvailabilityModal = () => {
    setShowAvailabilityModal(true);
  };

  const closeAvailabilityModal = () => {
    setShowAvailabilityModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateResto(resto.id, formData);
      setResto(formData);
      closeEditModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleAvailabilityUpdate = async () => {
    try {
      await updateResto(resto.id, { availability: formData.availability });
      setResto({ ...resto, availability: formData.availability });
      closeAvailabilityModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour des disponibilités :", error);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="p-5 flex-1">
      <h1 className="text-2xl font-bold mb-5">Tableau de bord du restaurant</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Informations du restaurant</h2>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p><strong>Nom :</strong> {resto.name}</p>
          <p><strong>Téléphone :</strong> {resto.phone_number}</p>
          <p><strong>Type de nourriture :</strong> {resto.foodType}</p>
          <p><strong>Type de cuisine :</strong> {resto.cuisineType}</p>
          <p><strong>Disponibilités :</strong> {resto.availability}</p>
          <button onClick={openEditModal} className="bg-[#3c7460] text-white px-3 py-1 rounded mt-3">
            Modifier les informations
          </button>
          <button onClick={openAvailabilityModal} className="bg-[#3c7460] text-white px-3 py-1 rounded mt-3 ml-3">
            Gérer les disponibilités
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantType;