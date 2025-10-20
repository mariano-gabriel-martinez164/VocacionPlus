import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Importá tus componentes (pantallas)
import FacultadList from "./Components/Facultad/Facultad";
import Carreras from "./Components/Carreras/Carreras";
import verCarrera from "./Components/Carreras/Carreras";
import Login from "./pages/Usuario/Login";
import Register from "./pages/Usuario/Register";
import Bar from "./Components/Bar/Bar";
import Footer from "./Components/Footer/Footer";
import Contacto from "./Components/Footer/Contactos";
import PoliticaPrivacidad from "./Components/Footer/PoliticaPrivacidad"
import Terminos from "./Components/Footer/Terminos"
import { Box } from "@mui/system"
import AltaFacultad from "./Components/Facultad/AltaFacultad";
import EditarFacultad from "./Components/Facultad/ModificarFacultad";
import VerFacultad from "./Components/Facultad/VerFacultad";

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
        <Box sx= {{ flexGrow: 1, alignItems: 'start' }}>
          <Routes>
            <Route path="/" element={<FacultadList />} />
            <Route path="/alta-facultad" element={<AltaFacultad />} />
            <Route path="/editar-facultad/:id" element={<EditarFacultad />} />
            <Route path="/facultad/:id" element={<VerFacultad />} />
            <Route path="/carrera" element={<Carreras />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacto" element={Contacto} />
            <Route path="/privacidad" element={PoliticaPrivacidad} />
            <Route path="/terminos" element={Terminos} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
