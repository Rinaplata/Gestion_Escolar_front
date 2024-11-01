import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const ReusableTable = ({ data = [], columns = [], title = [] }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-2 bg-gray-100 border-b font-bold text-gray-700"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b">
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-4 py-2 text-gray-600 text-center"
                >
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
