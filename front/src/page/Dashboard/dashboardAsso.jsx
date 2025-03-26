import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./dashboardAsso.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAsso = () => {
  const chartData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Nombre de plats",
        data: [50, 80, 120, 160, 200, 220, 250],
        backgroundColor: ["rgb(34, 197, 94)"],
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} plats`,
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tableau de bord</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-number">150</p>
          <p className="stat-label">Bénéficiaires inscrits</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">230</p>
          <p className="stat-label">Repas distribués cette semaine</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">120</p>
          <p className="stat-label">Repas en stock</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">1 200</p>
          <p className="stat-label">Objectif mensuel de repas</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">30</p>
          <p className="stat-label">Bénévoles actifs</p>
        </div>
        <div className="stat-card">
          <p className="stat-number">12</p>
          <p className="stat-label">Partenaires</p>
        </div>
      </div>

      <div className="objectif-container">
        <p className="objectif-title">Avancement Objectif Mensuel</p>
        <div className="objectif-circle">60%</div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Nombre de plats / semaine</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DashboardAsso;
