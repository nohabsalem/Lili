import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { ADMIN, ASSO, MANAGER, RESTO } from "../src/config/index";
// import ProtectedRoute from "./page/auth/protected";

// Importation des layouts
import PublicLayout from "./layout/PublicLayout";
import RestoLayout from "./layout/restaurant/RestaurantLayout";
import AssoLayout from "../../../lili-cdpi-cannes-grp5/front/src/layout/asso/AssoLayout";
import AdminLayout from "./layout/admin/AdminLayout";

// Importation des pages publiques
import HomeGuest from "./page/accueil/home";
import Login from "./page/auth/login";
import Register from "./page/auth/register";
// import RestaurantType from "./page/Reservation/couverts";
import CGU from "./page/legislation/CGU";
import Don from "./page/legislation/don";
import Contact from "./page/legislation/contact";
import Reservation from "./page/legislation/reservation";
import MentionsLegales from "./page/legislation/mentionsLegales";

// Importation des pages Restaurant
import ResaResto from "./page/Reservation/resaResto";
import ResaRestoVal from "./page/Reservation/resaRestoVal";
import ListResto from "./page/Dashboard/listResto";
import ListAsso from "./page/Dashboard/listAsso";
import RestaurantReservation from "./page/Reservation/RestaurantReservation";
import RestaurantType from "./layout/restaurant/Restaurant-type";


// Importation des pages Assoc
import DashboardAsso from "./page/Dashboard/DashboardAsso";
import ChoixRestaurant from "./page/Dashboard/AssoChoixResto";


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
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomeGuest />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route path="cgu" element={<CGU />} />
            <Route path="don" element={<Don />} />
            <Route path="contact" element={<Contact />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="mentionsLegales" element={<MentionsLegales />} />
            <Route path="resaResto" element={<ResaResto />} />
            <Route path="resaRestoVal" element={<ResaRestoVal />} />
            {/* <Route path="restaurantType" element={<RestaurantType />} /> */}
          </Route>

          <Route path="/admin" element={
            <AuthGuard allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </AuthGuard>
          }>
            {/* <Route index element={<AuthGuard allowedRoles={[MANAGER]}><Stats /></AuthGuard>} /> */}

            <Route path="users" element={<UserList />} />
            <Route path="restaurants" element={<ListResto />} />
            <Route path="RestaurantReservation" element={<RestaurantReservation />} />
            <Route path="associations" element={<ListAsso />} />
            <Route path="associations" element={<ListAsso />} />
            <Route path="RestaurantReservation" element={<RestaurantReservation />} />
          </Route>



          <Route path="/association" element={
            <AuthGuard allowedRoles={["ASSO"]}>
              <AssoLayout />
            </AuthGuard>}>

            <Route path="choix-restaurants" element={<ChoixRestaurant />} />
            <Route path="RestaurantReservation" element={<RestaurantReservation />} />
          </Route>

          <Route path="/restaurateur" element={
            <AuthGuard allowedRoles={["RESTO"]}>
              <RestoLayout />
            </AuthGuard>}>
          </Route>





          {/* Routes Restaurateur */}
          <Route path="/restaurateur" element={<RestoLayout />}>
            {/* <Route path="liste-restaurants" element={<ListResto />} /> */}
            <Route path="restaurant-types" element={<RestaurantType />} />
          </Route>

          {/* Routes Association */}
          <Route path="/asso" element={<AssoLayout />}>
            <Route path="dashboard" element={<DashboardAsso />} />
          </Route>

          {/* Afficher Restaurants pour l'  admin */}
          <Route path="/admin" element={
            <AuthGuard allowedRoles={["ADMIN"]}>
              <Route path="admin/restaurants" element={<ListResto />} />
              <Route path="admin/associations" element={<ListAsso />} />
              <Route path="/admin/profil" element={<AdminProfile />} />
            </AuthGuard>}>

          </Route>
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