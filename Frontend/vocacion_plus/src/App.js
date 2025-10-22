import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Importá tus componentes (pantallas)
import Facultad from "./Components/Facultad/Facultad";
import Carreras from "./Components/Carreras/Carreras";
import DetalleCarrera from "./Components/Carreras/DetalleCarrera";
import Usuario from "./pages/Usuario/Usuario";
import Login from "./pages/Usuario/Login";
import Register from "./pages/Usuario/Register";
import Bar from "./Components/Bar/Bar";
import { Box } from "@mui/system";
import Footer from "./Components/Footer/Footer";
import Contacto from "./Components/Footer/Contactos";
import PoliticaPrivacidad from "./Components/Footer/PoliticaPrivacidad";
import Terminos from "./Components/Footer/Terminos";
import VerFacultad from './Components/Facultad/VerFacultad';
import AltaCarrera from "./Components/Carreras/AltaCarrera"

function App() {
  return (
    <Router>
      <Box sx={{
        minHeight: "100vh",
        display: 'flex',
        flexDirection: "column",
        bgcolor: 'var(--gray-light)',
      }}>
        <Bar />
        <Box sx={{ flexGrow: 1, alignItems: 'start' }}>
          <Routes>
            <Route path="/" element={<Facultad />} />
            <Route path="/facultad/:facultadId" element={<VerFacultad />} />
            <Route path="/carrera" element={<Carreras />} />
            <Route path="/carrera/:nombre" element={<DetalleCarrera />} />
            <Route path="/carrera/alta-carrera" element={<AltaCarrera />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos" element={<Terminos />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
