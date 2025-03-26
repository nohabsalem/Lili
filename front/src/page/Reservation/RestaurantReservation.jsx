import React, { useEffect, useState } from "react";
import { getAllReservations, createReservation } from "@/api/reservation";

const RestaurantReservation = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState("");
    const [sortOrder, setSortOrder] = useState('A-Z');
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        client: '',
        phone: '',
        association: '',
        meal: 1,
        date: '',
        status: 'En attente',
        comments: ''
    });

    // Fonction pour ouvrir le popup des commentaires
    const openPopup = (comment) => {
        setSelectedComment(comment);
        setIsPopupOpen(true);
    };

    // Fonction pour fermer le popup des commentaires
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedComment("");
    };

    // Fermer le popup si on clique en dehors
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    };

    // Charger les réservations au montage du composant
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getAllReservations();
                setReservations(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des réservations :", err);
                setError("Erreur lors de la récupération des réservations. Veuillez vérifier votre connexion.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    // Trier les réservations par nom (avec vérification de l'existence de `client`)
    const sortedReservations = reservations && reservations.length > 0
        ? [...reservations].sort((a, b) => {
            const nameA = a.client ? a.client.toLowerCase() : '';
            const nameB = b.client ? b.client.toLowerCase() : '';
            return sortOrder === 'A-Z' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        })
        : [];

    // Gérer les changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        console.log("Données soumises :", addFormData);

        try {
            const createdReservation = await createReservation(addFormData);
            console.log("Réservation créée :", createdReservation);

            // Ajouter la nouvelle réservation à la liste
            setReservations(prevReservations => [...prevReservations, createdReservation]);

            // Réinitialisation des données du formulaire
            setAddFormData({
                client: '',
                phone: '',
                association: '',
                meal: 1,
                date: '',
                status: 'En attente',
                comments: ''
            });

            // Fermer le formulaire
            setIsFormOpen(false);
        } catch (err) {
            console.error("Erreur lors de la création de la réservation :", err);
            setError("Erreur lors de la création de la réservation. Veuillez vérifier vos données.");
        }
    };

    // Afficher un message de chargement
    if (loading) {
        return <p>Chargement des réservations...</p>;
    }

    // Afficher un message d'erreur
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    // Calculer la date minimale (aujourd'hui)
    const today = new Date();
    const minDate = today.toISOString().split('T')[0]; // Formater la date pour l'input type="date"

    return (
        <div className="flex flex-col min-h-screen p-6">
            <h2 className="text-lg font-semibold text-4xl">Réservations</h2>
            <h2 className=" font-semibold text-4xl">Réservations</h2>
            {loading && <p>Chargement des réservations...</p>}
            {error && <p className="text-red-500">{error}</p>} {/* Affiche l'erreur ici */}

            {/* Bouton pour ouvrir le formulaire */}
            <div className="flex justify-between mb-4">
                <div>
                    <label htmlFor="sort" className="mr-2">Trier par nom:</label>
                    <select
                        id="sort"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                        className="border rounded p-1"
                    >
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Ajouter une Réservation
                </button>
            </div>

            {/* Formulaire d'ajout de réservation */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
                    <div className="bg-white p-5 rounded-lg shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
                        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="client" className="block mb-2">Client</label>
                                <input
                                    type="text"
                                    name="client"
                                    value={addFormData.client}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    placeholder="Nom du client"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block mb-2">Téléphone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={addFormData.phone}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    placeholder="Numéro de téléphone"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="association" className="block mb-2">Association</label>
                                <input
                                    type="text"
                                    name="association"
                                    value={addFormData.association}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    placeholder="Nom de l'association"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="meal" className="block mb-2">Nombre de repas</label>
                                <input
                                    type="number"
                                    name="meal"
                                    value={addFormData.meal}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    placeholder="Nombre de repas"
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block mb-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={addFormData.date}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    min={minDate} // Définir la date minimale ici
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status" className="block mb-2">Statut</label>
                                <select
                                    name="status"
                                    value={addFormData.status}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 w-full rounded"
                                >
                                    <option value="En attente">En attente</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="comments" className="block mb-2">Commentaires</label>
                                <textarea
                                    name="comments"
                                    value={addFormData.comments}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    placeholder="Ajouter des commentaires (facultatif)"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 bg-gray-500 text-white px-3 py-1 rounded"
                                    onClick={() => setIsFormOpen(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tableau des réservations */}
            <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm text-left bg-white shadow-md rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Téléphone</th>
                            <th className="px-6 py-3">Association</th>
                            <th className="px-6 py-3">Repas</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReservations.length > 0 ? (
                            sortedReservations.map((res) => {
                                // Créer une clé unique pour chaque réservation
                                const uniqueKey = res.id ? res.id : `${res.client}-${res.date}`;
                                return (
                                    <tr key={uniqueKey} className="border-b border-gray-200">
                                        <td className="px-6 py-4">{res.client}</td>
                                        <td className="px-6 py-4">{res.phone}</td>
                                        <td className="px-6 py-4">{res.association}</td>
                                        <td className="px-6 py-4">{res.meal}</td>
                                        <td className="px-6 py-4">{res.date}</td>
                                        <td className="px-6 py-4">{res.status}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">Aucune réservation trouvée</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantReservation;
