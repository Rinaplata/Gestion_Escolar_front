import React, { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ReusableTable from "../ReusableTable";
import ReusableModal from "../ReusableModal";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ScheduleAssignment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    id: "",
    studentId: "",
    courseId: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAssignment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleAddOrUpdateAssignment = (e) => {
    e.preventDefault();
    if (
      newAssignment.studentId &&
      newAssignment.courseId &&
      newAssignment.day &&
      newAssignment.startTime &&
      newAssignment.endTime
    ) {
      if (currentAssignment) {
        setAssignments(
          assignments.map((assignment) =>
            assignment.id === currentAssignment.id ? newAssignment : assignment
          )
        );
      } else {
        setAssignments([
          ...assignments,
          { ...newAssignment, id: assignments.length + 1 },
        ]);
      }
      closeModal();
      setNewAssignment({
        id: "",
        studentId: "",
        courseId: "",
        day: "",
        startTime: "",
        endTime: "",
      });
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

  const handleDelete = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    console.log(`Eliminar asignación con ID: ${id}`);
  };

  const columns = [
    { label: "Estudiante ID", accessor: "studentId" },
    { label: "Curso ID", accessor: "courseId" },
    { label: "Día", accessor: "day" },
    { label: "Hora de Inicio", accessor: "startTime" },
    { label: "Hora de Finalización", accessor: "endTime" },
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
      "id",
      "studentId",
      "courseId",
      "day",
      "startTime",
      "endTime",
    ];
    const tableRows = [];

    assignments.forEach((assignment) => {
      const assignmentData = [
        assignment.id,
        assignment.studentId,
        assignment.courseId,
        assignment.grade,
        assignment.evaluationDate,
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
          <span>Asignar Curso</span>
        </button>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentAssignment ? "Actualizar Asignación" : "Asignar Curso"}
      >
        <form onSubmit={handleAddOrUpdateAssignment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estudiante ID
            </label>
            <input
              type="text"
              name="studentId"
              value={newAssignment.studentId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Curso ID
            </label>
            <input
              type="text"
              name="courseId"
              value={newAssignment.courseId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Día
            </label>
            <select
              name="day"
              value={newAssignment.day}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Selecciona un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hora de Inicio
            </label>
            <input
              type="time"
              name="startTime"
              value={newAssignment.startTime}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hora de Finalización
            </label>
            <input
              type="time"
              name="endTime"
              value={newAssignment.endTime}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
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
