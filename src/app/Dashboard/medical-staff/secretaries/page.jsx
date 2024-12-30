import EntityTable from "@/Components/Custom/EntityTable";

const secretaries = [
  { id: 1, nom: "Sarah Connor" },
  { id: 2, nom: "John Doe" },
  // Add more secretary data here
];

export default function SecretariesPage() {
  return (
    <EntityTable
      data={secretaries}
      columns={[
        { key: "id", title: "ID" },
        { key: "nom", title: "Nom" },
      ]}
      title="Secrétaires"
    />
  );
} 