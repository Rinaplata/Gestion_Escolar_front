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

const GradesStudents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [newGrade, setNewGrade] = useState({
    id: "",
    studentId: "",
    courseId: "",
    grade: "",
    evaluationDate: "",
  });

  const [grades, setGrades] = useState([
    {
      id: 1,
      studentId: "101",
      courseId: "202",
      grade: "85",
      evaluationDate: "2024-09-15",
    },
    {
      id: 2,
      studentId: "102",
      courseId: "203",
      grade: "90",
      evaluationDate: "2024-09-20",
    },
  ]);


  const handleUpdate = (id) => {
    const gradeToEdit = grades.find((grade) => grade.id === id);
    setCurrentGrade(gradeToEdit);
    setNewGrade(gradeToEdit);
    openModal();
  };

  const handleDelete = (id) => {
    setGrades(grades.filter((grade) => grade.id !== id));
    console.log(`Eliminar calificación con ID: ${id}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentGrade(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGrade({ ...newGrade, [name]: value });
  };

  const handleAddOrUpdateGrade = (e) => {
    e.preventDefault();
    if (
      newGrade.studentId &&
      newGrade.courseId &&
      newGrade.grade &&
      newGrade.evaluationDate
    ) {
      if (currentGrade) {
        setGrades(
          grades.map((grade) =>
            grade.id === currentGrade.id ? newGrade : grade
          )
        );
      } else {
        setGrades([...grades, { ...newGrade, id: grades.length + 1 }]);
      }
      closeModal();
      setNewGrade({
        id: "",
        studentId: "",
        courseId: "",
        grade: "",
        evaluationDate: "",
      });
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const columns = [
    { label: "Estudiante ID", accessor: "studentId" },
    { label: "Curso ID", accessor: "courseId" },
    { label: "Calificación", accessor: "grade" },
    { label: "Fecha de Evaluación", accessor: "evaluationDate" },
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
    doc.text("Calificaciones", 20, 10);

    const tableColumn = [
      "ID",
      "Estudiante ID",
      "Curso ID",
      "Calificación",
      "Fecha de Evaluación",
    ];
    const tableRows = [];

    grades.forEach((grade) => {
      const gradeData = [
        grade.id,
        grade.studentId,
        grade.courseId,
        grade.grade,
        grade.evaluationDate,
      ];
      tableRows.push(gradeData);
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
          <span>Agregar Calificación</span>
        </button>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          currentGrade ? "Actualizar Calificación" : "Agregar Calificación"
        }
      >
        <form onSubmit={handleAddOrUpdateGrade} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estudiante ID
            </label>
            <input
              type="text"
              name="studentId"
              value={newGrade.studentId}
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
              value={newGrade.courseId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calificación
            </label>
            <input
              type="number"
              name="grade"
              value={newGrade.grade}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Evaluación
            </label>
            <input
              type="date"
              name="evaluationDate"
              value={newGrade.evaluationDate}
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
              {currentGrade
                ? "Actualizar Calificación"
                : "Agregar Calificación"}
            </button>
          </div>
        </form>
      </ReusableModal>

      <ReusableTable
        title="Calificaciones"
        columns={columns}
        data={grades}
      />
    </div>
  );
};

export default GradesStudents;
