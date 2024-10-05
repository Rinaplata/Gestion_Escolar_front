import api from "./index.js";

const getStudents = async () => {
    try {
      const response = await api.get("students/");
      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener los estudiantes",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  
  
  const postStudents = async (bodyData) => {
    try {
      const response = await api.post("students/", bodyData);
      return response.data;
    } catch (error) {
      console.error(
        "Error al crear el estudiante",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  

  const putStudents = async (bodyData) => {
    try {
      const { id, ...bodyPut } = bodyData;
      const response = await api.put(`students/${id}/`, bodyData);
      return response.data;
    } catch (error) {
      console.error(
        "Error al actualizar el estudiante",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  
  const deleteStudents = async (id) => {
    try {
      const response = await api.delete(`students/${id}/`);
      return response.data;
    } catch (error) {
      console.error(
        "Error al eliminar el estudiante",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  
  export { getStudents, postStudents, putStudents, deleteStudents };
  