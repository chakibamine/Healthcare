"use client";
import { useState } from "react";

const employees = [
  {
    id: 1,
    name: "John Michael",
    email: "john@creative-tim.com",
    role: "Manager",
    department: "Organization",
    status: "online",
    employed: "23/04/18",
    avatar: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  },
  {
    id: 2,
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    role: "Designer",
    department: "Marketing",
    status: "offline",
    employed: "23/04/18",
    avatar: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
  },
  {
    id: 3,
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    role: "Executive",
    department: "Projects",
    status: "offline",
    employed: "19/09/17",
    avatar: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
  },
];

export default function EmployeeList() {
  const [showDialog, setShowDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const openDialog = (employee) => {
    setCurrentEmployee(employee);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setCurrentEmployee(null);
  };

  return (
    <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl">
      <div className="relative mx-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Employees List
            </h3>
            <p className="text-slate-500">Review each person before edit</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded border border-slate-300 py-2.5 px-3 text-xs font-semibold text-slate-600 hover:opacity-75">
              View All
            </button>
            <button className="flex items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
              </svg>
              Add Member
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-scroll mt-4">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-y bg-slate-50">Member</th>
              <th className="p-4 border-y bg-slate-50">Function</th>
              <th className="p-4 border-y bg-slate-50">Status</th>
              <th className="p-4 border-y bg-slate-50">Employed</th>
              <th className="p-4 border-y bg-slate-50"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="h-9 w-9 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold">{employee.name}</p>
                      <p className="text-sm text-slate-500">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b">
                  <div>
                    <p className="text-sm font-semibold">{employee.role}</p>
                    <p className="text-sm text-slate-500">
                      {employee.department}
                    </p>
                  </div>
                </td>
                <td className="p-4 border-b">
                  <div className={`px-2 py-1 text-xs rounded-md ${employee.status === "online" ? "bg-green-500/20 text-green-900" : "bg-slate-100 text-slate-500"}`}>
                    {employee.status}
                  </div>
                </td>
                <td className="p-4 border-b">
                  <p className="text-sm text-slate-500">{employee.employed}</p>
                </td>
                <td className="p-4 border-b">
                  <button
                    className="rounded-lg w-10 h-10 hover:bg-slate-100"
                    onClick={() => openDialog(employee)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-4 h-4 mx-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 flex justify-between items-center">
        <p className="text-sm text-slate-500">Page 1 of 10</p>
        <div className="flex gap-2">
          <button className="rounded border py-2 px-3 text-xs font-semibold">
            Previous
          </button>
          <button className="rounded border py-2 px-3 text-xs font-semibold">
            Next
          </button>
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[24rem]">
            <h4 className="text-2xl font-semibold">Edit Member Details</h4>
            <p className="text-sm text-slate-400 mt-2">
              Update information for {currentEmployee.name}.
            </p>
            <button
              className="w-full mt-4 bg-red-600 text-white py-2 rounded-md"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
