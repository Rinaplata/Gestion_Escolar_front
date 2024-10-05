import api from "./index.js";

const getCourses = async () => {
  try {
    const response = await api.get("courses/");

    return response.data;
  } catch (error) {
    console.error(
      "Error obtener los cursos",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const postCourses = async (bodyData) => {
  try {
    const response = await api.post("courses/", bodyData);

    return response.data;
  } catch (error) {
    console.error(
      "Error al crear el curso",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const putCourses = async (bodyData) => {
  try {
    const { id, ...bodyPut } = bodyData;
    const response = await api.put(`courses/${id}/`, bodyPut);

    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el curso",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteCourses = async (id) => {
  try {
    const response = await api.delete(`courses/${id}/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el curso",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { getCourses, postCourses, putCourses, deleteCourses };
