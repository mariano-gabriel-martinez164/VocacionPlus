import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import axios from "axios";

const CareerRatingForm = ({ careerId, onCommentSubmitted, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [alertLogin, setAlertLogin] = useState(false);

  const colores = {
    fondo: "#0D0D0D",
    primario: "#1E3A5F",
    secundario: "#3B82B3",
    acento: "#B91C1C",
    texto: "#FFFFFF",
    boton: "#2563EB",
    exito: "#D1FAE5",
    textoExito: "#065F46",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const autorId = localStorage.getItem("userId");

    // ✅ Validar sesión
    if (!token || !autorId) {
      setAlertLogin(true);
      return;
    }

    // ✅ Validar inputs
    if (rating === 0) {
      setError("Por favor, selecciona una calificación");
      return;
    }
    if (!comentario.trim()) {
      setError("Por favor, escribe un comentario");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        comentario,
        puntuacion: rating,
        autorId: Number(autorId),
        carreraId: careerId,
      };

      await axios.post(`http://localhost:5073/Valoracion`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setEnviado(true);
      setComentario("");
      setRating(0);
      onCommentSubmitted(); // notifica al componente padre
    } catch (err) {
      console.error("Error al enviar la valoración:", err);
      setError("No se pudo enviar la valoración. Por favor, intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: colores.primario,
          color: colores.texto,
          p: 3,
          borderRadius: 1.5,
          boxShadow: 6,
          width: "90%",
          maxWidth: 680,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: colores.texto }}>
          Califica esta Carrera
        </Typography>

        {/* === Rating con BookOpen === */}
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {[...Array(5)].map((_, index) => {
            const current = index + 1;
            return (
              <IconButton
                key={index}
                onClick={() => {
                  setRating(current);
                  setError("");
                }}
                onMouseEnter={() => setHover(current)}
                onMouseLeave={() => setHover(null)}
                sx={{
                  color:
                    current <= (hover || rating)
                      ? colores.secundario
                      : "rgba(255,255,255,0.6)",
                  transition: "transform 0.15s",
                  "&:hover": { transform: "scale(1.08)" },
                }}
              >
                <BookOpen size={36} />
              </IconButton>
            );
          })}
        </Box>

        {/* === Comentario === */}
        <TextField
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          placeholder="Escribe tu opinión..."
          value={comentario}
          onChange={(e) => {
            setComentario(e.target.value);
            setError("");
          }}
          InputProps={{
            sx: {
              bgcolor: "#0B1220",
              color: colores.texto,
              borderRadius: 1,
            },
          }}
          sx={{ mb: 2, "& .MuiInputBase-root": { overflow: "auto" } }}
        />

        {/* === Error === */}
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        {/* === Botones === */}
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onCancel} sx={{ color: colores.secundario }}>
            CANCELAR
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{
              bgcolor: colores.boton,
              "&:hover": { bgcolor: colores.secundario },
            }}
          >
            {submitting ? "Enviando..." : "ENVIAR OPINIÓN"}
          </Button>
        </Box>

        {/* === Éxito === */}
        <Snackbar
          open={enviado}
          autoHideDuration={3000}
          onClose={() => setEnviado(false)}
        >
          <Alert
            severity="success"
            sx={{
              width: "100%",
              bgcolor: colores.exito,
              color: colores.textoExito,
            }}
          >
            ¡Gracias! Tu opinión sobre la carrera ha sido enviada.
          </Alert>
        </Snackbar>

        {/* === Error de sesión === */}
        <Snackbar
          open={alertLogin}
          autoHideDuration={4000}
          onClose={() => setAlertLogin(false)}
        >
          <Alert
            severity="error"
            sx={{ width: "100%", bgcolor: "#FEE2E2", color: "#991B1B" }}
          >
            Debes iniciar sesión para poder dejar una valoración.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default CareerRatingForm;
