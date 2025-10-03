import axios from "axios";

export const registerUser = async (data) => {
    const response = await axios.post("http://localhost:5073/Usuario/register",data);
    return response.data;
};