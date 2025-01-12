import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PizzaManager from './Components/Pizza/PizzaManager';
import NotAuthorized from './Components/NotAuthorized';

// Composant Login chargé de manière lazy
const LazyLogin = React.lazy(() => import('./Components/Login/Login'));
const LazyRegister = React.lazy(() => import('./Components/Register/Register'));
const LazyDashboard = React.lazy(() => import('./Components/Dashbord'));
const LazyProfile = React.lazy(() => import('./Components/Profile/MyProfile'));
const LazyPizzaManager = React.lazy(() => import('./Components/Pizza/PizzaManager'));
const LazyNotAuthorized = React.lazy(() => import('./Components/NotAuthorized'));
const LazyVisitePizza = React.lazy(() => import('./Components/Pizza/VisitePizza')); // Ajoutez cette ligne

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/Login" element={<LazyLogin />} />
                    <Route path="/" element={<LazyLogin />} />

                    <Route path="/Register" element={<LazyRegister />} />
                    <Route path="/pizza-manager" element={<LazyPizzaManager />} />
                    <Route path="/not-authorized" element={<LazyNotAuthorized />} />
                    <Route path="/dashboard" element={<LazyDashboard />} />
                    <Route path="/profile" element={<LazyProfile />} />
                    <Route path="/visite-pizza" element={<LazyVisitePizza />} /> {/* Ajoutez cette route */}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
