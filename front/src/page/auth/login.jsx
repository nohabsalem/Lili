"use client";
import { useNavigate } from 'react-router-dom';
import { ADMIN, ASSO, RESTO, MANAGER, AGENT } from "@/config";
import { signIn } from "@/api/auth";

// Import composants
// import Header from "@/layout/PublicLayout/Header";
// import Footer from "@/layout/PublicLayout/Footer";
import logo from "../../assets/img/logo.png";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useState } from "react"; // <-- Importation de useState

import * as z from "zod";

import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email("Ce n'est pas un mail valide"),
  password: z.string(),
});

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(""); // <-- État pour stocker l'erreur
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (newTodo) => {
      return await signIn(newTodo);
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.token.accessToken);
      localStorage.setItem("refreshToken", data.data.token.refreshToken);
      const role = data.data.token.role;
      localStorage.setItem("role", role);

      if (role === ADMIN) {
        navigate("/admin");

      } else if (role === ASSO) {
        navigate("/association");
      } else if (role === RESTO) {
        navigate("/restaurateur");
      }
      else {
        navigate("/")
      }
    },
    onError: (error) => {
      // <-- Gestion de l'erreur
      console.log("ERROR", error)
      setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
    },
  });

  const onSubmit = (data) => {
    console.log('data submited');

    setErrorMessage(""); // <-- Réinitialiser l'erreur avant une nouvelle tentative

    loginMutation.mutate(data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">

      {/* <Header /> */}

      <main className="flex flex-1 justify-center items-center p-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 w-full max-w-md flex flex-col items-center">
          <img alt="La Petite Lili" src={logo} className="h-20 w-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-900 mb-2">Connexion</h2>
          <p className="text-center text-md text-gray-600 mb-4">
            Connectez-vous à votre compte pour continuer.
          </p>

          {errorMessage && (
            <p className="text-sm text-center mb-4 text-red-600">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email :</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Entrer votre e-mail"
                {...register("email")}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Mot de passe :</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Entrer votre mot de passe"
                {...register("password")}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 shadow-sm outline-none focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2c7a2c] px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#245d24] focus:ring-2"
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Connexion..." : "Connexion"}
            </button>
          </form>

          <Link
            to="/oubli-mot-de-passe"
            className="w-full text-center py-3 mt-4 text-sm font-semibold text-gray-800 bg-gray-100 border-t border-gray-300 rounded-lg hover:bg-gray-200"
          >
            J'ai oublié mon mot de passe
          </Link>
        </div>
      </main>
    </div>
  );
}
