import { Link } from "react-router-dom";
// import logo from "@/assets/img/logo";
import logo from "@/assets/img/ipsum.svg"
// front / src / assets / img / logo.png
const Error404 = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex flex-1 justify-center items-center p-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 w-full max-w-md flex flex-col items-center">
                    <img alt="La Petite Lili" src={logo} className="h-20 w-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Oups ! Cette page n'existe pas.</h2>
                    <p className="text-center text-md text-gray-600 mb-4">
                        Vous pouvez toujours vous rendre à l'accueil.
                    </p>

                    <Link to="/"
                        className="w-full text-center py-3 mt-6 text-sm font-semibold text-gray-800 bg-gray-100 border-t border-gray-300 rounded-l rounded-r hover:bg-gray-200"
                    >
                        Revenir à l'accueil
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Error404
