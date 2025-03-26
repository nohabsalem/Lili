import React, { useEffect, useState } from "react";
import { getAllReservations } from "@/api/reservation"; 
import { Outlet } from "react-router-dom";

const RestaurantReservation = () => {
    const [sortOrder, setSortOrder] = useState('A-Z');
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getAllReservations(); // Récupérer les réservations
                setReservations(data); // Mettre à jour l'état avec les réservations récupérées
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError("Vous n'êtes pas autorisé à accéder à cette ressource.");
                } else {
                    setError(err.message || "Impossible de récupérer les réservations.");
                }
                console.error("Erreur :", err);
            }
        };

        fetchReservations(); 
    }, []);

    // Trier les réservations selon l'ordre sélectionné
    const sortedReservations = [...reservations].sort((a, b) => {
        return sortOrder === 'A-Z'
            ? a.client.localeCompare(b.client)
            : b.client.localeCompare(a.client);
    });

    return (
        <div className="flex min-h-screen">
            {/* Contenu principal */}
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-6 w-full">
                    <div className="mx-auto max-w-7xl w-full">
                        <h2 className="text-lg font-semibold text-4xl">Réservations</h2>
                        {error && <p className="error-message">{error}</p>}

                        <div className="sort-container">
                            <label htmlFor="sort">Trier par nom: </label>
                            <select id="sort" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                        </div>

                        <div className="restaurant-list">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 reservation-table">
                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Client</th>
                                            <th className="px-6 py-3">Téléphone</th>
                                            <th className="px-6 py-3">Association</th>
                                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Repas</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedReservations.length > 0 ? (
                                            sortedReservations.map((res) => (
                                                <tr key={res.id} className="border-b border-gray-200 dark:border-gray-700">
                                                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                        {res.client} <br /> {res.phone}
                                                    </td>
                                                    <td className="px-6 py-4">{res.association}</td>
                                                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{res.meal}</td>
                                                    <td className="px-6 py-4">{res.date}</td>
                                                    <td className="px-6 py-4">{res.status}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-4">Aucune réservation trouvée</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};