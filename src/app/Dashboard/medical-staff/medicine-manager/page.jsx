import EntityTable from "@/Components/Custom/EntityTable";

const medicineManagers = [
  { id: 1, nom: "Dr. House" },
  { id: 2, nom: "Dr. Watson" },
  // Add more medicine manager data here
];

export default function MedicineManagersPage() {
  return (
    <EntityTable
      data={medicineManagers}
      columns={[
        { key: "id", title: "ID" },
        { key: "nom", title: "Nom" },
      ]}
      title="Responsable Médicaments"
    />
  );
} 