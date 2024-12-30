import EntityTable from "@/Components/Custom/EntityTable";

const medicineStock = [
  { id: 1, nom: "Paracetamol", quantite: 100, dateExpiration: "2024-01-01" },
  { id: 2, nom: "Ibuprofen", quantite: 50, dateExpiration: "2023-12-01" },
  // Add more stock data here
];

export default function MedicineStockPage() {
  return (
    <EntityTable
      data={medicineStock}
      columns={[
        { key: "id", title: "ID" },
        { key: "nom", title: "Nom" },
        { key: "quantite", title: "Quantité" },
        { key: "dateExpiration", title: "Date d'Expiration" },
      ]}
      title="Stock Médicaments"
    />
  );
} 