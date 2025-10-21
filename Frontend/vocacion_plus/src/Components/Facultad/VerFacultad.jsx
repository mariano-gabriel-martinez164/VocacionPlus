import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box,
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Divider, 
  Chip, 
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { getFacultadById } from "../../services/facultadService"; 
import { getCarrerasByFacultad } from "../../services/carreraService";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // Icon for careers
import "./VerFacultad.css";
import "../../App.css";
import Pagination from "@mui/material/Pagination";

const VerFacultad = () => {
  const { id } = useParams();
  const [facultad, setFacultad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [carreras, setCarreras] = useState([]);
  const [loading2 , setLoading2] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (_, value) => setPage(value);

  const carrerasPaginadas = carreras.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  useEffect(() => {
    const fetchFacultad = async () => {
      try {
        const data = await getFacultadById(id);
        setFacultad(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información de la facultad.");
      } finally {
        setLoading(false);
      }
    };

    fetchFacultad();
  }, [id]);

  useEffect(() => {
    if (!facultad) {
      console.log("esperando facultad...");
      return;
    }

    const fetchCarreras = async () => {
      console.log("buscando carreras de facu ::", facultad.id);
      try {
        const response = await getCarrerasByFacultad(facultad.id);
        setCarreras(response.data);
      } catch (error) {
        console.error("error cargando carreras", error);
      } finally {
        setLoading2(false);
      }
    };
    fetchCarreras();
  }, [facultad]);

  if (loading) {
    return (
      <Box className="ver-facultad-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="ver-facultad-screen">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!facultad) return null;

  return (
    <Box className="ver-facultad-screen" sx= {{background: 'linear-gradient(180deg, var(--primaryColor-light) 0%, var(--backgroundColor-default) 100%)'}}>
      <Card className="ver-facultad-card" sx={{backgroundColor: "var(--primaryColor-dark)", color: "var(--color-texto)"}}>
        <CardMedia
          component="img"
          height="220"
          image= {`http://localhost:5073${facultad.imagen}`}
          alt={facultad.nombre}
          className="ver-facultad-img"
        />

        <CardContent className="ver-facultad-content">
          <Typography variant="h3" className="ver-facultad-nombre">
            {facultad.nombre}
          </Typography>

          <Chip
            label={facultad.accesibilidad ? "Pública" : "Privada"}
            color={facultad.accesibilidad ? "success" : "warning"}
            sx={{ mb: 2, fontWeight: "bold" }}
          />

          <Typography variant="body1" className="ver-facultad-descripcion">
            {facultad.descripcion}
          </Typography>

          <Divider sx={{ my: 2, bgcolor: "var(--primaryColor-light)" }} />

          <Typography><strong>Acrónimo:</strong> {facultad.abreviatura}</Typography>
          <Typography><strong>Teléfono:</strong> {facultad.telefono}</Typography>
          <Typography><strong>Correo:</strong> {facultad.correo}</Typography>
          <Typography><strong>Dirección:</strong> {facultad.direccion}</Typography>
          <Typography><strong>Localidad:</strong> {facultad.localidad}</Typography>
          <Typography><strong>Provincia:</strong> {facultad.provincia}</Typography>

          {facultad.url && (
            <Typography sx={{ mt: 2 }}>
              🌐 <a href={facultad.url} target="_blank" rel="noopener noreferrer" className="ver-facultad-link">
                Sitio oficial
              </a>
            </Typography>
          )}
        </CardContent>
      </Card>
      <Card
        sx={{
          width: "90%",
          backgroundColor: "var(--primaryColor-dark)",
          color: "var(--color-texto)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          borderRadius: 2,
          mt: 4,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Carreras disponibles
          </Typography>
          <Divider sx={{ mb: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />

          {loading2 ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
              <CircularProgress size={28} sx={{ color: "white" }} />
            </Box>
          ) : carreras.length > 0 ? (
            <>
              <List>
                {carrerasPaginadas.map((carrera) => (
                  <ListItem key={carrera.id} divider>
                    <AccountBalanceIcon sx={{ mr: 1, fontSize: 18, color: 'var(--primaryColor-white)' }} />
                    <ListItemText primary={carrera.nombre} />
                  </ListItem>
                ))}
              </List>
              {carreras.length > itemsPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Pagination
                    count={Math.ceil(carreras.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    sx={{
                      "& .MuiPaginationItem-root": { color: "white" },
                      "& .Mui-selected": {
                        backgroundColor: "var(--primaryColor-dark)",
                        color: "white",
                      },
                    }}/>
                </Box>
              )}
            </>
          ) : (
            <Typography variant="body2" color="gray">
              No hay carreras registradas para esta facultad.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerFacultad;
