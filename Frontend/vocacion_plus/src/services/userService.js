import axios from "axios";

const url = 'http://localhost:5073/usuario';
 
export const registerUser = async (data) => {
    const response = await axios.post(`${url}/register`,data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await axios.post(
        `${url}/iniciar-sesion`,
        data,
        {
            headers: { "Content-Type": "application/json" }
        }
    );
    const token = response.data.token || response.data.token;
    if (token) {
        localStorage.setItem("token", token);
    }
    return response.data;
}; 

export const buscarUsuarios = async (nombre, page = 1, pageSize = 10) => {
    const token = localStorage.getItem("token");
    const params = { page, pageSize };
    if (nombre) params.nombre = nombre;
    try {
        console.log("ok arranco busqueda con :", {nombre, page, pageSize }) 
        const response = await axios.get(`${url}/buscar`, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("ok supuestamente llega esto del back :" , response.data)
        return response.data; 
    } catch (error) {
        console.error('error buscando usuarios:', error.response || error);
        throw error;
    }
}

export const banearUsuario = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(`${url}/${id}/banear`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log("ay a ay, juanceto01 , te fuiste baneado :", id);
        return response;
    } catch (error) {
        console.error("error baneando :( ", error.response || error);
        throw error;
    }
};

export const activarUsuario = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${url}/${id}/activar`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  } catch (error) {
    console.error("Error activando usuario:", error);
    throw error;
  }
};

