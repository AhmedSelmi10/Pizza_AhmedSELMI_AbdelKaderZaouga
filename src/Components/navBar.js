import React, { useEffect, useState } from 'react';
import './Dashbord.css';
import axios from 'axios';

const NavBar = () => {
  const [user, setUser] = useState(null);  // Stocker les informations de l'utilisateur

  // Récupérer le profil utilisateur pour savoir quel rôle il a
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/myprofile', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data); // Stocker l'utilisateur dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    };

    fetchProfile();
  }, []);

  // Si l'utilisateur n'est pas encore récupéré, afficher un chargement
  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <aside className="sidebar">
      <nav className="menu">
        <a href="/dashboard" className="sidebar-title">🍕 Pizzaria</a>

        { user.role === 'user' &&<a href="/visite-pizza">Commandes</a>
        }
       
        {/* Lien accessible uniquement aux administrateurs */}
        {user.role === 'admin' && <a href="/pizza-manager">Pizzas</a>}
        {user.role === 'admin' && <a href="">Clients</a>}
        {user.role === 'admin' && <a href="#stats">Statistiques</a>}

        {/* Lien accessible à tous les utilisateurs */}
        <a href="/profile">Profile</a>
      </nav>
    </aside>
  );
};

export default NavBar;
