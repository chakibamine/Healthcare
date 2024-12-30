import EntityTable from "@/Components/Custom/EntityTable";

const doctors = [
  { id: 1, nom: "Dr. John Doe", specialite: "Cardiology" },
  { id: 2, nom: "Dr. Jane Smith", specialite: "Neurology" },
  // Add more doctor data here
];

export default function DoctorsPage() {
  return (
    <EntityTable
      data={doctors}
      columns={[
        { key: "id", title: "ID" },
        { key: "nom", title: "Nom" },
        { key: "specialite", title: "Spécialité" },
      ]}
      title="Docteurs"
    />
  );
} 