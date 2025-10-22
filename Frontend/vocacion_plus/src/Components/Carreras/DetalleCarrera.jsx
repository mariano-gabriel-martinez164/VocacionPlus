import { Breadcrumbs, Divider, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link as RouterLink, Router, useParams } from "react-router-dom";
import ListaFacultades from "./ListaFacultades";
import CareerRatingForm from "./CareerRatingForm";

const DetalleCarrera = () => {
  const parametro = useParams();
  const carrera = parametro.nombre; // con esto busco la carrera
  console.log(carrera)
  const facultades = [
    'nombre - ciudad',
    'nombre - ciudad',
    'nombre - ciudad',
    'nombre - ciudad',
    'nombre - ciudad',
    'nombre - ciudad',
    'nombre - ciudad',
    'nombre - ciudad',
    'nombre - ciudad',
  ];

  const careerId = 'ingenieria-informatica-unlp';

  const handleNewComment = () => {
    console.log('Nuevo comentario enviado. Recargando la lista de opiniones...');
    // Aquí puedes añadir la lógica para recargar los comentarios de la carrera,
    // de modo que la nueva opinión aparezca sin necesidad de recargar la página.
  };

  return (
    <Box>
      <Breadcrumbs sx={{
        color: 'var(--primary-100)',
        fontWeight: 'bold',
        fontSize: '2.5rem',
      }}>
        <Link
          component={RouterLink}
          underline="hover"
          color='var(--primary-100)'
          to="/carrera"
        > Carreras
        </Link>
        <Typography sx={{
          fontSize: '1.5rem',
        }}>
          {carrera}
        </Typography>
      </Breadcrumbs>
      <Divider variant="middle" sx={{
        bgcolor: 'white',
        width: '90vw',
        mx: 'auto'
      }} />
      <Grid container >
      </Grid>
      <ListaFacultades facultades={facultades} />
      <CareerRatingForm careerId={careerId}
        onCommentSubmitted={handleNewComment} />
    </Box>
  );
}

export default DetalleCarrera;
