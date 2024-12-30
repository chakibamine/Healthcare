"use client";
import { useState } from "react";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function EntityTable({ data, columns, title, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;

  // Filter data based on search
  const filteredData = data.filter(item =>
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl">
      <div className="relative mx-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          </div>
          <div className="relative">
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
        </div>
      </div>

      <div className="overflow-scroll mt-4">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-4 border-y bg-slate-50">
                  {col.title}
                </th>
              ))}
              <th className="p-4 border-y bg-slate-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key} className="p-4 border-b">
                    {col.render ? col.render(item[col.key]) : item[col.key]}
                  </td>
                ))}
                <td className="p-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="Modifier"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Supprimer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-4 text-center text-slate-500">No data available</div>
        )}
      </div>

      <div className="p-3 flex justify-between items-center">
        <p className="text-sm text-slate-500">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            className="rounded border py-2 px-3 text-xs font-semibold disabled:opacity-50"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="rounded border py-2 px-3 text-xs font-semibold disabled:opacity-50"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}