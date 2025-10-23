import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { keyframes } from "@mui/system"; // ✅ Importamos para la animación

// 🎬 Animación del gradiente
const moveGradient = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(-45deg, #120006, #2b0010, #510017, #1a0009)",
        backgroundSize: "400% 400%",
        animation: `${moveGradient} 18s ease infinite`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        boxShadow: "inset 0 0 120px rgba(0,0,0,0.6)",
      }}
    >
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
            mb: 2,
          }}
        >
          Descubrí tu Vocación
        </Typography>
        <Typography
          variant="h5"
          sx={{
            maxWidth: 600,
            mb: 4,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Elegí tu futuro con claridad. Conocé las carreras que mejor se adaptan
          a vos y a tus talentos.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#b71c1c",
            color: "#fff",
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            "&:hover": {
              backgroundColor: "#d32f2f",
              boxShadow: "0 0 20px rgba(255,0,0,0.4)",
            },
          }}
          href="/register"
        >
          Comenzar ahora
        </Button>
      </Box>

      {/* ===== SOBRE NOSOTROS ===== */}
      <Box sx={{ py: 10, px: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
          ¿Qué es Vocación Plus?
        </Typography>
        <Divider
          sx={{
            width: "80px",
            height: "3px",
            backgroundColor: "#b71c1c",
            mx: "auto",
            mb: 4,
          }}
        />
        <Typography
          sx={{
            maxWidth: 800,
            mx: "auto",
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.1rem",
          }}
        >
          Vocación Plus es una plataforma diseñada para ayudarte a descubrir tu
          camino profesional. Realizá nuestro test vocacional y encontrá la carrera
          que más se adapta a tus habilidades, intereses y valores personales.
        </Typography>
      </Box>

      {/* ===== SERVICIOS / BENEFICIOS ===== */}
      <Box sx={{ py: 10, px: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 5,
            textAlign: "center",
            color: "#fff",
          }}
        >
          ¿Por qué elegirnos?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Test Vocacional Inteligente",
              text: "Descubrí tu perfil profesional con nuestro test basado en psicología ocupacional.",
            },
            {
              title: "Carreras y Universidades",
              text: "Explorá una base de datos completa de universidades y carreras de toda Argentina.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 4,
                  p: 2,
                  textAlign: "center",
                  height: "100%",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(4px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 8px 30px rgba(255,0,0,0.5)",
                    background: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      color: "#ffffff",
                      textShadow: "0 0 10px rgba(255,255,255,0.2)",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#f0f0f0",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ===== TESTIMONIOS ===== */}
      <Box sx={{ py: 10, px: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#fff" }}>
          Lo que dicen nuestros usuarios
        </Typography>
        <Divider
          sx={{
            width: "80px",
            height: "3px",
            backgroundColor: "#b71c1c",
            mx: "auto",
            mb: 5,
          }}
        />
        <Typography
          sx={{
            fontStyle: "italic",
            color: "rgba(255,255,255,0.9)",
            maxWidth: 700,
            mx: "auto",
            mb: 4,
          }}
        >
          “Gracias a Vocación Plus entendí cuál era mi verdadero camino profesional.
          Hoy estudio lo que amo.”
        </Typography>
        <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
          — Juan Pérez, estudiante
        </Typography>
      </Box>

      {/* ===== FOOTER ===== */}
      <Box
        sx={{
          py: 4,
          backgroundColor: "rgba(0,0,0,0.6)",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
          © {new Date().getFullYear()} Vocación Plus — Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
