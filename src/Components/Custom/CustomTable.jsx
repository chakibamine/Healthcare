"use client";
import { useState } from "react";

export default function CustomTable({
  data,
  columns,
  actions,
  onActionClick,
  renderDetails,
  rowsPerPage = 5,
  searchableKeys = [], 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on the search query
  const filteredData = data.filter((item) =>
    searchableKeys.some((key) =>
      String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
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

  const openDialog = (item) => {
    setCurrentItem(item);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setCurrentItem(null);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl">
      <div className="relative mx-4 mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">Custom Table</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="rounded-md border border-slate-300 py-2 px-3 text-sm text-slate-600 shadow-sm focus:outline-none focus:ring focus:ring-slate-400"
          />
        </div>
        <p className="text-slate-500 mt-1">Dynamic and reusable table component</p>
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
              {actions && <th className="p-4 border-y bg-slate-50">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.key} className="p-4 border-b">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 border-b">
                    {actions.map((action) => (
                      <button
                        key={action.label}
                        className={action.className || "text-blue-500 hover:underline"}
                        onClick={() => onActionClick(action.key, item)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-4 text-center text-slate-500">No results found</div>
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

      {showDialog && renderDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[24rem]">
            {renderDetails(currentItem, closeDialog)}
          </div>
        </div>
      )}
    </div>
  );
}
