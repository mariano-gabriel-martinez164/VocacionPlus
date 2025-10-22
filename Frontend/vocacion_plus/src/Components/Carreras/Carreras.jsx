import { Autocomplete, TextField, Typography, InputAdornment, Divider, Fab, Pagination, styled } from "@mui/material";
import { Box, Grid, Stack } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CarreraCard from "./CarreraCard";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "var(--primary-300)",
    border: "1px solid var(--primary-300)",
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "var(--primary-100)",
  },
  "& .Mui-selected": {
    backgroundColor: "var(--primary-500)",
    color: "#fff",
  },
  "& .MuiPaginationItem-ellipsis": {
    color: "gray",
  },
}));

const Carrera = () => {
  const carreras = [
    {
      "carrera_id": 1,
      "nombre": "Ingeniería en Sistemas de Información",
      "Valoracion": 9,
      "descripcion": "Formación en desarrollo de software, redes y gestión de proyectos tecnológicos.",
      "facultad_id": 1,
      "plan de estudio": "Plan 2023 - 5 años con prácticas profesionales."
    },
    {
      "carrera_id": 2,
      "nombre": "Licenciatura en Administración",
      "Valoracion": 7,
      "descripcion": "Gestión de empresas, finanzas, recursos humanos y marketing.",
      "facultad_id": 2,
      "plan de estudio": "Plan 2020 - 4 años con orientación en gestión empresarial."
    },
    {
      "carrera_id": 3,
      "nombre": "Contador Público",
      "Valoracion": 8,
      "descripcion": "Formación en contabilidad, auditoría, derecho y economía.",
      "facultad_id": 2,
      "plan de estudio": "Plan 2019 - 5 años con materias optativas en tributación."
    },
    {
      "carrera_id": 4,
      "nombre": "Ingeniería Civil",
      "Valoracion": 8,
      "descripcion": "Diseño, cálculo y dirección de obras civiles y estructuras.",
      "facultad_id": 3,
      "plan de estudio": "Plan 2021 - 6 años con pasantías en empresas constructoras."
    },
    {
      "carrera_id": 5,
      "nombre": "Arquitectura",
      "Valoracion": 7,
      "descripcion": "Diseño de edificios, urbanismo y planificación arquitectónica.",
      "facultad_id": 3,
      "plan de estudio": "Plan 2018 - 6 años con orientación en sustentabilidad."
    },
    {
      "carrera_id": 6,
      "nombre": "Medicina",
      "Valoracion": 10,
      "descripcion": "Formación médica integral con prácticas hospitalarias desde el primer año.",
      "facultad_id": 4,
      "plan de estudio": "Plan 2022 - 7 años con ciclo clínico y rotaciones."
    },
    {
      "carrera_id": 7,
      "nombre": "Licenciatura en Psicología",
      "Valoracion": 8,
      "descripcion": "Estudio de la conducta humana, teorías psicológicas y prácticas clínicas.",
      "facultad_id": 4,
      "plan de estudio": "Plan 2020 - 5 años con orientación clínica, laboral o educativa."
    },
    {
      "carrera_id": 8,
      "nombre": "Licenciatura en Ciencias de la Comunicación",
      "Valoracion": 7,
      "descripcion": "Formación en periodismo, comunicación institucional y medios digitales.",
      "facultad_id": 5,
      "plan de estudio": "Plan 2021 - 4 años con talleres prácticos en medios."
    }
  ];
  const facultades = [
    {
      "facultad_id": 1,
      "nombre": "Facultad de Ingeniería en Sistemas"
    },
    {
      "facultad_id": 2,
      "nombre": "Facultad de Ciencias Económicas"
    },
    {
      "facultad_id": 3,
      "nombre": "Facultad de Arquitectura e Ingeniería Civil"
    },
    {
      "facultad_id": 4,
      "nombre": "Facultad de Ciencias de la Salud"
    },
    {
      "facultad_id": 5,
      "nombre": "Facultad de Ciencias Sociales y Comunicación"
    }
  ];
 
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("./alta-carrera");
  }
  return (
    <Box display="flex" flexDirection="column" sx={{
      backgroundColor: "var(--gray-light)",
      pb: 6,
      minHeight: "88vh"
    }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ m: 14, pt: 2, mt: 0, mb: 3 }}
      >
        <Typography variant="h4" sx={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "var(--primary-200)",
          flexGrow: 1,
        }}>
          Carreras
        </Typography>
        <Autocomplete
          sx={{
            alignContent: "center",
            flexGrow: 2,
          }}
          freeSolo
          disableClearable
          options={carreras.map(carrera => carrera.nombre)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar carrera"
              variant="outlined"
              size="medium"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon fontSize="large" />
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: "var(--secondary-500)",
                  borderRadius: "12px",
                  color: "var(--secondary-500)",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" }, // saca el borde del input
                },
                input: { color: "var(--secondary-100)" }, // color del placeholder/texto
              }}
            />
          )}
        />
      </Stack>
      <Divider sx={{ mb: 2, bgcolor: "var(--white)", mr: 8, ml: 8 }} />
      <Grid container spacing={4} sx={{ paddingInline: "8vw", paddingBlock: "4vh" }}>
        {carreras.map((item, index) => (
          <Grid key={index} size={3} m={0}>
            <CarreraCard carrera={item} index={index} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}>
        <Fab aria-label="add" onClick={handleOnClick} sx={{
          color: "var(--primary-200)",
          bgcolor: "var(--gray-light)",
          border: 2,
          borderColor: "var(--primary-200)",
          transition: "all 0.3s ease",
          position: "relative",
          bottom: 20,
          right: 16,
          '&:hover': {
            bgcolor: 'var(--primary-500)',
            transform: 'scale(1.08)',
          },
        }}>
          <AddIcon />
        </Fab>
      </Box>
      <Box display='flex' justifyContent='center'>
        <CustomPagination count={5} />
      </Box>
    </Box>
  );
}

export default Carrera;
