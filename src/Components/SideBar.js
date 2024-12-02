import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashbord.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // État pour contrôler l'ouverture du sidebar

    const handleToggleSidebar = () => {
        setIsOpen(!isOpen); // Inverser l'état du sidebar
    };

    const handleItemClick = (item) => {
        // Ici, vous pouvez mettre à jour l'état ou effectuer d'autres actions si nécessaire
        console.log(`Clicked ${item}`);
    };

    return (
        <>
            {/* Bouton Hamburger pour les petits écrans */}
            <button className="hamburger" onClick={handleToggleSidebar}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            {/* Sidebar */}
            <div className={`sideBarre ${isOpen ? 'open' : ''}`}>
                <div className="sideBarre__logo">
                    <div className="sideBarre__cercle"></div>
                    <h1>Vets </h1>
                </div>
                <div className="sideBarre__menu">
                    <ul>
                        <li>
                            <Link to="/dashbord" onClick={() => handleItemClick('Dashboard')}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/Article" onClick={() => handleItemClick('Article')}>
                                Article
                            </Link>
                        </li>
                        <li>
                            <Link to="/CasClinique" onClick={() => handleItemClick('Cas Clinique')}>
                                Cas Clinique
                            </Link>
                        </li>
                        <li>
                            <Link to="/file" onClick={() => handleItemClick('Mes Fichiers')}>
                               Mes Fichiers
                            </Link>
                        </li>
                        {/* Ajoutez d'autres éléments du menu selon vos besoins */}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
