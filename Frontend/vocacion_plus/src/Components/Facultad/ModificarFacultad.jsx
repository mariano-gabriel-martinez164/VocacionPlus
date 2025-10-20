import React, { useState, useEffect } from "react";
import { 
  Box, TextField, Button, Typography,
  CircularProgress, Alert,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { getFacultadById, editarFacultad } from "../../services/facultadService";
import { useParams } from "react-router-dom";
import '../../App.css';
import './AltaFacultad.css';

const EditarFacultad = () => {
  const { id } = useParams(); // id de la facultad a editar
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [facultad, setFacultad] = useState({
    nombre: "",
    imagen: "",
    abreviatura: "",
    telefono: "",
    correo: "",
    publica: true,
    descripcion: "",
    direccion: "",
    localidad: "",
    provincia: "",
    url: ""
  });

  // Cargar datos al iniciar
  useEffect(() => {
    const fetchFacultad = async () => {
      setLoading(true);
      try {
        console.log("el id es...=",id);
        const res = await getFacultadById(id);
        setFacultad(res);
        console.log("ok sup la fac es :", res);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la facultad");
      } finally {
        setLoading(false);
      }
    }
    fetchFacultad();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultad(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await editarFacultad(id, facultad);
      setSuccess("Facultad actualizada correctamente");
      window.scrollTo({ top: 0, behavior: "smooth"});
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la facultad");
      window.scrollTo({ top: 0, behavior: "smooth"});
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box className="alta-facultad-screen">
      <Box className="alta-facultad-box">
        <Typography variant="h5" sx={{ mb: 3, color: "#fff" }}>
          Editar Facultad
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit} className="alta-facultad-form">
          {/* Aquí vas copiando los TextField y Select del Alta, cambiando value y name */}
          <TextField
            className="fieldForm"
            label="Nombre"
            name="nombre"
            value={facultad.nombre}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="Abreviatura"
            name="abreviatura"
            value={facultad.abreviatura}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="Telefono"
            name="telefono"
            value={facultad.telefono}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="Correo"
            name="correo"
            value={facultad.correo}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            name="descripcion"
            label="Descripcion"
            value={facultad.descripcion}
            onChange={handleChange}
            fullWidth
            required
            multiline        // permite varias líneas
            minRows={3}      // empieza con 3 filas
            maxRows={10}     // puede crecer hasta 10 filas
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="Dirección"
            name="direccion"
            value={facultad.direccion}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="Localidad"
            name="localidad"
            value={facultad.localidad}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="Provincia"
            name="provincia"
            value={facultad.provincia}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="URL de Imagen"
            name="imagen"
            value={facultad.imagen}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            label="URL del sitio oficial"
            name="url"
            value={facultad.url}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="publica-label" sx={{ color: 'var(--color-texto)' }}>Tipo</InputLabel>
            <Select
              labelId="publica-label"
              name="publica"
              value={facultad.publica ? "true" : "false"}
              label="Tipo"
              onChange={(e) =>
                setFacultad(prev => ({
                  ...prev,
                  publica: e.target.value === "true"
                }))
              }
              sx={{
                backgroundColor: 'var(--primaryColor-default)',
                color: 'var(--color-texto)',
                '& .MuiSelect-icon': { color: 'var(--primaryColor-white)' }
              }}
              MenuProps={{
                PaperProps: {
                  sx: { backgroundColor: 'var(--primaryColor-default)', color: 'var(--color-texto)' }
                }
              }}
            >
              <MenuItem value="true">Pública</MenuItem>
              <MenuItem value="false">Privada</MenuItem>
            </Select>
          </FormControl>

          <Button 
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "var(--primaryColor-light)",
              "&:hover": { backgroundColor: "var(--primaryColor-lighter)" },
              fontWeight: "bold"
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Actualizar"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditarFacultad;
