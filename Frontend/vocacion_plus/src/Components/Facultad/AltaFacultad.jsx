import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { crearFacultad } from "../../services/facultadService"; // tu servicio
import '../../App.css';
import './AltaFacultad.css';

const AltaFacultad = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [facultad, setFacultad] = useState({
    nombre: "",
    imagen: "",
    acronimo: "",
    telefono: "",
    correo: "",
    publica: true,
    descripcion: "",
    direccion: "",
    localidad: "",
    provincia: "",
    url: ""
  });
  
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
      await crearFacultad(facultad);
      setSuccess("Facultad creada correctamente");
     
    } catch (err) {
      console.error(err);
      setError("Error al crear la facultad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="alta-facultad-screen">
      <Box className="alta-facultad-box">
        <Typography variant="h5" sx={{ mb: 3, color: "#fff" }}>
          Alta de Facultad
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit} className="alta-facultad-form">
          <TextField
            label="Nombre"
            value={facultad.nombre}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Acronimo"
            value={facultad.acronimo}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Telefono"
            value={facultad.telefono}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Correo"
            value={facultad.correo}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descripcion"
            value={facultad.descripcion}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Dirección"
            value={facultad.direccion}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Localidad"
            value={facultad.localidad}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Provincia"
            value={facultad.provincia}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="URL de Imagen"
            value={facultad.imagen}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="URL del sitio oficial"
            value={facultad.url}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="publica-label">Tipo</InputLabel>
            <Select
              labelId="publica-label"
              name="publica"
              value={facultad.publica ? "true" : "false"} // value como string
              label="Tipo"
              onChange={(e) => setFacultad(prev => ({
                ...prev,
                publica: e.target.value === "true" // convertir a boolean
              }))}
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
            {loading ? <CircularProgress size={24} /> : "Guardar"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AltaFacultad;
