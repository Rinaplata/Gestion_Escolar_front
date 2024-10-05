import api from './index.js';

const postCalificacion = async (cuerpo) => {
  try {
    const response = await api.post('grades/', cuerpo);

    return response.data; 
  } catch (error) {
    console.error('Error no hay calificaciones', error.response ? error.response.data : error.message);
    throw error;
  }
};


const getCalificacion = async () =>{
    try {
        const response = await api.get('grades/');
    
        return response.data; 
      } catch (error) {
        console.error('No hay calificaciones registradas', error.response ? error.response.data : error.message);
        throw error;
      }
}

const updateCalificacion = async (cuerpo) => {
    try {
        const {id, ...body} = cuerpo 
        const response = await api.put(`grades/${id}/`, body);
  
        return response.data; 
    } catch (error) {
      console.error('Error no hay calificaciones', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  const deleteCalificacion = async (id) => {
    try {
       
        const response = await api.delete(`grades/${id}/`);
  
        return response.data; 
    } catch (error) {
      console.error('Error no hay calificaciones', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export  {postCalificacion, getCalificacion, updateCalificacion, deleteCalificacion};
