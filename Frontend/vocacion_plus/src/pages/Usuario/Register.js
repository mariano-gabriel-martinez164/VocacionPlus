import RegisterForm from "../../Components/FormRegister/form";
import { registerUser } from "../../services/userService";
import "./Register.css"; 

export default function Register() {
    const handleRegister = async (data) => {
        try {
            const payload = {
                nombre: data.nombre,
                apellido: data.apellido,
                correo: data.correo,
                password: data.password,
                esAdmin: false,
                test: {
                    Realista: 0,
                    Investigador: 0,
                    Artistico: 0,
                    Social: 0,
                    Emprendedor: 0,
                    Convencional: 0
                }
            }
            const result = await registerUser(payload);
            alert("Usuario registrado con exito");
            console.log("datos a enviar al backend:", data) 
        } catch (error) {
            console.error("error en: ", error);
            alert(error.response?.data?.message || error.message || "Error al conectar con el servidor");
        }
    };
    return (
        <div className="register-page">
            <RegisterForm onSubmit={handleRegister} />
        </div>
    )
}

