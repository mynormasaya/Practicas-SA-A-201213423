import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleBlurEmail = () => {
        if (!isValidEmail(email)) {
            setEmailError('El formato del correo electrónico no es válido');
        } else {
            setEmailError('');
        }
    };

    const handleRegister = async () => {
        setError('');
        setSuccess('');
        if (!name || !email || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }
        if (!isValidEmail(email)) {
            setError('El formato del correo electrónico no es válido');
            return;
        }
        try {
            await axios.post('http://localhost:5000/auth/register', { name, email, password });
            setSuccess('Registro exitoso. Redirigiendo al login...');
            setTimeout(() => navigate('/login'), 700);
        } catch (error: any) {
            setError(error.response?.data?.error || 'Error en el registro');
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Registro de Usuario
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField 
                        label="Nombre" 
                        variant="outlined" 
                        fullWidth 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <TextField 
                        label="Correo Electrónico" 
                        variant="outlined" 
                        fullWidth 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        onBlur={handleBlurEmail}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField 
                        label="Contraseña" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                        Registrarse
                    </Button>
                    <Button variant="text" fullWidth onClick={() => navigate('/login')}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;