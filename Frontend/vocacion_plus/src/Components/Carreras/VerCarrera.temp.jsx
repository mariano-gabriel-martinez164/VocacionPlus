import { 
  Breadcrumbs, 
  Divider, 
  Grid, 
  Link, 
  Typography, 
  CircularProgress, 
  Rating,
  Button,
  Dialog,
  Card,
  CardContent,
  Box,
  styled
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CareerRatingForm from "./careerRating";
import { getCarreraById } from "../../services/carreraService";
import { getValoracionesByCarrera } from "../../services/valoracionService";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--primary-300)',
  },
  '& .MuiRating-iconEmpty': {
    color: 'var(--primary-100)',
  }
});

const DetalleCarrera = () => {
  const { nombre } = useParams();
  const [carrera, setCarrera] = useState(null);
  const [valoraciones, setValoraciones] = useState([]);
  const [promedioValoracion, setPromedioValoracion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRatingDialog, setOpenRatingDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Por ahora simulamos la data de la carrera
        const carreraData = {
          id: 1, // ID simulado
          nombre: decodeURIComponent(nombre),
          descripcion: "Esta carrera te prepara para gestionar organizaciones y recursos empresariales de manera eficiente.",
          planEstudio: "Plan 2023 - Incluye materias de gestión, finanzas, marketing y recursos humanos."
        };
        setCarrera(carreraData);

        // Obtenemos las valoraciones reales
        const valoracionesData = await getValoracionesByCarrera(carreraData.id);
        setValoraciones(valoracionesData.valoraciones || []);
        
        // Calculamos el promedio de valoraciones
        if (valoracionesData.valoraciones && valoracionesData.valoraciones.length > 0) {
          const promedio = valoracionesData.valoraciones.reduce((acc, val) => acc + val.puntuacion, 0) / valoracionesData.valoraciones.length;
          setPromedioValoracion(promedio);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("No se pudo cargar la información");
        setLoading(false);
      }
    };

    fetchData();
  }, [nombre]);

  const handleNewComment = async (newValoracion) => {
    try {
      const valoracionesData = await getValoracionesByCarrera(carrera.id);
      setValoraciones(valoracionesData.valoraciones || []);
      setOpenRatingDialog(false);
    } catch (err) {
      console.error("Error al recargar las valoraciones:", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
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
        <Typography>No se encontró la carrera</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, color: 'white' }}>
      <Breadcrumbs sx={{
        color: 'var(--primary-100)',
        fontWeight: 'bold',
        fontSize: '2.5rem',
        mb: 3
      }}>
        <Link
          component={RouterLink}
          underline="hover"
          color='var(--primary-100)'
          to="/carrera"
        > 
          Carreras
        </Link>
        <Typography sx={{
          fontSize: '1.5rem',
          color: 'white'
        }}>
          {carrera.nombre}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Información principal */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: 'var(--primary-500)', mb: 4 }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                {carrera.nombre}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StyledRating
                  value={promedioValoracion}
                  precision={0.5}
                  readOnly
                  icon={<MenuBookIcon fontSize="large" />}
                  emptyIcon={<MenuBookIcon fontSize="large" />}
                />
                <Typography variant="h6" sx={{ ml: 2, color: 'white' }}>
                  {promedioValoracion.toFixed(1)}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                {carrera.descripcion}
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                Plan de Estudio
              </Typography>
              <Typography variant="body1" sx={{ color: 'white' }}>
                {carrera.planEstudio}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sección de valoraciones */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ color: 'white' }}>
              Valoraciones recientes
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setOpenRatingDialog(true)}
              sx={{ 
                bgcolor: 'var(--primary-300)',
                '&:hover': {
                  bgcolor: 'var(--primary-400)',
                }
              }}
            >
              Calificar Carrera
            </Button>
          </Box>

          <Grid container spacing={2}>
            {valoraciones.slice(0, 5).map((valoracion, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ bgcolor: 'var(--primary-500)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StyledRating
                        value={valoracion.puntuacion}
                        readOnly
                        icon={<MenuBookIcon />}
                        emptyIcon={<MenuBookIcon />}
                      />
                      <Typography variant="subtitle1" sx={{ ml: 2, color: 'white' }}>
                        por {valoracion.autorNombre}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      {valoracion.comentario}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Diálogo para calificar */}
      <Dialog 
        open={openRatingDialog} 
        onClose={() => setOpenRatingDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'var(--primary-500)',
            color: 'white'
          }
        }}
      >
        <CareerRatingForm 
          careerId={carrera.id}
          onCommentSubmitted={handleNewComment}
          onCancel={() => setOpenRatingDialog(false)}
        />
      </Dialog>
    </Box>
  );
};

export default DetalleCarrera;