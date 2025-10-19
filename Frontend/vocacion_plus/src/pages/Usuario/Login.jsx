import React from "react";
import LoginForm from "../../Components/FormLogin/LoginForm"; 
import { loginUser } from "../../services/userService";  
import { useNavigate } from "react-router-dom";    
import "./Register.css"; 

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
        const result = await loginUser(data); 
        console.log("Datos enviados al backend:", data);
        navigate("/");
        } catch (error) {
        console.error("Error en login:", error);
        alert(error.response?.data?.message || error.message || "Error al conectar con el servidor");
        }
    };

    return (
        <div className="login-page">
        <LoginForm onSubmit={handleLogin} />
        </div>
    );
}
