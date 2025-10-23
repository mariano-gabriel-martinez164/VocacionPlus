import { 
  Breadcrumbs, 
  Divider, 
  Grid, 
  Link, 
  Typography, 
  CircularProgress, 
  Rating, 
  Card, 
  CardContent,
  Button,
  Dialog
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from "axios";
import CareerRatingForm from "./careerRating"; // <-- tu componente de valoración

const DetalleCarrera = () => {
  const { id } = useParams(); // URL: /carrera/:id
  const [carrera, setCarrera] = useState(null);
  const [facultad, setFacultad] = useState(null);
  const [valoraciones, setValoraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // === Cargar carrera ===
  useEffect(() => {
    const fetchCarrera = async () => {
      try {
        const res = await axios.get(`http://localhost:5073/Carrera/${id}`);
        setCarrera(res.data);
      } catch (err) {
        console.error("Error al cargar carrera:", err);
        setError("No se pudo cargar la carrera.");
      }
    };
    if (id) fetchCarrera();
  }, [id]);

  // === Cargar facultad ===
  useEffect(() => {
    const fetchFacultad = async () => {
      if (!carrera?.facultadId) return;
      try {
        const res = await axios.get(`http://localhost:5073/Facultad/${carrera.facultadId}`);
        setFacultad(res.data);
      } catch (err) {
        console.warn("Error al cargar facultad:", err);
      }
    };
    fetchFacultad();
  }, [carrera]);

  // === Cargar valoraciones ===
  const fetchValoraciones = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:5073/Valoracion/carrera/${id}`);
      setValoraciones(res.data.valoraciones || []);
    } catch (err) {
      console.error("Error al cargar valoraciones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValoraciones();
  }, [id]);

  const promedio = valoraciones.length
    ? valoraciones.reduce((s, v) => s + (v.puntuacion ?? 0), 0) / valoraciones.length
    : 0;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: "var(--primary-200)" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!carrera) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="var(--secondary-100)">No se encontró la carrera.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 6,
        backgroundColor: "var(--gray-light)",
        color: "#f5f5f5",
        minHeight: "90vh",
      }}
    >
      {/* === Breadcrumbs === */}
      <Breadcrumbs sx={{ mb: 3, color: "var(--primary-200)" }}>
        <Link component={RouterLink} to="/carrera" underline="hover" color="var(--primary-100)">
          Carreras
        </Link>
        <Typography sx={{ color: "var(--primary-300)" }}>{carrera.nombre}</Typography>
      </Breadcrumbs>

      <Divider sx={{ mb: 3, bgcolor: "white" }} />

      {/* === Datos principales === */}
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff", mb: 1 }}>
        {carrera.nombre}
      </Typography>

      {facultad && (
        <Box
          sx={{
            mb: 4,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderLeft: "4px solid var(--primary-300)",
            borderRadius: "8px",
            p: 2.5,
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <Box
            sx={{
              fontSize: "2rem",
              color: "var(--primary-200)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            🎓
          </Box>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "var(--primary-100)" }}>
              {facultad.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: "#cfcfcf", mt: 0.5 }}>
              {facultad.direccion}, {facultad.localidad}, {facultad.provincia}
            </Typography>
          </Box>
        </Box>
      )}

      {/* === Descripción === */}
      <Typography variant="body1" sx={{ color: "#e0e0e0", mb: 4, lineHeight: 1.7 }}>
        {carrera.descripcion}
      </Typography>

      {/* === Plan de Estudio === */}
      {carrera.planDeEstudio && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: "var(--primary-100)", mb: 1 }}>
            Plan de Estudio
          </Typography>
          <Typography variant="body2" sx={{ color: "#cfcfcf" }}>
            {carrera.planDeEstudio}
          </Typography>
        </Box>
      )}

      {/* === Promedio + Botón Añadir valoración === */}
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 4 }}>
        <Rating value={promedio} readOnly precision={0.1} />
        <Typography sx={{ color: "#ccc" }}>
          {promedio.toFixed(1)} · {valoraciones.length} valoraciones
        </Typography>
        <Button
          variant="contained"
          sx={{
            ml: 3,
            bgcolor: "var(--primary-300)",
            "&:hover": { bgcolor: "var(--primary-200)" },
            fontWeight: "bold",
          }}
          onClick={() => setOpenDialog(true)}
        >
          Añadir valoración
        </Button>
      </Box>

      {/* === Opiniones === */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, color: "var(--primary-200)" }}>
          Opiniones de estudiantes
        </Typography>

        {valoraciones.length > 0 ? (
          valoraciones.map((val) => (
            <Card
              key={val.id}
              sx={{
                mb: 2,
                backgroundColor: "var(--primary-800)",
                color: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2">{val.autorNombre}</Typography>
                  <Rating value={val.puntuacion} readOnly size="small" />
                </Box>
                <Typography variant="body2" sx={{ mt: 1, color: "#ddd" }}>
                  {val.comentario}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            No hay valoraciones aún.
          </Typography>
        )}
      </Box>

      {/* === Popup con formulario de valoración === */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowX: "hidden",
          },
        }}
        BackdropProps={{
          sx: { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <CareerRatingForm
          careerId={carrera.id}
          onCommentSubmitted={() => {
            setOpenDialog(false);
            fetchValoraciones(); // recarga valoraciones
          }}
          onCancel={() => setOpenDialog(false)}
        />
      </Dialog>
    </Box>
  );
};

export default DetalleCarrera;
