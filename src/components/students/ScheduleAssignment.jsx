import { useState, useEffect } from "react";
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
  deleteSchedule,
  getSchedule,
  postSchedule,
  putSchedule,
} from "../../services/schedule";
import { getStudents } from "../../services/studenstService";
import { getCourses } from "../../services/coursesService";

const ScheduleAssignment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    id: "",
    student_id: "",
    student_name: "",
    course_id: "",
    course_name: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const scheduleData = await getSchedule();
        const studentsData = await getStudents();
        const coursesData = await getCourses();

        const mappedAssignments = scheduleData.map((schedule) => {
          const student = studentsData.find(
            (student) => student.id === schedule.student_id
          );
          const course = coursesData.find(
            (course) => course.id === schedule.course_id
          );

          return {
            id: schedule ? schedule.id : "",
            student_id: schedule ? schedule.student_id : "",
            student_name: student ? student.full_name : "",
            course_id: schedule ? schedule.course_id : "",
            course_name: course ? course.course_name : "",
            start_date: course ? course.start_date : "",
            end_date: course ? course.end_date : "",
            start_time: course ? course.start_time : "",
            end_time: course ? course.end_time : "",
          };
        });

        setAssignments(mappedAssignments);
        setStudents(studentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error al obtener los estudiantes", error);
      }
    };
    fetchStudents();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAssignment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleAddOrUpdateAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.student_id && newAssignment.course_id) {
      if (currentAssignment) {
        await putSchedule(newAssignment);
        setAssignments(
          assignments.map((assignment) =>
            assignment.id === currentAssignment.id ? newAssignment : assignment
          )
        );
      } else {
        newAssignment.id = assignments?.length + 1;
        const createSchedule = await postSchedule({
          student_id: newAssignment.student_id,
          course_id: newAssignment.course_id,
        });
        setAssignments([
          ...assignments,
          { ...createSchedule, id: assignments.length + 1 },
        ]);
      }
      closeModal();
      setNewAssignment({
        id: "",
        student_id: "",
        course_id: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
      });
      window.location.reload();
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const handleUpdate = (id) => {
    const assignmentToEdit = assignments.find(
      (assignment) => assignment.id === id
    );
    setCurrentAssignment(assignmentToEdit);
    setNewAssignment(assignmentToEdit);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchedule(id);
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
      console.log(`Eliminar asignación con ID: ${id}`);
    } catch (error) {
      console.log("Error al eliminar la asignación", error);
    }
  };

  const columns = [
    { label: "Estudiante", accessor: "student_name" },
    { label: "Curso", accessor: "course_name" },
    { label: "Fecha Inicio", accessor: "start_date" },
    { label: "Fecha Fin", accessor: "end_date" },
    { label: "Hora Inicio", accessor: "start_time" },
    { label: "Hora Fin", accessor: "end_time" },
    {
      label: "Acciones",
      accessor: "acciones",
      render: (row) => (
        <div className="flex items-center justify-center space-x-2">
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
    doc.text("Asignación de cursos", 20, 10);

    const tableColumn = [
      "Estudiante",
      "Curso",
      "Fecha Inicio",
      "Fecha Fin",
      "Hora Inicio",
      "Hora Fin",
    ];
    const tableRows = [];

    assignments.forEach((assignment) => {
      const assignmentData = [
        assignment.student_name,
        assignment.course_name,
        assignment.start_date,
        assignment.end_date,
        assignment.start_time,
        assignment.end_time,
      ];
      tableRows.push(assignmentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("asignacion_cursos_estudiantes.pdf");
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
          <span>Asignar Curso</span>
        </button>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentAssignment ? "Actualizar Asignación" : "Asignar Curso"}
      >
        <form onSubmit={handleAddOrUpdateAssignment} className="space-y-4 m-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estudiante
            </label>
            <select
              name="student_id"
              value={newAssignment.student_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            >
              <option value="">Selecciona un estudiante</option>
              {students
                ? students.map((student) => (
                    <option value={student.id} key={student.full_name}>
                      {student.full_name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Curso
            </label>
            <select
              name="course_id"
              value={newAssignment.course_id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            >
              <option value="">Selecciona un curso</option>
              {courses
                ? courses.map((course) => (
                    <option value={course.id} key={course.course_name}>
                      {course.course_name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              {currentAssignment ? "Actualizar Asignación" : "Asignar Curso"}
            </button>
          </div>
        </form>
      </ReusableModal>

      <ReusableTable
        title="Asignaciones de Cursos"
        columns={columns}
        data={assignments}
      />
    </div>
  );
};

export default ScheduleAssignment;
