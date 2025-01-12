// PizzaManager.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PizzaManager.css";
import NavBar from "../navBar";

const PizzaManager = () => {
  const [user, setUser] = useState({});
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({
    label: "",
    description: "",
    prix: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

//important
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/myprofile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data);

        if (response.data.role !== "admin") {
          window.location.href = "/not-authorized";
        } else {
          fetchPizzas();
        }
      } catch (error) {
        setError("Une erreur inattendue est survenue.");
        if (error.response && error.response.status === 401) {
          setError("Non autorisé. Veuillez vous reconnecter.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/pizzas");
      setPizzas(response.data);
    } catch (err) {
      setError("Une erreur est survenue lors de la récupération des pizzas.");
    }
  };

  const handleCreatePizza = async (e) => {
    e.preventDefault();

    if (!newPizza.label || !newPizza.description || !newPizza.prix || !newPizza.image) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    const prix = parseFloat(newPizza.prix);
    if (isNaN(prix) || prix <= 0) {
      setError("Le prix doit être un nombre valide et positif.");
      return;
    }

    const formData = new FormData();
    formData.append("label", newPizza.label);
    formData.append("description", newPizza.description);
    formData.append("prix", prix);
    formData.append("image", newPizza.image);

    try {
      const response = await axios.post("http://localhost:3001/api/pizzas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccessMessage("Pizza créée avec succès !");
      setPizzas([...pizzas, response.data]);
      setNewPizza({ label: "", description: "", prix: "", image: null });
    } catch (err) {
      setError("Erreur lors de la création de la pizza.");
    }
  };

  const handleDeletePizza = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/pizzas/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPizzas(pizzas.filter((pizza) => pizza._id !== id));
      setSuccessMessage("Pizza supprimée avec succès !");
    } catch (err) {
      setError("Erreur lors de la suppression de la pizza.");
    }
  };

  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="main-content">
      <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
          >
            Déconnexion
          </button>      
        <div className="topbar">
          <h2>Gestion des Pizzas</h2>
        </div>

        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="form-section">
              <h3>Créer une nouvelle pizza</h3>
              <form onSubmit={handleCreatePizza} className="pizza-form">
                <input
                  type="text"
                  placeholder="Label"
                  value={newPizza.label}
                  onChange={(e) => setNewPizza({ ...newPizza, label: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newPizza.description}
                  onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })}
                  required
                />
                <input
                  type="number"
                  placeholder="Prix"
                  value={newPizza.prix}
                  onChange={(e) => setNewPizza({ ...newPizza, prix: e.target.value })}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPizza({ ...newPizza, image: e.target.files[0] })}
                  required
                />
                <button type="submit" className="create-btn">Créer la pizza</button>
              </form>
            </div>

            <div className="pizza-list">
              <h3>Toutes les pizzas</h3>
              <div className="pizza-grid">
                {pizzas.map((pizza) => (
                  <div key={pizza._id} className="pizza-card">
                    <img
                      src={`http://localhost:3001${pizza.image}`}
                      alt={pizza.label}
                      className="pizza-image"
                    />
                    <h4>{pizza.label}</h4>
                    <p>{pizza.description}</p>
                    <p>Prix: {pizza.prix} TND</p>
                    <button onClick={() => handleDeletePizza(pizza._id)} className="delete-btn">
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PizzaManager;
