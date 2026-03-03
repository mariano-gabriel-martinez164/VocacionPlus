import React, { useState } from "react";
import { Box, Button, Modal, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./TestVocacionalModal.css";
import { blue } from "@mui/material/colors";

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
    <Modal open onClose={onClose} slotProps={{ backdrop: {sx : { backgroundColor: "rgba(0,0,0, 0.7)" }}}}>
	  <Box sx={{
        color: "var(--color-texto)",
        boxShadow: 8,
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
          borderRadius: 2,
          p: 6,
          width: '85vw',
          maxHeight: '85vh',
          overflowY: 'auto',       // scroll interno
          display: 'flex',
          flexDirection: 'column',
          bgcolor: "var(--primaryColor-dark)",
          gap: 2,
        }}
      >
        <Typography variant="h3" textAlign="center" sx={{ 
          mb: 3, 
          color: "var(--primaryColor-white)", 
          fontWeight:"bold", 
          borderBottom: "3px solid var(--primaryColor-white)", 
          display: "inline-block", 
          pb:1 }}>
          Test Vocacional
        </Typography>

          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{ fontSize: '24px'}}>¿Disfrutarias reparar objetos mecanicos o electronicos?</InputLabel>
            <Select name="R1" sx={{ m: 3 }} value={respuestas.R1} onChange={handleChange}>
              <MenuItem value={0}>Nada</MenuItem>
              <MenuItem value={3}>Poco</MenuItem>
              <MenuItem value={5}>Mucho</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{ fontSize: '24px'}}>¿Preferis actividades que te permitan trabajar al aire libre o con tus manos?</InputLabel>
            <Select name="R2" sx={{ m: 3 }} value={respuestas.R2} onChange={handleChange}>
              <MenuItem value={0}>Ninguna</MenuItem>
              <MenuItem value={3}>aire libre</MenuItem>
              <MenuItem value={5}>mis manos</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{fontSize: '24px'}}>¿te atrae resolver problemas complejos o entender como funcionan las cosas?</InputLabel>
            <Select name="I1" sx={{ m: 3 }} value={respuestas.I1} onChange={handleChange}>
              <MenuItem value={0}>Ninguno</MenuItem>
              <MenuItem value={3}>Problemas complejos</MenuItem>
              <MenuItem value={5}>Entender las cosas</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{ fontSize: '24px' }}>¿Disfrutas aprender sobre temas cientificos o tecnologicos por tu cuenta?</InputLabel>
            <Select name="I2"  sx={{ m: 3 }} value={respuestas.I2} onChange={handleChange}>
              <MenuItem value={0}>Nunca</MenuItem>
              <MenuItem value={3}>aveces</MenuItem>
              <MenuItem value={5}>Obvio</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{ fontSize: '24px'}}>¿Te gusta expresarte mediante el arte, musica o escritura?</InputLabel>
            <Select name="A1"  sx={{ m: 3 }} value={respuestas.A1} onChange={handleChange}>
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={3}>aveces</MenuItem>
              <MenuItem value={5}>Obvio</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{ fontSize: '24px' }}>¿Preferis trabajos donde puedas crear cosas nuevas sin seguir reglas?</InputLabel>
            <Select name="A2" sx={{ m: 3 }} value={respuestas.A2} onChange={handleChange}>
              <MenuItem value={0}>sigo las reglas</MenuItem>
              <MenuItem value={3}>aveces pienso que algunas reglas sobran</MenuItem>
              <MenuItem value={5}>normalmente sigo mis propias reglas</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{ fontSize: '24px' }}>¿te resulta agradable ayudar a otras personas con sus problemas?</InputLabel>
            <Select name="S1" sx={{ m: 3 }} value={respuestas.S1} onChange={handleChange}>
              <MenuItem value={0}>no me meto en conflictos ajenos</MenuItem>
              <MenuItem value={3}>si me siento seguro en el tema, ayudo</MenuItem>
              <MenuItem value={5}>me encanta darle una mano a los demas</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{fontSize: '24px'}}>¿Te interesa orientar o explicar a los demas en su crecimiento?</InputLabel>
            <Select name="S2" sx={{ m: 3 }} value={respuestas.S2} onChange={handleChange}>
              <MenuItem value={0}>No es mi responsabilidad</MenuItem>
              <MenuItem value={3}>si la persona me importa, si</MenuItem>
              <MenuItem value={5}>creo que todos deberian recibir apoyo para crecer</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{fontSize: '24px' }}>¿Te sentis comodo liderando grupos o tomando decisiones importantes?</InputLabel>
            <Select name="E1" sx={{ m: 3 }} value={respuestas.E1} onChange={handleChange}>
              <MenuItem value={0}>Lo detesto</MenuItem>
              <MenuItem value={3}>si no queda de otra, lo hago</MenuItem>
              <MenuItem value={5}>Siento que soy el mas capacitado o responsable del rumbo del equipo</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{fontSize: '24px' }}>¿Disfrutas convencer o motivar a otros para llegar a un objetivo?</InputLabel>
            <Select name="E2" sx={{ m: 3 }} value={respuestas.E2} onChange={handleChange}>
              <MenuItem value={0}>Soy muy timido/a para eso</MenuItem>
              <MenuItem value={3}>Prefiero que otro tome ese rol, pero no me disgusta</MenuItem>
             <MenuItem value={5}>Me siento muy comodo cuando mis palabras guian al grupo</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{fontSize: '24px' }}>¿Te gusta mantener el orden yi seguir procedimientos establecidos?</InputLabel>
            <Select name="C1" sx={{ m: 3 }} value={respuestas.C1} onChange={handleChange}>
              <MenuItem value={0}>me da igual el orden y pasos a seguir</MenuItem>
              <MenuItem value={3}>me ayudan a orientarme y mejorar</MenuItem>
              <MenuItem value={5}>considero vital un buen plan detallado</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }} className="pregunta">
            <InputLabel sx={{ fontSize: '24px' }}>¿Preferis tareas que impliquen organizacion, planificacion, o manejo de datos?</InputLabel>
            <Select name="C2" sx={{ m: 3 }} value={respuestas.C2} onChange={handleChange}>
              <MenuItem value={0}>odio eso</MenuItem>
              <MenuItem value={3}>Lo hago pero no me genera nada</MenuItem>
              <MenuItem value={5}>Disfruto cuando todo fluye y conecta como corresponde</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button 
            variant="outlined" 
            onClick={onClose}
            sx={{
              backgroundColor: "var(--primaryColor-light)",
              color: "var(--color-texto)",
              "&:hover": { backgroundColor: "var(--primaryColor-lighter)",},
            }}
            > Atras</Button>
            <Button 
              variant="contained" 
              onClick={handleContinue}
              sx={{
                backgroundColor: "var(--primaryColor-white)",
                color: "var(--backgroundColor-default)",
                "&:hover": {
                  backgroundColor: "var(--primaryColor-lighter)",
                  color: "var(--color-texto)",
                },
              }}
              >Continuar</Button>
          </Box>
        </Box>
	 	  </Box>
    </Modal>
  );
}

