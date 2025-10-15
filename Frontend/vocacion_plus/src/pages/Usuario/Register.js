import RegisterForm from "../../Components/FormRegister/InputField";
import { registerUser } from "../../services/userService";

export default function Register() {
    const handleRegister = async (data) => {
        try {
            const result = await registerUser(data);
            alert("Usuario registrado con exito");
            console.log("datos a enviar al backend:", data) 
        } catch (error) {
            console.error("error en: ", error);
            alert(error.response?.data?.message || error.message || "Error al conectar con el servidor");
        }
    };
    return (
        <div style={{display:'flex', justifyContent: 'center', marginTop: 50}}>
            <RegisterForm onSubmit={handleRegister} />
        </div>
    )
}

