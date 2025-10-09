import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

// Estilo para los enlaces del footer, para que coincidan con el tema rojo
const linkStyles = {
  color: '#e0e0e0', // Un blanco suave para el texto del enlace
  textDecoration: 'none',
  '&:hover': {
    color: '#E53935', // Rojo vibrante al pasar el mouse, similar a tu diseño
    textDecoration: 'underline',
  },
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1F1F1F', // Fondo oscuro, casi negro, como en tu captura
        color: '#FFFFFF',
        py: 5, // Padding vertical
        borderTop: '1px solid #333', // Un borde sutil para separar del contenido
        mt: 'auto', // Clave para empujar el footer hacia abajo
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">

          {/* Columna 1: Descripción */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Facultades App
            </Typography>
            <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
              Plataforma dedicada a proveer información detallada sobre las facultades regionales. Encontrá ubicaciones, carreras y más.
            </Typography>
          </Grid>

          {/* Columna 2: Enlaces Rápidos */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Información
            </Typography>
            <Link href="/contacto" sx={linkStyles} display="block">Contacto</Link>
            <Link href="/privacidad" sx={linkStyles} display="block">Política de Privacidad</Link>
            <Link href="/terminos" sx={linkStyles} display="block">Términos y Condiciones</Link>
          </Grid>
          
        </Grid>

        {/* Derechos Reservados */}
        <Box mt={4} sx={{ pt: 3, borderTop: '1px solid #333' }}>
          <Typography variant="body2" align="center" sx={{ color: '#757575' }}>
            © {new Date().getFullYear()} Facultades App. Todos los derechos reservados.
          </Typography>
        </Box>
        
      </Container>
    </Box>
  );
};

export default Footer;