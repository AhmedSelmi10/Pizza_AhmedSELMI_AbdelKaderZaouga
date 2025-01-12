import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';
import "./PizzaManager.css";
import '../Dashbord.css';
import './visite.css'
import NavBar from '../navBar';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate au lieu de useHistory

const VisitePizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null); // Pour stocker l'information de l'utilisateur
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Remplacer useHistory par useNavigate

  // Récupération du profil utilisateur pour vérifier son statut
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/myprofile', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data);

        if (response.data.role === "admin") {
          navigate("/not-authorized"); // Utiliser navigate pour rediriger l'utilisateur
        } else {
          fetchPizzas(); // Si l'utilisateur est un utilisateur classique, récupérer les pizzas
        }
      } catch (error) {
        setError("Non autorisé. Veuillez vous reconnecter.");
        localStorage.removeItem("token"); // Supprimer le token en cas d'erreur
        navigate("/login"); // Rediriger vers la page de connexion
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Appel à l'API pour récupérer les pizzas disponibles
  const fetchPizzas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/pizzas');
      setPizzas(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des pizzas:', error);
    }
  };

  // Ajouter une pizza au panier
  const addToCart = (pizza) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart, pizza];
      setTotalPrice(updatedCart.reduce((total, item) => total + item.prix, 0));
      return updatedCart;
    });
  };

  // Retirer une pizza du panier
  const removeFromCart = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item._id !== id);
      setTotalPrice(updatedCart.reduce((total, item) => total + item.prix, 0));
      return updatedCart;
    });
  };

  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="pizza-ordering">
        <h1>Commander vos pizzas</h1>

        {isLoading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="pizza-list">
            {pizzas.map(pizza => (
              <div key={pizza._id} className="pizza-card">
                <img
                  src={`http://localhost:3001${pizza.image}`}
                  alt={pizza.label}
                  className="pizza-image"
                />
                <h3>{pizza.label}</h3>
                <p>{pizza.description}</p>
                <p className="price">{pizza.prix} TND</p>
                <button onClick={() => addToCart(pizza)}>Ajouter au panier</button>
              </div>
            ))}
          </div>
        )}

        <Cart cart={cart} removeFromCart={removeFromCart} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default VisitePizza;
