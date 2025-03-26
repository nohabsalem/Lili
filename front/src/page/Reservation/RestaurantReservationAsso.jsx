import React, { useState } from "react";
import "../Reservation/RestaurantReservationAsso.css";

const RestaurantReservationAsso = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState("");
    // Déclare une constante pour gérer l'ordre de tri des éléments (A-Z ou Z-A)
    const [sortOrder, setSortOrder] = useState('A-Z');
    
    // openpopup : fonction qui permet d'afficher un "comment" dans le popup
    const openPopup = (comment) => {
        setSelectedComment(comment);
        setIsPopupOpen(true);
    };

    // closepopup : permet de close la popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedComment("");
    };

    // Permet de fermer la popup en cliquant n'importe ou sur la page
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    };

    const sortedReservations = [...reservations].sort((a, b) => {
        const nameA = a.client.toLowerCase();
        const nameB = b.client.toLowerCase();
        // Trie le tableau de réservations par nom de client
        return sortOrder === 'A-Z' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    return (
        <div className="reservation-container">
            <h2 className="text-lg font-semibold text-4xl">Réservations</h2>
            <div className="sort-container">
                <label htmlFor="sort">Trier par nom: </label>
                <select id="sort" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </div>
            <div className=" restaurant-list">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 reservation-table">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Informations client</th>
                                <th scope="col" className="px-6 py-3">Association</th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Nombre de repas</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Commentaires</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedReservations.map((res) => (
                                <tr key={res.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        {res.client} <br /> {res.phone}
                                    </th>
                                    <td className="px-6 py-4">{res.association}</td>
                                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{res.repas}</td>
                                    <td className="px-6 py-4">{res.date}</td>
                                    <td className="px-6 py-4">
                                        <button className="comment-btn" onClick={() => openPopup(res.commentaire)}>
                                            Voir le commentaire
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">{res.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isPopupOpen && (
                    <div className="popup-overlay" onClick={handleOverlayClick}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Commentaire</h3>
                            <p>{selectedComment}</p>
                            <button className="close-btn" onClick={closePopup}>Fermer</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantReservationAsso;
