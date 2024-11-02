import api from "./index.js";

const getSchedule = async () => {
  try {
    const response = await api.get("schedule/");

    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los horarios de las clases: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const postSchedule = async (bodyData) => {
  try {
    const response = await api.post("schedule/", bodyData);
    return response.data;
  } catch (error) {
    console.error(
      "Error al asignarle el horario al estudiante",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const putSchedule = async (bodyData) => {
  try {
    const { id, ...bodyPut } = bodyData;
    const response = await api.put(`schedule/${id}/`, bodyPut);
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el horario del estudiante",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteSchedule = async (id) => {
  try {
    const response = await api.delete(`schedule/${id}/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el horario al estudiante",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { getSchedule, postSchedule, putSchedule, deleteSchedule };
