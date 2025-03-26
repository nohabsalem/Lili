
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar-resto";
import Header from "@/components/ui/navbar";
import { ADMIN, ASSO, RESTO, MANAGER, AGENT } from "@/config";

const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "44 million" },
  { id: 2, name: "Assets under holding", value: "$119 trillion" },
  { id: 3, name: "New users annually", value: "46,000" },
  { id: 4, name: "Total Restaurants", value: "1,200" },
  { id: 5, name: "Total Associations", value: "500" },
  { id: 6, name: "Total Users", value: "150,000" },
];

export default function RestoLayout() {
  let navigate = useNavigate();
  let accessToken = localStorage.getItem("accessToken") ?? null;

  useState(() => {
    if (!accessToken) {
      navigate("/auth/login");
    }
  })

  let role = localStorage.getItem("role") ?? null;
  let navLinks = [];

  // if (role === ASSO) {
  //   navLinks = [
  //     { name: "Dashboard", route: "/admin" },
  //     { name: "Utilisateurs", route: "/users" },
  //     { name: "Restaurants", route: "/restaurants" }
  //   ]
  // }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    < div className="flex min-h-screen" >
      {/* Sidebar (affichage responsive) */}
      < Sidebar isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)
      } />

      {/* Contenu principal */}
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <h1>RESTO DASHBOARD</h1> 
        <main className="flex-1 p-6 w-full">
          <div className="mx-auto max-w-7xl w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div >
  );
}