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

const UserStudents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    id: "",
    fullName: "",
    birthDate: "",
    gender: "",
    address: "",
    email: "",
    phone: "",
    grade: "",
  });

  const [stdudents, setUsersStdudents] = useState([
    {
      fullName: "Juan Pérez",
      birthDate: "1990-05-20",
      gender: "Masculino",
      address: "Calle 123, Ciudad",
      email: "juan.perez@example.com",
      phone: "1234567890",
      grade: "Prof",
    },
    {
      fullName: "María García",
      birthDate: "2005-08-15",
      gender: "Femenino",
      address: "Carrera 45, Ciudad",
      email: "maria.garcia@example.com",
      phone: "0987654321",
      grade: "profesional",
    },
  ]);

  const handleUpdate = (id) => {
    const userToEdit = stdudents.find((user) => user.id === id);
    setCurrentStudent(userToEdit);
    setNewStudent(userToEdit);
    openModal();
  };

  const handleDelete = (id) => {
    setUsersStdudents(stdudents.filter((user) => user.id !== id));
    console.log(`Eliminar usuario con ID: ${id}`);
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

  const handleAddOrUpdateStudent = (e) => {
    e.preventDefault();
    if (
      newStudent.fullName &&
      newStudent.birthDate &&
      newStudent.gender &&
      newStudent.address &&
      newStudent.email &&
      newStudent.phone &&
      newStudent.grade
    ) {
      if (currentStudent) {
        setUsersStdudents(
          stdudents.map((user) =>
            user.id === currentStudent.id ? newStudent : user
          )
        );
      } else {
        setUsersStdudents([...stdudents, { ...newStudent, id: stdudents.length + 1 }]);
      }
      closeModal();
      setNewStudent({
        fullName: "",
        birthDate: "",
        gender: "",
        address: "",
        email: "",
        phone: "",
        grade: ""
      });
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const columns = [
    { label: "Nombre Completo", accessor: "fullName" },
    { label: "Fecha de Nacimiento", accessor: "birthDate" },
    { label: "Genero", accessor: "gender" },
    { label: "Dirección", accessor: "address" },
    { label: "Correo Electrónico", accessor: "email" },
    { label: "Número de Teléfono", accessor: "phone" },
    { label: "Grado", accessor: "grade" },
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

    // Definir las columnas para la tabla del PDF
    const tableColumn = [
        "ID", 
        "Nombre Completo", 
        "Correo Electrónico", 
        "Fecha de Nacimiento", 
        "Género", 
        "Dirección", 
        "Número de Teléfono", 
        "Grado"
    ];
    const tableRows = [];

    // Recorrer los usuarios y preparar los datos para la tabla
    stdudents.forEach((stdudents) => {
        const userData = [
          stdudents.id, 
          stdudents.fullName, 
          stdudents.email, 
          stdudents.birthDate, 
          stdudents.gender, 
          stdudents.address, 
          stdudents.phone, 
          stdudents.grade
        ];
        tableRows.push(userData);
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
        <form onSubmit={handleAddOrUpdateStudent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              name="fullName"
              value={newStudent.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              name="birthDate"
              value={newStudent.birthDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa la fecha de nacimiento"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <input
              type="text"
              name="gender"
              value={newStudent.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa el género"
              required
            />
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa la dirección"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa el correo electrónico"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa el número de teléfono"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grado
            </label>
            <input
              type="text"
              name="grade"
              value={newStudent.grade}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa el grado"
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
        data={stdudents}
      />
    </div>
  );
};

export default UserStudents;
