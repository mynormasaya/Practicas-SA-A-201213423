import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setError('');
        setSuccess('');
        if (!email || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (!isValidEmail(email)) {
            setError('El formato del correo electrónico no es válido');
            return;
        }
        try {
            await axios.post('http://localhost:5000/auth/login', { email, password }, { withCredentials: true });
            setSuccess('Inicio de sesión exitoso. Redirigiendo al Dashboard...');
            setTimeout(() => navigate('/dashboard'), 700);
        } catch (error: any) {
            setError(error.response?.data?.error || 'Error en el inicio de sesión');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Iniciar Sesión
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField 
                        label="Correo Electrónico" 
                        variant="outlined" 
                        fullWidth 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <TextField 
                        label="Contraseña" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                        Ingresar
                    </Button>
                    <Button variant="text" fullWidth onClick={() => navigate('/register')}>
                        ¿No tienes cuenta? Regístrate
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;