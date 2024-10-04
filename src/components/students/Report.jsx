/* import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StudentReport = ({ students = [], courses = [], schedules = [], grades = [] }) => {

  const generateStudentPDF = (studentId) => {
    const doc = new jsPDF();

    const student = students.find((s) => s.id === studentId);
    const studentSchedules = schedules.filter((s) => s.studentId === studentId);
    const studentGrades = grades.filter((g) => g.studentId === studentId);


    doc.setFontSize(18);
    doc.text(`Reporte del Estudiante: ${student.name}`, 14, 22);

    doc.setFontSize(14);
    doc.text("Datos del Estudiante", 14, 30);
    doc.autoTable({
      startY: 35,
      head: [["ID", "Nombre", "Correo", "Edad"]],
      body: [[student.id, student.name, student.email, student.age]],
    });

    doc.text("Horarios", 14, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: [["Curso ID", "Día", "Hora de Inicio", "Hora de Finalización"]],
      body: studentSchedules.map((schedule) => [
        schedule.courseId,
        schedule.day,
        schedule.startTime,
        schedule.endTime,
      ]),
    });


    const studentCourses = courses.filter((course) =>
      studentSchedules.some((schedule) => schedule.courseId === course.courseId)
    );
    doc.text("Cursos", 14, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: [["Curso ID", "Nombre", "Descripción"]],
      body: studentCourses.map((course) => [
        course.courseId,
        course.courseName,
        course.description,
      ]),
    });


    doc.text("Calificaciones", 14, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: [["Curso ID", "Calificación"]],
      body: studentGrades.map((grade) => [grade.courseId, grade.grade]),
    });

    doc.save(`Reporte_Estudiante_${student.name}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reporte de Estudiantes</h1>

      {students.map((student) => (
        <div key={student.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold">{student.name}</h2>
          <p>ID: {student.id}</p>
          <p>Email: {student.email}</p>
          <p>Edad: {student.age}</p>
          <button
            onClick={() => generateStudentPDF(student.id)}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Descargar Reporte
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentReport;
 */