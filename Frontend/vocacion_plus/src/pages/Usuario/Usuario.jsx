import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [testVocacional, setTestVocacional] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const userRes = await axios.get(`http://localhost:5073/Usuario/${userId}`);
        setUser(userRes.data);

        const testRes = await axios.get(`http://localhost:5073/TestVocacional/${userId}`);
        setTestVocacional(testRes.data);

        const commentsRes = await axios.get(`http://localhost:5073/comentarios/usuario/${userId}?limit=5`);
        setComentarios(commentsRes.data);

      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">No se encontró el usuario.</Typography>
      </Box>
    );
  }

  // === Datos para el gráfico ===
  const testLabels = [
    "Realista",
    "Investigador",
    "Artístico",
    "Social",
    "Emprendedor",
    "Convencional",
  ];

  const testValues = testVocacional
    ? [
        testVocacional.realista,
        testVocacional.investigador,
        testVocacional.artistico,
        testVocacional.social,
        testVocacional.emprendedor,
        testVocacional.convencional,
      ]
    : [0, 0, 0, 0, 0, 0];

  const chartData = {
    labels: testLabels,
    datasets: [
      {
        label: "Puntaje",
        data: testValues,
        backgroundColor: [
          "rgba(33, 150, 243, 0.8)",
          "rgba(156, 39, 176, 0.8)",
          "rgba(244, 67, 54, 0.8)",
          "rgba(255, 193, 7, 0.8)",
          "rgba(76, 175, 80, 0.8)",
          "rgba(121, 85, 72, 0.8)",
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, var(--primary-100), var(--gray-light))",
        padding: 6,
      }}
    >
      {/* === FOTO DE PERFIL (grande) === */}
      <Avatar
        alt={user.nombre}
        src={user.foto || "/default-avatar.png"}
        sx={{
          width: 220,
          height: 220,
          mb: 2,
          boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
          border: "4px solid var(--primary-400)",
          fontSize: "5rem",
        }}
      />

      {/* === NOMBRE === */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "var(--primary-700)",
          textShadow: "1px 1px 3px rgba(0,0,0,0.25)",
        }}
      >
        {user.nombre} {user.apellido}
      </Typography>

      {/* === BOTONES === */}
      <Stack direction="row" spacing={3} sx={{ mb: 5 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "var(--primary-600)",
            color: "white",
            "&:hover": { bgcolor: "var(--primary-700)" },
            fontWeight: "bold",
            px: 3,
          }}
        >
          EDITAR PERFIL
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "/login";
          }}
          sx={{
            bgcolor: "var(--error, #b71c1c)",
            color: "#fff",
            fontWeight: "bold",
            border: "1px solid #b71c1c",
            px: 3,
            "&:hover": {
              bgcolor: "#d32f2f",
              borderColor: "#d32f2f",
            },
          }}
        >
          CERRAR SESIÓN
        </Button>
      </Stack>

      {/* === TEST VOCACIONAL === */}
      <Card
        sx={{
          width: "90%",
          maxWidth: 800,
          mb: 5,
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          backgroundColor: "var(--primary-800)",
          color: "var(--secondary-100)",
          padding: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Resultado del Test Vocacional
          </Typography>

          {testVocacional ? (
            <Box sx={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 2, padding: 3 }}>
              <Bar data={chartData} options={chartOptions} />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Aún no has realizado un test vocacional.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* === COMENTARIOS === */}
      <Box sx={{ width: "90%", maxWidth: 900 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: "var(--color-texto)",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Últimos comentarios
        </Typography>

        <Grid container spacing={3}>
          {comentarios && comentarios.length > 0 ? (
            comentarios.map((comentario, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    height: "100%",
                    backgroundColor: "var(--gray-light)",
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 1, color: "#333" }}>
                      “{comentario.texto}”
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comentario.fecha).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ m: "auto", color: "#666" }}>
              No hay comentarios aún.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
