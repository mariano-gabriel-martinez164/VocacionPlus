import { Breadcrumbs, Divider, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link as RouterLink, Router, useParams } from "react-router-dom";

const VerCarrera = () => {
  const parametro = useParams();
  const carrera = parametro.nombre; // con esto busco la carrera
  // console.log(carrera)
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
    </Box>
  );
}

export default VerCarrera;
