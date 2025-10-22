import axios from 'axios';

const url = 'http://localhost:5073/valoracion';

export const getValoracionesAutor = async (autorId, page = 1, pageSize = 5) =>{
    try {
        const response = await axios.get(`${url}/autor/${autorId}`,{
            params: {page, pageSize}
        });
        return response.data;
    } catch (error) {
        console.error('error al obtener las valoraciones del autor:', error.response?.data || error.message);
        throw new Error('no se puedieron obtener las valoraciones del autor.');
    }
};