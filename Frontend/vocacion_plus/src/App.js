import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importá tus componentes (pantallas)
import Facultad from "./Components/Facultad/Facultad";
import Carreras from "./Components/Carreras/Carreras";
import Usuario from "./pages/Usuario/Usuario";
import Login from "./pages/Usuario/Login";
import Register from "./pages/Usuario/Register";
import Bar from "./Components/Bar/Bar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/facultad" element={<Facultad />} />
        <Route path="/carreras" element={<Carreras />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
