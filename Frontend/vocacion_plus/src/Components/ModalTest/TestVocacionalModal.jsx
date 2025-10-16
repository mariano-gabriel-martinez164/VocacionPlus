import React, { useState } from "react";
import { Box, Button, Modal, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./TestVocacionalModal.css";

export default function TestVocacionalModal({ onSubmit, onClose }) {
  const [respuestas, setRespuestas] = useState({
	R1: 0, R2: 0, //realista 
    I1: 0, I2: 0, //investigador
	A1: 0, A2: 0, // artistico
	S1: 0, S2: 0, //Social
	E1: 0, E2: 0, //emprendedor
	C1: 0, C2: 0, //convencional
  });

  const handleChange = (e) => {
    setRespuestas({ ...respuestas, [e.target.name]: Number(e.target.value) });
  };

  const handleContinue = () => {
	  const resultados = {
		  Realista: respuestas.R1 + respuestas.R2,
		  Investigador: respuestas.I1 + respuestas.I2,
		  Artistico: respuestas.A1 + respuestas.A2,
		  Social: respuestas.S1 + respuestas.S2,
		  Emprendedor: respuestas.E1 + respuestas.E2,
		  Convencional: respuestas.C1 + respuestas.C2, 
	  };
	  onSubmit(respuestas);
  };

  return (
    <Modal open onClose={onClose}>
	  <Box sx={{
		  	position: 'fixed',
			top: 0,
			left: 0,
			height: '100%',
          	p: 2,
          	width: '100%',
          	display: "flex",
			justifyContent: 'center',
			alignItems: 'center',
        }}
      >
	  <Box
      sx={{
        bgcolor: '#6e2119ff',
        borderRadius: 2,
        p: 6,
        width: '100vh',
		maxHeight: '85vh',
        overflowY: 'auto',       // scroll interno
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
        <Typography variant="h5" textAlign="center" sx={{ m: 3 }}>
          Test Vocacional
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ fontSize: '24px'}}>¿Disfrutarias reparar objetos mecanicos o electronicos?</InputLabel>
          <Select name="Realista 1" sx={{ m: 3 }} value={respuestas.R1} onChange={handleChange}>
            <MenuItem value={0}>Nada</MenuItem>
            <MenuItem value={3}>Poco</MenuItem>
	  		<MenuItem value={5}>Mucho</MenuItem>
          </Select>
        </FormControl>
	   <FormControl fullWidth sx={{ mb: 3 }}>
		<InputLabel sx={{ mb: 1 }}>¿Preferis actividades que te permitan trabajar al aire libre o con tus manos?</InputLabel>
          <Select name="Realista 2" value={respuestas.R2} onChange={handleChange}>
            <MenuItem value={0}>Ninguna</MenuItem>
            <MenuItem value={3}>aire libre</MenuItem>
	  		<MenuItem value={5}>mis manos</MenuItem>
          </Select>
        </FormControl>
   <FormControl fullWidth sx={{ mb: 2 }}>
	  <InputLabel sx={{ mb: 1 }}>¿te atrae resolver problemas complejos o entender como funcionan las cosas?</InputLabel>
          <Select name="Investigador 1" value={respuestas.I1} onChange={handleChange}>
            <MenuItem value={0}>Ninguno</MenuItem>
            <MenuItem value={3}>Problemas complejos</MenuItem>
	  		<MenuItem value={5}>Entender las cosas</MenuItem>
          </Select>
        </FormControl>
   <FormControl fullWidth sx={{ mb: 2 }}>
 	<InputLabel sx={{ mb: 1 }}>¿Disfrutas aprender sobre temas cientificos o tecnologicos por tu cuenta?</InputLabel>
          <Select name="Investigador 2" value={respuestas.I2} onChange={handleChange}>
            <MenuItem value={0}>Nunca</MenuItem>
            <MenuItem value={3}>aveces</MenuItem>
	  		<MenuItem value={5}>Obvio</MenuItem>
          </Select>
        </FormControl>

   <FormControl fullWidth sx={{ mb: 2 }}>
	  <InputLabel sx={{ mb: 1 }}>¿Te gusta expresarte mediante el arte, musica o escritura?</InputLabel>
          <Select name="Artistico 1" value={respuestas.A1} onChange={handleChange}>
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={3}>aveces</MenuItem>
	  		<MenuItem value={5}>Obvio</MenuItem>
          </Select>
        </FormControl>

   <FormControl fullWidth sx={{ mb: 2 }}>
	  <InputLabel sx={{ mb: 1 }}>¿Preferis trabajos donde puedas crear cosas nuevas sin seguir reglas?</InputLabel>
          <Select name="Artistico 2" value={respuestas.A2} onChange={handleChange}>
            <MenuItem value={0}>sigo las reglas</MenuItem>
            <MenuItem value={3}>aveces pienso que algunas reglas sobran</MenuItem>
	  		<MenuItem value={5}>normalmente sigo mis propias reglas</MenuItem>
          </Select>
        </FormControl>

   <FormControl fullWidth sx={{ mb: 2 }}>
 	<InputLabel sx={{ mb: 1 }}>¿te resulta agradable ayudar a otras personas con sus problemas?</InputLabel>
          <Select name="Social 1" value={respuestas.S1} onChange={handleChange}>
            <MenuItem value={0}>no me meto en conflictos ajenos</MenuItem>
            <MenuItem value={3}>si me siento seguro en el tema, ayudo</MenuItem>
	  		<MenuItem value={5}>me encanta darle una mano a los demas</MenuItem>
          </Select>
        </FormControl>
   <FormControl fullWidth sx={{ mb: 2 }}>
	<InputLabel sx={{ mb: 1 }}>¿Te interesa orientar o explicar a los demas en su crecimiento?</InputLabel>
          <Select name="Social 2" value={respuestas.S2} onChange={handleChange}>
            <MenuItem value={0}>No es mi responsabilidad</MenuItem>
            <MenuItem value={3}>si la persona me importa, si</MenuItem>
	  		<MenuItem value={5}>creo que todos deberian recibir apoyo para crecer</MenuItem>
          </Select>
        </FormControl>

   <FormControl fullWidth sx={{ mb: 2 }}>
		  <InputLabel sx={{ mb: 1 }}>¿Te sentis comodo liderando grupos o tomando decisiones importantes?</InputLabel>
          <Select name="Emprendedor 1" value={respuestas.E1} onChange={handleChange}>
            <MenuItem value={0}>Lo detesto</MenuItem>
            <MenuItem value={3}>si no queda de otra, lo hago</MenuItem>
	  		<MenuItem value={5}>Siento que soy el mas capacitado o responsable del rumbo del equipo</MenuItem>
          </Select>
        </FormControl>
   <FormControl fullWidth sx={{ mb: 2 }}>
		  <InputLabel sx={{ mb: 1 }}>¿Disfrutas convencer o motivar a otros para llegar a un objetivo?</InputLabel>
          <Select name="Emprendedor 2" value={respuestas.E2} onChange={handleChange}>
            <MenuItem value={0}>Soy muy timido/a para eso</MenuItem>
            <MenuItem value={3}>Prefiero que otro tome ese rol, pero no me disgusta</MenuItem>
	  		<MenuItem value={5}>Me siento muy comodo cuando mis palabras guian al grupo</MenuItem>
          </Select>
        </FormControl>

   <FormControl fullWidth sx={{ mb: 2 }}>
	  <InputLabel sx={{ mb: 1 }}>¿Te gusta mantener el orden yi seguir procedimientos establecidos?</InputLabel>
          <Select name="Convencional 1" value={respuestas.C1} onChange={handleChange}>
            <MenuItem value={0}>me da igual el orden y pasos a seguir</MenuItem>
            <MenuItem value={3}>me ayudan a orientarme y mejorar</MenuItem>
	  		<MenuItem value={5}>considero vital un buen plan detallado</MenuItem>
          </Select>
        </FormControl>

   <FormControl fullWidth sx={{ mb: 2 }}>
	  <InputLabel sx={{ mb: 1 }}>¿Preferis tareas que impliquen organizacion, planificacion, o manejo de datos?</InputLabel>
          <Select name="Convencional 2" value={respuestas.C2} onChange={handleChange}>
            <MenuItem value={0}>odio eso</MenuItem>
            <MenuItem value={3}>Lo hago pero no me genera nada</MenuItem>
	  		<MenuItem value={5}>Disfruto cuando todo fluye y conecta como corresponde</MenuItem>
          </Select>
        </FormControl>



        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          		<Button variant="contained" onClick={handleContinue}>Continuar</Button>
          			<Button variant="outlined" onClick={onClose}>Cancelar</Button>
        		</Box>
      		</Box>
	 	</Box>
    	</Modal>
  );
}

