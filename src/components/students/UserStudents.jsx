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
    name: "",
    email: "",
    role: "",
  });
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", role: "Profesor" },
    { id: 2, name: "María García", email: "maria.garcia@example.com", role: "Estudiante" },
  ]);

  const handleUpdate = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setCurrentStudent(userToEdit); 
    setNewStudent(userToEdit);
    openModal();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
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
    if (newStudent.id && newStudent.name && newStudent.email && newStudent.role) {
      if (currentStudent) {
        setUsers(users.map((user) => (user.id === currentStudent.id ? newStudent : user)));
      } else {
        setUsers([...users, { ...newStudent, id: users.length + 1 }]);
      }
      closeModal();
      setNewStudent({ id: "", name: "", email: "", role: "" });
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Nombre", accessor: "name" },
    { label: "Correo Electrónico", accessor: "email" },
    { label: "Rol", accessor: "role" },
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
    doc.text("Gestión de Usuarios", 20, 10); 

    const tableColumn = ["ID", "Nombre", "Correo Electrónico", "Rol"];
    const tableRows = [];

    users.forEach((user) => {
      const userData = [user.id, user.name, user.email, user.role];
      tableRows.push(userData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("usuarios.pdf");
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
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              value={newStudent.id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa el ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa el nombre"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
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
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <input
              type="text"
              name="role"
              value={newStudent.role}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ingresa el rol"
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
      <ReusableTable title="Gestión de Usuarios" columns={columns} data={users} />
    </div>
  );
};

export default UserStudents;
