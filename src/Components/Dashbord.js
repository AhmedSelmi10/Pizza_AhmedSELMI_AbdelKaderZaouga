import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashbord.css";
import NavBar from "./navBar";
const Dashboard = () => {
  const lineData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Commandes",
        data: [12, 19, 8, 15, 22, 30, 25],
        borderColor: "#ff5c58",
        backgroundColor: "rgba(255, 92, 88, 0.2)",
      },
    ],
  };

  const barData = {
    labels: ["Margherita", "Pepperoni", "Végétarienne", "Quatre Fromages", "Hawaïenne"],
    datasets: [
      {
        label: "Popularité",
        data: [40, 55, 25, 35, 20],
        backgroundColor: ["#ff5c58", "#ffa931", "#34ace0", "#33d9b2", "#706fd3"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Barre latérale */}
      <NavBar />

      {/* Contenu principal */}
      <main className="main-content">
        <header className="topbar">
          <h1>Dashboard</h1>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
          >
            Déconnexion
          </button>        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>120</h3>
            <p>Commandes aujourd'hui</p>
          </div>
          <div className="stat-card">
            <h3>540TND</h3>
            <p>Ventes du jour</p>
          </div>
          <div className="stat-card">
            <h3>4.8/5</h3>
            <p>Avis clients</p>
          </div>
        </section>

        <section className="charts-section">
          <div className="chart-card">
            <h3>Commandes par jour</h3>
            <Line data={lineData} />
          </div>
          <div className="chart-card">
            <h3>Popularité des pizzas</h3>
            <Bar data={barData} />
          </div>
        </section>

        <section className="orders-section" id="orders">
          <h3>Commandes récentes</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom du Client</th>
                <th>Pizza</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jean Dupont</td>
                <td>Pepperoni</td>
                <td>18TND</td>
                <td>Livrée</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Sarah Lemoine</td>
                <td>Quatre Fromages</td>
                <td>22TND</td>
                <td>En cours</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Paul Morel</td>
                <td>Hawaïenne</td>
                <td>20TND</td>
                <td>Annulée</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
