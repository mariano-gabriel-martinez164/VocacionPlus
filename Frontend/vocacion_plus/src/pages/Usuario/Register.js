import React, { useState } from "react";
import RegisterForm from "../../Components/FormRegister/form";
import TestVocacionalModal from "../../Components/ModalTest/TestVocacionalModal";
import { registerUser } from "../../services/userService";
import "./Register.css"; 

export default function Register() {
  const [showTest, setShowTest] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleRegister = async (data) => {
        try {
            setUserData(data);
            setShowTest(true);
        } catch (error) {
          console.error("error en : ", error);
          alert(error.response?.data?.messasge || error.message || "error al conectar")
        }
    };
    
    const handleTestSubmit = async (testData) => {
      try {
            const payload = {
                  ...userData,
                  esAdmin: false,
                  test: testData,
            };
            await registerUser(payload);
            alert("Usuario registrado con exito");
            setShowTest(false);
            console.log("datos a enviar al backend:", payload) 
            } catch (error) {
              console.error("error en: ", error);
              alert(error.response?.data?.message || error.message || "Error al conectar con el servidor");
            }
    };
    return (
        <div className="register-page">
            <RegisterForm onSubmit={handleRegister} />
            {showTest && <TestVocacionalModal onSubmit={handleTestSubmit} onClose={() => setShowTest(false)} />}
        </div>
    )
}

