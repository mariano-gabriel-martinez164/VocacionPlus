import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

// Paleta de colores
const colors = {
    background: '#1a0f0f',
    primary: '#e63946',
    secondary: '#a8dadc',
    textPrimary: '#ffffff',
};

const Terminos = () => {
    return (
        <Box sx={{ backgroundColor: colors.background, minHeight: '100vh', py: 5, color: colors.textPrimary }}>
            <Container maxWidth="md">
                <Typography variant="h3" component="h1" sx={{ color: colors.secondary, mb: 2, fontWeight: 'bold' }}>
                    Términos y Condiciones
                </Typography>
                <Typography variant="caption" sx={{ color: '#ccc' }}>
                    Última actualización: 7 de Octubre, 2025
                </Typography>

                <Divider sx={{ my: 4, borderColor: colors.secondary }} />

                <Typography variant="h5" sx={{ color: colors.secondary, mt: 4, mb: 2 }}>
                    
Aceptación de los términos</Typography><Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                 Al acceder y utilizar Vocacion Plus (el "Servicio"), aceptas y estás sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con todos los términos y condiciones, no utilices el Servicio.</Typography>

                <Typography variant="h5" sx={{ color: colors.secondary, mt: 4, mb: 2 }}>
                    
Uso del Servicio</Typography><Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                 Se te concede una licencia limitada, no exclusiva y no transferible para acceder y utilizar el Servicio para tus fines personales y no comerciales. No debes utilizar el servicio para ningún propósito ilegal o no autorizado.</Typography>

                {/* Agrega más secciones según sea necesario */}
            </Container>
        </Box>
    );
};

export default Terminos;
