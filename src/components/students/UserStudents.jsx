import React, { useState, useEffect } from "react";
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
  getStudents,
  postStudents,
  putStudents,
  deleteStudents,
} from "../../services/studenstService";

const UserStudents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    id: "",
    full_name: "",
    date_birth: "",
    gendre: "",
    address: "",
    email: "",
    phone: "",
    school_grade: "",
  });

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error al obtener los estudiantes", error);
      }
    };
    fetchStudents();
  }, []);

  const handleUpdate = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setCurrentStudent(studentToEdit);
    setNewStudent(studentToEdit);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudents(id);
      setStudents(students.filter((student) => student.id !== id));
      console.log(`Eliminar estudiante con ID: ${id}`);
    } catch (error) {
      console.error("Error al eliminar el estudiante", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddOrUpdateStudent = async (e) => {
    e.preventDefault();
    if (
      newStudent.full_name &&
      newStudent.date_birth &&
      newStudent.gendre &&
      newStudent.address &&
      newStudent.email &&
      newStudent.phone &&
      newStudent.school_grade
    ) {
      try {
        if (currentStudent) {
          await putStudents(newStudent);
          setStudents(
            students.map((student) =>
              student.id === currentStudent.id ? newStudent : student
            )
          );
        } else {
          newStudent.id = students?.length + 1;
          const createdStudent = await postStudents(newStudent);
          setStudents([...students, createdStudent]);
        }
        closeModal();
        setNewStudent({
          full_name: "",
          date_birth: "",
          gendre: "",
          address: "",
          email: "",
          phone: "",
          school_grade: "",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error al agregar o actualizar el estudiante", error);
      }
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const columns = [
    { label: "Nombre Completo", accessor: "full_name" },
    { label: "Fecha de Nacimiento", accessor: "date_birth" },
    { label: "Genero", accessor: "gendre" },
    { label: "Dirección", accessor: "address" },
    { label: "Correo Electrónico", accessor: "email" },
    { label: "Número de Teléfono", accessor: "phone" },
    { label: "Grado", accessor: "school_grade" },
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
    doc.text("Gestión de Estudiantes", 20, 10);

    const tableColumn = [
      "ID",
      "Nombre Completo",
      "Correo Electrónico",
      "Fecha de Nacimiento",
      "Género",
      "Dirección",
      "Número de Teléfono",
      "Grado",
    ];
    const tableRows = [];

    students.forEach((student) => {
      const studentData = [
        student.id,
        student.full_name,
        student.email,
        student.date_birth,
        student.gendre,
        student.address,
        student.phone,
        student.school_grade,
      ];
      tableRows.push(studentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("estudiantes.pdf");
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
          <span>Agregar Estudiante</span>
        </button>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentStudent ? "Actualizar Estudiante" : "Agregar Estudiante"}
      >
        <form onSubmit={handleAddOrUpdateStudent} className="space-y-4 m-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              name="full_name"
              value={newStudent.full_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              placeholder="Ingresa el nombre completo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="date_birth"
              value={newStudent.date_birth}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  p-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              name="gendre"
              value={newStudent.gendre}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  p-1"
            >
              <option value="">Selecciona el género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={newStudent.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  p-1"
              placeholder="Ingresa la dirección"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  p-1"
              placeholder="Ingresa el teléfono"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  p-1"
              placeholder="Ingresa el correo electrónico"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grado Escolar
            </label>
            <input
              type="text"
              name="school_grade"
              value={newStudent.school_grade}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  p-1"
              placeholder="Ingresa el grado escolar"
              required
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              {currentStudent ? "Actualizar Estudiante" : "Agregar Estudiante"}
            </button>
          </div>
        </form>
      </ReusableModal>

      <ReusableTable
        title="Gestión de estudiantes"
        columns={columns}
        data={students}
      />
    </div>
  );
};

export default UserStudents;
