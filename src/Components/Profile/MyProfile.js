import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../navBar";
import "../Dashbord.css";
import "./MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newRole, setNewRole] = useState(""); // Peut être supprimé si non nécessaire
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/myprofile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };
    fetchProfile();
  }, [token]);

  // Fonction pour gérer la mise à jour du mot de passe
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/users/updatePassword/${user._id}`,
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage(response.data.message);
      alert("Mot de passe mis à jour avec succès!");
      window.location.reload(); // Recharger la page pour afficher les nouvelles données
    } catch (error) {
      setError("An error occurred while updating the password.");
      alert("Erreur lors de la mise à jour du mot de passe!");
    }
  };

  // Fonction pour gérer la mise à jour des autres informations du profil (nom, email, etc.)
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/users/updateUserProfile/${user._id}`,
        { name: user.name, lastname: user.lastname, email: user.email, gender: user.gender, birthdate: user.birthdate, profileImage: user.profileImage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Profile updated successfully.");
      setUser(response.data);
      alert("Profil mis à jour avec succès!");
      window.location.reload(); // Recharger la page pour afficher les nouvelles données
    } catch (error) {
      setError("An error occurred while updating the profile.");
      alert("Erreur lors de la mise à jour du profil!");
    }
  };

  return (
    <div className="dashboard-container">
      <NavBar />
      <main className="main-content">
        <header className="topbar">
          <h1>Mon Profil</h1>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login"; // Redirection vers la page de login
            }}
          >
            Déconnexion
          </button>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>{user.name || "Nom non disponible"}</h3>
            <p>Nom de l'utilisateur</p>
          </div>
          <div className="stat-card">
            <h3>{user.email || "Email non disponible"}</h3>
            <p>Email</p>
          </div>
          <div className="stat-card">
            <h3>{user.role || "Role non disponible"}</h3>
            <p>Rôle</p>
          </div>
        </section>

        <section className="orders-section">
          <h3>Modifier les informations</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label>Nom :</label>
              <input
                type="text"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Prénom :</label>
              <input
                type="text"
                value={user.lastname || ""}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Email :</label>
              <input
                type="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Sexe :</label>
              <input
                type="text"
                value={user.gender || ""}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Date de naissance :</label>
              <input
                type="date"
                value={user.birthdate || ""}
                onChange={(e) => setUser({ ...user, birthdate: e.target.value })}
              />
            </div>

            <button type="submit" className="logout-btn1">
              Enregistrer les informations
            </button>
          </form>

          <h3>Modifier le mot de passe</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Ancien mot de passe :</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Nouveau mot de passe :</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="logout-btn1">
              Modifier le mot de passe
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default MyProfile;
