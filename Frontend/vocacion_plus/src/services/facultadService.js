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