
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import Composants :
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/navbar";

// Fonctions BACK
import { ADMIN, ASSO, RESTO, MANAGER, AGENT } from "@/config";
import { getUsers } from "@/api/users";
import { getResto } from "@/api/resto";
import { getAsso } from "@/api/asso";

export default function AdminLayout() {
  let navigate = useNavigate();
  let accessToken = localStorage.getItem("accessToken") ?? null;

  if (!accessToken) {
    navigate("/auth/login");
  }

  let role = localStorage.getItem("role") ?? null;
  let navLinks = [];

  if (role === "ADMIN") {
    navLinks = [
      { name: "Dashboard", route: "/admin" },
      { name: "Utilisateurs", route: "/users" },
      { name: "Restaurants", route: "/restaurants" }
    ]
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    < div className="flex min-h-screen" >
      < div className="flex min-h-screen" >
        {/* Sidebar (affichage responsive) */}
        < Sidebar isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)
        } />

        {/* Contenu principal */}
        <div className="flex flex-col flex-1">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* {location.pathname === "/admin" && (
            <div className="bg-white py-10">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-10">Vos Statistiques :</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {stats.map(stat => (
                    <div key={stat.id} className={`${stat.color} p-5 rounded-2xl shadow-md text-center text-white`}>
                      <dd className="text-3xl font-bold">{stat.value}</dd>
                      <dt className="text-lg mt-2">{stat.name}</dt>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )} */}

          <main className="flex-1 p-6 w-full">
            <div className="mx-auto max-w-7xl w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div >
    </div >
  );
}