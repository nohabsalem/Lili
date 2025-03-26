
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar-resto";
import Header from "@/components/ui/navbar";
import { ADMIN, ASSO, RESTO, MANAGER, AGENT } from "@/config";

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