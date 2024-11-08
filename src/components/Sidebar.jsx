import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  UserIcon,
  AcademicCapIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "./security/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const [isStudentMenuOpen, setStudentMenuOpen] = useState(false);
  const [isteachersMenuOpen, setTeacherMenuOpen] = useState(false);
  const [isCourseMenuOpen, setCourseMenuOpen] = useState(false);
  const { userData } = useAuth();

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          {/*   <img src={Logo} alt="Logo" className="w-32" /> */}
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Menu Item Estudiantes */}
              <li className="relative">
                <button
                  onClick={() => setStudentMenuOpen(!isStudentMenuOpen)}
                  className={`group relative flex items-center gap-2.5 w-full rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-primaryAtuuja dark:hover:bg-meta-4 ${
                    pathname.includes("students")
                      ? "text-primaryAtuuja-500"
                      : "text-gray-500"
                  }`}
                >
                  <AcademicCapIcon className="h-6 w-6 text-gray-500 group-hover:text-primaryAtuuja" />
                  <span>Gestión Estudiantes</span>
                  <ChevronDownIcon
                    className={`h-5 w-5 ml-auto transform ${
                      isStudentMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Submenús */}
                {isStudentMenuOpen && (
                  <ul className="pr-4 mt-1 flex flex-col space-y-1 bg-white dark:bg-meta-4 rounded-lg shadow-lg">
                    <li>
                      <NavLink
                        to="/menu/students"
                        className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 dark:text-white"
                      >
                        Estudiantes
                      </NavLink>
                    </li>
                    {userData.role_id === 1 ? (
                      <>
                        <li>
                          <NavLink
                            to="/menu/grades"
                            className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 dark:text-white"
                          >
                            Calificaciones
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/menu/schedule"
                            className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 dark:text-white"
                          >
                            Asignaciones de cursos
                          </NavLink>
                        </li>{" "}
                      </>
                    ) : null}

                    {/* <li>
                    <NavLink
                      to="/menu/report"
                      className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 dark:text-white"
                    >
                      Reporte General 
                    </NavLink>
                  </li> */}
                  </ul>
                )}
              </li>

              {/* Menu Item Profesores */}
              {userData.role_id === 1 && (
                <li className="relative">
                  <button
                    onClick={() => setTeacherMenuOpen(!isteachersMenuOpen)}
                    className={`group relative flex items-center gap-2.5 w-full rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-primaryAtuuja dark:hover:bg-meta-4 ${
                      pathname.includes("students")
                        ? "text-primaryAtuuja-500"
                        : "text-gray-500"
                    }`}
                  >
                    <UserIcon className="h-6 w-6 text-gray-500 group-hover:text-primaryAtuuja" />
                    <span>Gestión Profesores</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 ml-auto transform ${
                        isteachersMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Submenús */}
                  {isteachersMenuOpen && (
                    <ul className="pr-4 mt-1 flex flex-col space-y-1 bg-white dark:bg-meta-4 rounded-lg shadow-lg">
                      <li>
                        <NavLink
                          to="/menu/teachers"
                          className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 dark:text-white"
                        >
                          Profesores
                        </NavLink>
                      </li>
                      {/* <li>
                      <NavLink
                        to="/menu/grades"
                        className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 dark:text-white"
                      >
                        Asignación de cursos
                      </NavLink>
                    </li> */}
                    </ul>
                  )}
                </li>
              )}

              {/* Menu Item Cursos */}
              {userData.role_id === 1 && (
                <li className="relative">
                  <button
                    onClick={() => setCourseMenuOpen(!isCourseMenuOpen)}
                    className={`group relative flex items-center gap-2.5 w-full rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-primaryAtuuja dark:hover:bg-meta-4 ${
                      pathname.includes("students")
                        ? "text-primaryAtuuja-500"
                        : "text-gray-500"
                    }`}
                  >
                    <DocumentTextIcon className="h-6 w-6 text-gray-500 group-hover:text-primaryAtuuja" />
                    <span>Gestión de cursos</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 ml-auto transform ${
                        isCourseMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Submenús */}
                  {isCourseMenuOpen && (
                    <ul className="pr-4 mt-1 flex flex-col space-y-1 bg-white dark:bg-meta-4 rounded-lg shadow-lg">
                      <li>
                        <NavLink
                          to="courses/"
                          className="block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-meta-4 dark:text-white"
                        >
                          Cursos
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
