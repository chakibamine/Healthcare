"use client";

const appointments = [
  {
    time: "9:30 AM",
    date: "05/12/2022",
    name: "Elizabeth Polson",
    age: 32,
    doctor: "Dr. John",
    feeStatus: "Paid",
    userAction: "Request Fee",
    avatar: "/path/to/avatar1.png",
  },
  {
    time: "9:30 AM",
    date: "05/12/2022",
    name: "John David",
    age: 28,
    doctor: "Dr. Joel",
    feeStatus: "UnPaid",
    userAction: "Request Fee",
    avatar: "/path/to/avatar2.png",
  },
  {
    time: "10:30 AM",
    date: "05/12/2022",
    name: "Kristav Rajan",
    age: 24,
    doctor: "Dr. Joel",
    feeStatus: "UnPaid",
    userAction: "Request Fee",
    avatar: "/path/to/avatar3.png",
  },
];

export default function AppointmentTable() {
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2">Time</th>
              <th scope="col" className="px-4 py-2">Date</th>
              <th scope="col" className="px-4 py-2">Patient Name</th>
              <th scope="col" className="px-4 py-2">Patient Age</th>
              <th scope="col" className="px-4 py-2">Doctor</th>
              <th scope="col" className="px-4 py-2">Fee Status</th>
              <th scope="col" className="px-4 py-2">User Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{appointment.time}</td>
                <td className="px-4 py-2">{appointment.date}</td>
                <td className="px-4 py-2 flex items-center">
                  <img
                    src={appointment.avatar}
                    alt={appointment.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {appointment.name}
                </td>
                <td className="px-4 py-2">{appointment.age}</td>
                <td className="px-4 py-2">{appointment.doctor}</td>
                <td
                  className={`px-4 py-2 ${
                    appointment.feeStatus === "Paid"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {appointment.feeStatus}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline">
                    {appointment.userAction}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
