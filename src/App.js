import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Composant Login chargé de manière lazy
const LazyLogin = React.lazy(() => import('./Components/Login/Login'));
const LazyRegister = React.lazy(() => import('./Components/Register/Register'));
const LazyDashboard = React.lazy(() => import('./Components/Dashbord'));
const LazyProfile = React.lazy(() => import('./Components/Profile/MyProfile'));


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/Login" element={<LazyLogin />} />
                    <Route path="/" element={<LazyLogin />} />

                    <Route path="/Register" element={<LazyRegister />} />
                   
                   
                    <Route path="/dashboard" element={<LazyDashboard />} />
                    <Route path="/profile" element={<LazyProfile />} />
                  
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
