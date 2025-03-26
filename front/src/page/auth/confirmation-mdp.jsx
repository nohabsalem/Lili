import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import Header from "@/layout/PublicLayout/Header";
import Footer from "@/layout/PublicLayout/Footer";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { resetPassword } from "@/api/users";

export default function ConfirmationMDP() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!token) {
            setMessage({ type: "error", text: "Token invalide ou manquant." });
            return;
        }

        if (password !== confirmPassword) {
            setMessage({ type: "error", text: "Les mots de passe ne correspondent pas." });
            return;
        }

        try {
            await resetPassword(token, password);
            setMessage({ type: "success", text: "Mot de passe modifié avec succès ! Redirection en cours..." });

            setTimeout(() => {
                window.location.href = "/auth/login";
            }, 3000);
        } catch (error) {
            setMessage({ type: "error", text: "Échec de la modification du mot de passe." });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex flex-1 justify-center items-center p-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 w-full max-w-md flex flex-col items-center">
                    <img alt="La Petite Lili" src={logo} className="h-20 w-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Vous y êtes presque !</h2>
                    <p className="text-center text-md text-gray-600 mb-4">
                        Vous pouvez désormais modifier votre mot de passe.
                        <br />
                    </p>
                    <p>

                    </p>

                    {message && (
                        <p className={`text-sm text-center mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                            {message.text}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Nouveau mot de passe :
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="8 caractères minimum."
                                minLength={8}
                                required
                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                                Confirmez le mot de passe :
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="8 caractères minimum."
                                minLength={8}
                                required
                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded bg-[#2c7a2c] px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#245d24] focus:ring-2"
                        >
                            Confirmer
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