import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ReusableTable from "../ReusableTable";
import ReusableModal from "../ReusableModal";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import {
  deleteCourses,
  getCourses,
  postCourses,
  putCourses,
} from "../../services/coursesService";
import { getOneTeacher } from "../../services/teacherService";

const CourseManagement = () => {
  const [cursos, setCursos] = useState(null);
  const [profesores, setProfesores] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getCursosYTeachers = async () => {
      const responseCursos = await getCourses();
      const responseProfesores = await getOneTeacher();
      setProfesores(responseProfesores);
      const dataCursos = responseCursos.map((cursos) => {
        const profesorDatos = responseProfesores.find(
          (profesor) => profesor.id === cursos.teacher_id
        );
        return {
          ...cursos,
          teacher_id: profesorDatos
            ? profesorDatos.full_name
            : cursos.teacher_id,
        };
      });
      setCursos(dataCursos);
      setLoading(false);
    };

    getCursosYTeachers();
  }, []);

  const crearCurso = async (body) => {
    const returnCreateCurso = await postCourses(body);
    if (returnCreateCurso.course_name == body.course_name) {
      return true;
    }
    return false;
  };

  const actualizarCurso = async (body) => {
    const returnActualizarCurso = await putCourses(body);
    if (returnActualizarCurso.course_name == body.course_name) {
      return true;
    }
    return false;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourses, setCurrentCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    description: "",
    teacher_id: "",
    schedule: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddOrUpdateAssignment = (e) => {
    e.preventDefault();
    if (
      newCourse.course_name &&
      newCourse.description &&
      newCourse.teacher_id &&
      newCourse.schedule
    ) {
      if (currentCourses) {
        setCursos(
          cursos.map((assignment) => {
            if (assignment.id === currentCourses.id) {
              actualizarCurso(newCourse);
              // console.log(newCourse);
              return newCourse;
            }
            return assignment;
          })
        );
      } else {
        crearCurso(newCourse);
        setCursos([...cursos, { ...newCourse, id: cursos.length + 1 }]);
      }
      closeModal();
      setNewCourse({
        course_name: "",
        description: "",
        teacher_id: "",
        schedule: "",
      });
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const handleUpdate = (id) => {
    const assignmentToEdit = cursos.find((assignment) => assignment.id === id);
    setCurrentCourse(assignmentToEdit);
    setNewCourse(assignmentToEdit);
    openModal();
  };

  const handleDelete = (id) => {
    const cursoEliminado = cursos.filter((assignment) => assignment.id !== id);
    if (cursoEliminado.length !== cursos.length) {
      deleteCourses(id);
      setCursos(cursoEliminado);
    }

    console.log(`Eliminar asignación con ID: ${id}`);
  };

  const columns = [
    { label: "Curso ID", accessor: "id" },
    { label: "Nombre del Curso", accessor: "course_name" },
    { label: "Descripcion", accessor: "description" },
    { label: "Profesor Asignado", accessor: "teacher_id" },
    { label: "Horario Curso", accessor: "schedule" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleUpdate(row.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Horario y asignación de cursos", 20, 10);

    const tableColumn = [
      "Curso ID",
      "Nombre del Curso",
      "Descripcion",
      "Profesor Asignado",
      "Horario Curso",
    ];
    const tableRows = [];

    cursos.forEach((assignment) => {
      const assignmentData = [
        assignment.id,
        assignment.course_name,
        assignment.description,
        assignment.teacher_id,
        assignment.schedule,
      ];
      tableRows.push(assignmentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("calificaciones.pdf");
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
        >
          <span>Descargar PDF</span>
        </button>

        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-500"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>Crear Curso</span>
        </button>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentCourses ? "Actualizar Asignación" : "Asignar Curso"}
      >
        <form onSubmit={handleAddOrUpdateAssignment} className="space-y-4 m-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Curso
            </label>
            <input
              type="text"
              name="course_name"
              value={newCourse.course_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripcion
            </label>
            <input
              type="text"
              name="description"
              value={newCourse.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profesor Asignado
            </label>
            <select
              name="teacher_id"
              value={newCourse.teacher_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            >
              <option value="">Selecciona un profesor</option>
              {profesores
                ? profesores.map((profesor) => (
                    <option value={profesor.id} key={profesor.full_name}>
                      {profesor.full_name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Horario del Curso
            </label>
            <input
              type="text"
              name="schedule"
              value={newCourse.schedule}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              {currentCourses ? "Actualizar Curso" : "Crear Curso"}
            </button>
          </div>
        </form>
      </ReusableModal>
      {!isLoading ? (
        <ReusableTable
          title="Asignaciones de Cursos"
          columns={columns}
          data={cursos}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseManagement;
