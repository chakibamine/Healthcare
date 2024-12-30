import EntityTable from "@/Components/Custom/EntityTable";

const treatments = [
  { id: 1, description: "Antibiotics", medicaments: "Amoxicillin", posologie: "500mg" },
  { id: 2, description: "Pain Relief", medicaments: "Ibuprofen", posologie: "200mg" },
  // Add more treatment data here
];

export default function TreatmentsPage() {
  return (
    <EntityTable
      data={treatments}
      columns={[
        { key: "id", title: "ID" },
        { key: "description", title: "Description" },
        { key: "medicaments", title: "Médicaments" },
        { key: "posologie", title: "Posologie" },
      ]}
      title="Traitements"
    />
  );
} 