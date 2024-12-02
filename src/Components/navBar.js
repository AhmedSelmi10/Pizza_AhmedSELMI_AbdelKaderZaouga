import React from 'react';
import './Dashbord.css';
const NavBar = () => {
    return (
    <aside className="sidebar">
        <h2 className="sidebar-title">🍕 Pizzaria</h2>
        <nav className="menu">
          <a href="#orders">Commandes</a>
          <a href="#pizzas">Pizzas</a>
          <a href="#clients">Clients</a>
          <a href="#stats">Statistiques</a>
          <a href="/profile">Profile</a>
        </nav>
      </aside>
    );
};

export default NavBar;
