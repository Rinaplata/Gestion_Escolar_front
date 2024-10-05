import api from "./index.js";

const getTeachers = async () => {
  try {
    const response = await api.get("teachers/");

    return response.data;
  } catch (error) {
    console.error(
      "Error obtener los profesores",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const postTeachers = async (bodyData) => {
  try {
    const response = await api.post("teachers/", bodyData);

    return response.data;
  } catch (error) {
    console.error(
      "Error al crear el profesor",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const putTeacher = async (bodyData) => {
  try {
    const { id } = bodyData;
    const response = await api.put(`teachers/${id}/`, bodyData);

    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el profesor",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteTeacher = async (id) => {
  try {
    const response = await api.delete(`teachers/${id}/`);

    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el profesor",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};


export { getTeachers, postTeachers, putTeacher, deleteTeacher };
