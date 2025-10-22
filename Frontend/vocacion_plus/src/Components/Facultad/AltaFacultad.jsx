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
  const [ errores, setErrores] = useState({});
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultad(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let nuevosErrores = {};

    if(!facultad.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if(facultad.nombre.length < 4) nuevosErrores.nombre = "El nombre debe tener mas de 4 caracteres";

    if(!facultad.abreviatura.trim()) nuevosErrores.abreviatura = "La abreviatura es obligatoria";
    if(facultad.abreviatura.length < 2) nuevosErrores.abreviatura ="La abreviatura debe tener mas de 2 caracteres";

    if(!facultad.telefono.trim()) nuevosErrores.telefono = "El telefono es obligatorio";
    if(facultad.nombre.length < 5) nuevosErrores.telefono = "El telefono debe tener mas de 5 caracteres";

    if(!facultad.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(facultad.correo)) {
      nuevosErrores.correo = "El correo no tiene un formato valido";
    }
    
    if(!facultad.direccion.trim()) nuevosErrores.direccion = "La direccion es obligatoria";
    if(facultad.direccion.length < 4) nuevosErrores.direccion = "La direccion debe tener mas de 4 caracteres";
    
    if(!facultad.localidad.trim()) nuevosErrores.localidad = "La localidad es obligatorio";
    if(facultad.localidad.length < 4) nuevosErrores.localidad = "La localidad debe tener mas de 4 caracteres";

    if(!facultad.provincia.trim()) nuevosErrores.provincia = "La provincia es obligatoria";
    if(facultad.provincia.length < 4) nuevosErrores.provincia = "La provincia debe tener mas de 4 caracteres";

    setErrores(nuevosErrores);
    setLoading(true);
    setError("");
    setSuccess("");
    setErrores(nuevosErrores);
    
    if(Object.keys(nuevosErrores).length > 0) {
      setLoading(false)
      return; 
    }
    
    try {
      const respo = await crearFacultad(facultad);
      console.log("repu del back:", respo);
      setSuccess("Facultad creada correctamente");
      window.scrollTo({ top: 0, behavior: "smooth"});
    } catch (err) {
      console.error(err);
      if(err.response) {
        console.log("datos que llego? otra ve?", err.response.data);
      }
      setError("Error al crear la facultad");
      window.scrollTo({ top: 0, behavior: "smooth"});
    } finally {
      setLoading(false);
    }
  }

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
            className="fieldForm"
            label="Nombre"
            name="nombre"
            value={facultad.nombre}
            onChange={handleChange}
            error={!!errores.nombre}
            helperText={errores.nombre}
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
            error={!!errores.abreviatura}
            helperText={errores.abreviatura}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            name="telefono"
            label="Telefono"
            value={facultad.telefono}
            onChange={handleChange}
            error={!!errores.telefono}
            helperText={errores.telefono}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            name="correo"
            label="Correo"
            value={facultad.correo}
            onChange={handleChange}
            error={!!errores.correo}
            helperText={errores.correo}
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
            name="direccion"
            label="Dirección"
            value={facultad.direccion}
            onChange={handleChange}
            error={!!errores.direccion}
            helperText={errores.direccion}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            name="localidad"
            label="Localidad"
            value={facultad.localidad}
            onChange={handleChange}
            error={!!errores.localidad}
            helperText={errores.localidad}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            name="provincia"
            label="Provincia"
            value={facultad.provincia}
            onChange={handleChange}
            error={!!errores.provincia}
            helperText={errores.provincia}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            name="imagen"
            label="URL de Imagen"
            value={facultad.imagen}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            className="fieldForm"
            name="url"
            label="URL del sitio oficial"
            value={facultad.url}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel 
              id="publica-label" 
              sx={{ color: 'var(--color-texto)' }} // color del label
            >
              Tipo
            </InputLabel>
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
                backgroundColor: 'var(--primaryColor-default)', // fondo del select
                color: 'var(--color-texto)', // texto
                '& .MuiSelect-icon': {
                  color: 'var(--primaryColor-white)' // color del triangulito
                }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'var(--primaryColor-default)',
                    color: 'var(--color-texto)',
                  }
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
            {loading ? <CircularProgress size={24} /> : "Guardar"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AltaFacultad;
