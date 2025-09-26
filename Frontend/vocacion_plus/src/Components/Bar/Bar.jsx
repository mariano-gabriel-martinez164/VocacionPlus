import React from "react";
import { Link } from "react-router-dom";
import "./Bar.css";
import menu from "../images/menu.png";
import user from "../images/user.png";

const Bar = () => {
  return (
// Bar.js (fragmento relevante)
<div className="bar">
  <div className="menu">
    <img className="menu1" src={menu} alt="Menu" />

    {/* Sidebar oculto que se abre al hover sobre la imagen */}
    <div className="sidebar">
      <ul>
        <li><a href="/facultad">Facultad</a></li>
        <li><a href="/carreras">Carreras</a></li>
        <li><a href="/usuario">Usuario</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </div>
  </div>

  <h1 className="nombre">Vocación+</h1>

  <div className="user">
    <img className="user1" src={user} alt="user" />
  </div>
</div>

  );
};

export default Bar;
