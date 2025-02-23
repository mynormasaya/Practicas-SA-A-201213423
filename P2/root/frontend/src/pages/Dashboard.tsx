import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error('Error en el logout', error);
        }
    };

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Bienvenido al Dashboard
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <Typography variant="h6">Aquí puedes ver el contenido protegido de la aplicación.</Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Dashboard;