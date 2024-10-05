import { useState, useEffect } from "react";
import { Input } from "../components";
import register from "../services/registerService";
import getRoles from "../services/rolServices";

export const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_birth: "",
    address: "",
    role_id: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [roles, setRoles] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await register(formData);
      setSuccessMessage("¡Registro exitoso!");
    } catch (error) {
      setError("Error en el registro. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error("Error al obtener roles:", error);
        setError("No se pudieron cargar los roles.");
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex items-center p-28 justify-center">
      <div className="bg-white px-20 py-20 rounded-3xl border-9 border-transparent shadow-2xl w-full max-w-3xl">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>

        <div className="mt-6 w-full">
          <form
            action="#"
            method="POST"
            onSubmit={handleRegister}
            className="grid grid-cols-2 sm:grid-cols-2 gap-6 gap-x-6"
          >
            <div>
              <label
                htmlFor="fullname"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Full name
              </label>
              <div className="mt-1">
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  placeholder="Alvin Jakitori"
                  autoComplete="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="user@gestionescolar.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="300000000"
                  autoComplete="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="datebirth"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <Input
                  id="date_birth"
                  name="date_birth"
                  type="date"
                  required
                  autoComplete="datebirth"
                  value={formData.date_birth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="Calle #"
                  autoComplete="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="sm:col-span-6">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="alvinjaki"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="block text-base font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*********"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="role_id"
                className="block text-sm font-medium text-gray-700"
              >
                Agregar Rol
              </label>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={
                  (e) => setFormData({ ...formData, role_id: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#006732] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#009e4c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          {error && <p className="mt-2 text-red-600">{error}</p>}
          {successMessage && (
            <p className="mt-2 text-green-600">{successMessage}</p>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-[#8dc109] hover:text-[#4f6d02]"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
