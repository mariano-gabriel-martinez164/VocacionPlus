import axios from 'axios';

const url = 'http://localhost:5073/facultad';

export const getFacultades = async (page, pageSize = 9) => {
    try {
        const response = await axios.get(url, {
            params: { page, pageSize},
        });
        return {
            facultades: response.data.data,
            totalItems: response.data.TotalItems,
            totalPages: response.data.TotalPages,
            currentPage: response.data.currentPage,
        };
    } catch (error) {
        console.error('error en facultades get: ', error);
        throw error;
    }
};

export const getCarrerasEnFacultadCard = async (facultadId, page = 1, pageSize= 3) => {
try {
    const response = await axios.get(`http://localhost:5073/carrera/facultad/${facultadId}?pageNumber=${page}`);
    console.log(`Facultad ${facultadId} - response.data:`, response.data);
    const carreras = response.data?.data || [];
    console.log(`Facultad ${facultadId} - carreras extraídas:`, carreras);
    return carreras.slice(0, pageSize);
} catch (error) {
    console.error(`Error al traer carreras de facultad ${facultadId}:`, error);
    return [];
    }
};

export const eliminarFacultad = async (facultadId) => {
    try {
        const token = localStorage.getItem("token"); 
        console.log("token q ", token);
        console.log("id que recibi es : ", facultadId);
        console.log("mi url es :",`${url}/${facultadId}/`);
    const response = await axios.delete(`${url}/${facultadId}/`, {
        headers: { Authorization: `Bearer ${token}`}
    });
    console.log("Respuesta del servidor:", response);
    return response.data;
    } catch(error) {
        if (error.response) {
        // El servidor respondió con un estado fuera de 2xx
        console.error("Error con respuesta del servidor:", error.response.status, error.response.data);
        } else if (error.request) {
        // La solicitud se hizo pero no hubo respuesta
        console.error("Error en la solicitud, no hubo respuesta:", error.request);
        } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
        }
    throw error; // opcional, si quieres que el componente maneje el error
    }
};