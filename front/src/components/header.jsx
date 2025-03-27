import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="w-full bg-gray-800 text-white py-4 px-6">
            <div className="flex justify-between items-center">
                {/* Logo ou autre contenu à gauche */}
                <div className="text-lg font-semibold">MonSite</div>

                {/* Bouton de connexion à droite */}
                <Link to="/auth/login">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Connexion
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
