import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('http://localhost:5000/auth/refresh-token', { withCredentials: true });
            } catch (error) {
                console.error('No hay sesión activa', error);
                if (window.location.pathname !== '/register') { // ✅ Permitir que Register sea accesible
                    navigate('/login');
                }
            }
        };
    
        checkAuth();
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />  {/* Redirigir a Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
    );
};

export default App;
