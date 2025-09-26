// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importá tus componentes (pantallas)
import Facultad from "./Components/VerFacultad/Facultad";
import Carreras from "./Components/Carreras/Carreras";
import Usuario from "./Components/Usuario/Usuario";
import Login from "./Components/Usuario/Login";
import Register from "./Components/Usuario/Registro";
import Bar from "./Components/Bar/Bar";
function App() {
  return (
    <Router>
      <Bar/>
      <Routes>
        <Route path="/facultad" element={<Facultad />} />
        <Route path="/carreras" element={<Carreras />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
