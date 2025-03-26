import {
    HomeIcon,
    BuildingStorefrontIcon,
    UsersIcon,
    HeartIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import logo from '../../assets/img/logo.png';
import user_icon from '../../assets/img/profil_icon.png';

export default function Header() {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem("role");

    console.log(role);
    if (role) {
        localStorage.setItem("role", role);
    }

    function logout() {
        localStorage.clear();
        window.location = '/';
    }

    function DashboardLink() {
        if (role === "ADMIN") {
            return (
                <a href="/admin" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <RocketLaunchIcon className="w-6 h-6" />
                    Dashboard
                </a>
            );
        } else if (role === "RESTO") {
            return (
                <a href="/restaurateur" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <RocketLaunchIcon className="w-6 h-6" />
                    Dashboard
                </a>
            );
        } else if (role === "ASSO") {
            return (
                <a href="/association" className="flex items-center gap-2 hover:text-gray-300 transition">
                    <RocketLaunchIcon className="w-6 h-6" />
                    Dashboard
                </a>
            );
        }
        return null;
    }

    return (
        <header className="bg-green-700 text-white fixed top-0 w-full h-20 flex items-center justify-between px-6 shadow-lg z-50">
            <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="Logo Les Repas de Lili" className="h-14" />
            </a>

      {/* Liens de navigation */}
      <nav className="flex gap-8 text-lg">
        <a href="/" className="nav-link active">
          <Home className="inline-block mr-2" size={18} />
          Accueil
        </a>
        
        <a href="/restaurant" className="nav-link">
          <ChefHat className="inline-block mr-2" size={18} />
            
          <a href="/admin/restaurants">Restaurants</a>
        </a>


        <a href="/assos" className="nav-link">
          <HeartHandshake className="inline-block mr-2" size={18} />
          Associations Partenaires
        </a>


        <a href="/nous-rejoindre" className="nav-link">
          <Users className="inline-block mr-2" size={18} />
          <a href="/contact">Nous Rejoindre</a>
          
        </a>
      </nav>

            {/* Boutons Connexion / Déconnexion */}
            {token ? (
                <button onClick={logout} className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
                    Déconnexion
                </button>
            ) : (
                <a href="/auth/login" className="flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
                    <img src={user_icon} alt="Profil" className="w-5 h-5" />
                    Connexion
                </a>
            )}
        </header>
    );
}
