import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8 space-y-4 md:space-y-0">

        {/* Liens */}
        <nav className="flex flex-wrap gap-8 text-lg">
          <a href="/cgu" className="hover:text-gray-300 transition">CGU</a>
          <a href="/contact" className="hover:text-gray-300 transition">Contact</a>
          <a href="/mentionsLegales" className="hover:text-gray-300 transition">Mentions légales</a>
          <a href="/don" className="hover:text-gray-300 transition">Faire un don</a>
        </nav>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-end text-lg space-y-3">
          <p className="flex items-center gap-3">
            <MapPinIcon className="w-5 h-5 text-gray-300" />
            <span>10 Rue Saint Antoine, Marseille</span>
          </p>
          <p className="flex items-center gap-3">
            <PhoneIcon className="w-5 h-5 text-gray-300" />
            <a href=" tel :+33670029408">06 70 02 94 08</a>
          </p>
          <a href="/contact" className="flex items-center gap-3 bg-white text-green-700 px-4 py-2 rounded-lg shadow-md text-lg hover:bg-gray-100 transition">
            <EnvelopeIcon className="w-5 h-5" />
            Contactez-nous
          </a>
        </div>

      </div>
      <p className="text-center text-gray-300 text-lg mt-4">&copy; 2025 Les Repas de Lili. Tous droits réservés.</p>
    </footer>
  );
}