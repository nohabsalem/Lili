import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

//Fonctions BACK 
import { ADMIN, ASSO, MANAGER, RESTO } from "../src/config/index";

// Importation des layouts
import AdminLayout from "./layout/admin/AdminLayout";

// Importation des pages publiques
import HomeGuest from "./page/home";
import Login from "./page/auth/login";


//importations Admin:
import UserList from "../../front/src/page/users/List";
import AdminProfile from "./layout/admin/AdminProfile";

//Oubli de Mot de Passe : 
import OubliMDP from "./page/auth/oubli-mdp";
import ConfirmationMDP from "./page/auth/confirmation-mdp";

//Page 404 :
import Error404 from "./page/not-found";

// AuthGuard : 
import { AuthGuard } from "./components/ui/authGuard";
import Stats from "./components/ui/stats";

// Création du client React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" >
            <Route index element={<HomeGuest />} />
            <Route path="auth/login" element={<Login />} />
          </Route>

          <Route path="/admin" element={
            <AuthGuard allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </AuthGuard>
          }>
            <Route path="users" element={<UserList />} />
            {/* <Route path="restaurants" element={<ListResto />} /> */}
            {/* <Route path="associations" element={<ListAsso />} /> */}
          </Route>

          {/* Routes Association */}
          <Route path="/association" element={
            <AuthGuard allowedRoles={["ASSO"]}>
              {/* <AssoLayout /> */}
            </AuthGuard>}>
          </Route>

          <Route path="/restaurateur" element={
            <AuthGuard allowedRoles={["RESTO"]}>
              {/* <RestoLayout /> */}
            </AuthGuard>}>
          </Route>

          {/* Routes Restaurateur */}
          {/* <Route path="/restaurateur" element={<RestoLayout />}>
          </Route> */}

          {/* Routes pour les mots de passe :  */}
          <Route path="/oubli-mot-de-passe" element={<OubliMDP />} />
          <Route path="/confirmer-mot-de-passe" element={<ConfirmationMDP />} />

          {/* //Page 404 */}
          <Route path="/*" element={<Error404 />} />

        </Routes >
      </BrowserRouter >
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
} else {
  console.error("Élément root introuvable.");
}