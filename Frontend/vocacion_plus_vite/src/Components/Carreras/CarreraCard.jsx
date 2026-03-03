import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  styled,
  Chip,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": { color: "var(--primary-300)" },
  "& .MuiRating-iconHover": { color: "var(--primary-100)" },
});

const CarreraCard = ({ carrera, Eliminar }) => {
  const [valoracionPromedio, setValoracionPromedio] = useState(0);
  const [loadingValoracion, setLoadingValoracion] = useState(true);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newDescripcion, setNewDescripcion] = useState(carrera.descripcion || "");
  const [saving, setSaving] = useState(false);

  // << NUEVO: estado de facultad >>
  const [facultad, setFacultad] = useState(null);
  const [loadingFacultad, setLoadingFacultad] = useState(true);

  // Token / rol
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const rol = user?.role || null;

  // === Cargar facultad por ID para mostrar abreviatura y ubicación ===
  useEffect(() => {
    const fetchFacultad = async () => {
      if (!carrera?.facultadId) {
        setLoadingFacultad(false);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5073/Facultad/${carrera.facultadId}`);
        setFacultad(res.data || null);
      } catch (e) {
        console.warn("No se pudo cargar la facultad:", e);
        setFacultad(null);
      } finally {
        setLoadingFacultad(false);
      }
    };
    fetchFacultad();
  }, [carrera?.facultadId]);

  // === Cargar valoraciones ===
  useEffect(() => {
    const fetchValoracion = async () => {
      try {
        const res = await axios.get(`http://localhost:5073/Valoracion/carrera/${carrera.id}`);
        const valoraciones = res.data?.valoraciones || [];
        const prom =
          valoraciones.length > 0
            ? valoraciones.reduce((s, v) => s + (v.puntuacion ?? 0), 0) / valoraciones.length
            : 0;
        setValoracionPromedio(prom);
      } catch (err) {
        console.warn(`No se pudo cargar la valoración de la carrera ${carrera.id}`, err);
        setValoracionPromedio(0);
      } finally {
        setLoadingValoracion(false);
      }
    };
    fetchValoracion();
  }, [carrera.id]);

  // === Eliminar carrera (con token) ===
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5073/Carrera/${carrera.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenDelete(false);
      if (Eliminar) Eliminar(carrera.id);
    } catch (err) {
      console.error("Error al eliminar la carrera:", err);
    }
  };

  // === Editar descripción (con token) ===
  const handleEdit = async () => {
    try {
      setSaving(true);
      await axios.put(
        `http://localhost:5073/Carrera/${carrera.id}`,
        { ...carrera, descripcion: newDescripcion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      carrera.descripcion = newDescripcion; // refresco local
      setOpenEdit(false);
    } catch (err) {
      console.error("Error al actualizar la carrera:", err);
    } finally {
      setSaving(false);
    }
  };

  // Abreviatura a mostrar (de facultad si existe; si no, lo que traiga la carrera; y última chance: “—”)
  const chipAbrev =
    (facultad?.abreviatura?.trim?.() || carrera?.facultadAbreviatura?.trim?.()) ?? "—";

  // Ubicación: usa la de la carrera si existe, sino la de la facultad
  const localidad = carrera.localidad || facultad?.localidad || "Sin localidad";
  const provincia = carrera.provincia || facultad?.provincia || "";

  return (
    <Card
      sx={{
        width: 340,
        height: 420,
        backgroundColor: "#202124",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Si alguna vez agregan imagen para carreras */}
      {carrera.imagen && (
        <img
          src={`http://localhost:5073${carrera.imagen}`}
          alt={`Imagen de ${carrera.nombre}`}
          style={{
            width: "100%",
            height: 120,
            objectFit: "cover",
            borderRadius: "4px 4px 0 0",
            marginBottom: "8px",
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, overflow: "hidden", p: 2 }}>
        {/* Header con abreviatura de facultad */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            pb: 1,
            borderBottom: "2px solid var(--primaryColor-white)",
            width: "95%",
            mx: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {carrera.nombre}
          </Typography>

          <Chip
            label={loadingFacultad ? "..." : chipAbrev}
            color="error"
            sx={{ fontWeight: "bold", textTransform: "uppercase" }}
          />
        </Box>

        {/* Descripción */}
        <Typography
          variant="body2"
          sx={{
            color: "#bdbdbd",
            mt: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
          }}
        >
          {carrera.descripcion}
        </Typography>

        {/* Ubicación */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1, color: "#bdbdbd" }}>
          <LocationOnIcon sx={{ mr: 0.5, fontSize: 18, color: "var(--primaryColor-white)" }} />
          <Typography variant="body2" component="span" sx={{ fontStyle: "italic" }}>
            {localidad}
            {provincia ? `, ${provincia}` : ""}
          </Typography>
        </Box>

        {/* Valoración */}
        <Box sx={{ mt: 1, textAlign: rol === "Admin" ? "center" : "right" }}>
          {loadingValoracion ? (
            <CircularProgress size={20} sx={{ color: "var(--primaryColor-white)" }} />
          ) : (
            <StyledRating
              name="valoracion"
              precision={0.2}
              icon={<MenuBookIcon fontSize="small" />}
              emptyIcon={<MenuBookIcon fontSize="small" />}
              value={valoracionPromedio}
              readOnly
            />
          )}
        </Box>
      </CardContent>

      {/* Botonera */}
      <CardActions
        sx={{
          justifyContent: rol === "Admin" ? "center" : "flex-end",
          p: 2,
          borderTop: "1px solid #333",
        }}
      >
        {rol === "Admin" && (
          <>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setOpenEdit(true)}
              sx={{
                backgroundColor: "#34a853",
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { backgroundColor: "#57bb8a" },
                mr: 1,
              }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => setOpenDelete(true)}
              sx={{
                backgroundColor: "#ea4335",
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { backgroundColor: "#ff6b6b" },
                mr: 1,
              }}
            >
              Eliminar
            </Button>
          </>
        )}
        <Button
          component={Link}
          to={`/carrera/${carrera.id}`}
          variant="contained"
          startIcon={<InfoIcon />}
          sx={{
            backgroundColor: "var(--primaryColor-light)",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { backgroundColor: "var(--primaryColor-lighter)" },
          }}
        >
          Detalles
        </Button>
      </CardActions>

      {/* Modal Eliminar */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro que querés eliminar la carrera <strong>{carrera.nombre}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Editar (solo descripción) */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Editar descripción</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            rows={4}
            label="Descripción"
            value={newDescripcion}
            onChange={(e) => setNewDescripcion(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button
            onClick={handleEdit}
            variant="contained"
            disabled={saving}
            sx={{
              backgroundColor: "var(--primaryColor-light)",
              "&:hover": { backgroundColor: "var(--primaryColor-lighter)" },
            }}
          >
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CarreraCard;
