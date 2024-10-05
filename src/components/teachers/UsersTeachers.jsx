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
import { getTeachers, postTeachers, putTeacher, deleteTeacher } from "../../services/teacherService";

const UsersTeachers = () => {
  const [profesores, setProfesores] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProfesores = async () => {
      const responseProfesores = await getTeachers();
      setProfesores(responseProfesores);
      setLoading(false);
    };
   
    getProfesores();
  }, []);

  const crearProfesores = async (body) => {
    const returnCreateCurso = await postTeachers(body);
    if (returnCreateCurso.course_name == body.course_name) {
      return true;
    }
    return false;
  };

  const actualizarProfesor = async (body) => {
    const returnActualizarProfesor = await putTeacher(body);
    if (returnActualizarProfesor.course_name == body.course_name) {
      return true;
    }
    return false;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProfesores, setCurrentCourse] = useState(null);
  const [newProfesor, setNewProfesor] = useState({
    id: "",
    full_name: "",
    date_birth: "",
    gendre: "",
    address: "",
    phone: "",
    email: "",
    department: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfesor({ ...newProfesor, [name]: value });
  };

  const handleAddOrUpdateAssignment = (e) => {
    e.preventDefault();
    if (
      newProfesor.id &&
      newProfesor.full_name &&
      newProfesor.date_birth &&
      newProfesor.gendre &&
      newProfesor.address &&
      newProfesor.phone &&
      newProfesor.email &&
      newProfesor.department
    ) {
      if (currentProfesores) {
        setProfesores(
          profesores.map((assignment) => {
            if (assignment.id === currentProfesores.id) {
              actualizarProfesor(newProfesor);
              // console.log(newProfesor);
              return newProfesor;
            }
            return assignment;
          })
        );
      } else {
        crearProfesores(newProfesor);
        setProfesores([...profesores, { ...newProfesor, id: profesores.length + 1 }]);
      }
      closeModal();
      setNewProfesor({
        id: "",
        full_name: "",
        date_birth: "",
        gendre: "",
        address: "",
        phone: "",
        email: "",
        department: "",
      });
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const handleUpdate = (id) => {
    const assignmentToEdit = profesores.find((assignment) => assignment.id === id);
    setCurrentCourse(assignmentToEdit);
    setNewProfesor(assignmentToEdit);
    openModal();
  };

  const handleDelete = (id) => {
    const cursoEliminado = profesores.filter((assignment) => assignment.id !== id);
    if (cursoEliminado.length !== profesores.length) {
      deleteTeacher(id);
      setProfesores(cursoEliminado);
    }

    console.log(`Eliminar profesor con ID: ${id}`);
  };

  const columns = [
    { label: "Profesores ID", accessor: "id" },
    { label: "Nombre Completo", accessor: "full_name" },
    { label: "Fecha de Nacimiento", accessor: "date_birth" },
    { label: "Genero", accessor: "gendre" },
    { label: "Direccion", accessor: "address" },
    { label: "Numero de Telefono", accessor: "phone" },
    { label: "Correo Electronico", accessor: "email" },
    { label: "Departamento", accessor: "department" },
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
    doc.text("Lista de profesores", 20, 10);

    const tableColumn = [
      "Profesor ID",
      "Nombre Completo",
      "Fecha de Nacimiento",
      "Genero",
      "Direccion",
      "Numero de Telefono",
      "Correo Electronicio",
      "Departamento",
    ];
    const tableRows = [];

    profesores.forEach((assignment) => {
      const assignmentData = [
        assignment.id,
        assignment.full_name,
        assignment.date_birth,
        assignment.gendre,
        assignment.address,
        assignment.phone,
        assignment.email,
        assignment.department,
      ];
      tableRows.push(assignmentData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("profesores.pdf");
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
          <span>Crear Profesor</span>
        </button>
      </div>

      <ReusableModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentProfesores ? "Actualizar Profesor" : "Crear Profesor"}
      >
        <form onSubmit={handleAddOrUpdateAssignment} className="space-y-4 m-3">
        <div>
            <label className="block text-sm font-medium text-gray-700">
              Documento Profesor
            </label>
            <input
              type="text"
              name="id"
              value={newProfesor.id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              name="full_name"
              value={newProfesor.full_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
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
              value={newProfesor.date_birth}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genero
            </label>
            <select
              name="gendre"
              value={newProfesor.gendre}
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
              Direccion
            </label>
            <input
              type="text"
              name="address"
              value={newProfesor.address}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numero de Telefono
            </label>
            <input
              type="text"
              name="phone"
              value={newProfesor.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electronico
            </label>
            <input
              type="text"
              name="email"
              value={newProfesor.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Departamento
            </label>
            <input
              type="text"
              name="department"
              value={newProfesor.department}
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
              {currentProfesores ? "Actualizar Profesor" : "Crear Profesor"}
            </button>
          </div>
        </form>
      </ReusableModal>
      {!isLoading ? (
        <ReusableTable
          title="Profesores"
          columns={columns}
          data={profesores}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UsersTeachers;
