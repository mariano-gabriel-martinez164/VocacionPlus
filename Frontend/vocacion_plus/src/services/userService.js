import axios from "axios";

export const registerUser = async (data) => {
    const response = await axios.post("http://localhost:5073/Usuario/register",data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await axios.post(
        "http://localhost:5073/Usuario/iniciar-sesion",
        data,
        {
            headers: { "Content-Type": "application/json" }
        }
    );
    return response.data;
}; 