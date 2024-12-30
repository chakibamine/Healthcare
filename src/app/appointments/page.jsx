import EntityTable from "@/Components/Custom/EntityTable";

const appointments = [
  { id: 1, date: "2023-10-01", heure: "10:00", statut: "Confirmed" },
  { id: 2, date: "2023-10-02", heure: "11:00", statut: "Pending" },
  // Add more appointment data here
];

export default function AppointmentsPage() {
  return (
    <EntityTable
      data={appointments}
      columns={[
        { key: "id", title: "ID" },
        { key: "date", title: "Date" },
        { key: "heure", title: "Heure" },
        { key: "statut", title: "Statut" },
      ]}
      title="Rendez-vous"
    />
  );
} 