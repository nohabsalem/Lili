import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import Header from "@/layout/PublicLayout/Header";
import Footer from "@/layout/PublicLayout/Footer";
import { Link } from "react-router-dom";
import { forgotPassword } from "@/api/users";

export default function OubliMDP() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null); // ✅ Pour afficher un message de succès ou d'erreur

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); // Réinitialisation du message

        try {
            await forgotPassword(email);
            setMessage({ type: "success", text: "Un email de réinitialisation a été envoyé." });
        } catch (error) {
            setMessage({ type: "error", text: "Erreur lors de l'envoi de l'email. Vérifiez votre adresse." });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex flex-1 justify-center items-center p-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 w-full max-w-md flex flex-col items-center">
                    <img alt="La Petite Lili" src={logo} className="h-20 w-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Un oubli ? Ça arrive.</h2>
                    <p className="text-center text-md text-gray-600 mb-4">
                        Entrez votre adresse mail et nous vous enverrons un lien pour récupérer votre compte.
                    </p>

                    {message && (
                        <p className={`text-sm text-center mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                            {message.text}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Adresse Mail :</label>
                            <input
                                placeholder="mail@example.fr"
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-l rounded-r border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-l rounded-r bg-[#2c7a2c] px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#245d24] focus:ring-2"
                        >
                            Envoyer un lien de récupération
                        </button>
                    </form>

                    <Link to="/auth/login"
                        className="w-full text-center py-3 mt-6 text-sm font-semibold text-gray-800 bg-gray-100 border-t border-gray-300 rounded-l rounded-r hover:bg-gray-200"
                    >
                        Revenir à l'écran de connexion
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
