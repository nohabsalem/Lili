import { useState } from "react";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/navbar";
import logo from "../../assets/img/logo.png";

export default function AdminProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-col flex-1">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-6 w-full flex justify-center items-center">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-300 w-full max-w-md">
                        <div className="text-center">
                            <img alt="La Petite Lili" src={logo} className="mx-auto h-20 w-auto" />
                            <h2 className="mt-4 text-xl font-bold text-gray-900">Modifier votre profil :</h2>
                        </div>

                        <form className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Adresse Mail :</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-r rounded-l border border-black bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-900">Mot de Passe Actuel :</label>
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-r rounded-l border border-black bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900">Nouveau Mot de Passe :</label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-r rounded-l border border-black bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirmer le Nouveau Mot de Passe :</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-r rounded-l border border-black bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-[#689f88] px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#3c7460] focus:ring-2"
                            >
                                Confirmer
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}