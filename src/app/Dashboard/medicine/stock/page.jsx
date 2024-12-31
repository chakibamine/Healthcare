"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EntityTable from "@/Components/Custom/EntityTable";
import AddMedicamentModal from './AddMedicamentModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';

const initialMedicaments = [
  { 
    id: 1, 
    nom: "Paracetamol", 
    quantite: 100,
    dateExpiration: "2024-12-31",
    storageLocation: "Armoire A1",
    isCritical: false
  },
  { 
    id: 2, 
    nom: "Ibuprofène", 
    quantite: 50,
    dateExpiration: "2024-06-30",
    storageLocation: "Armoire B2",
    isCritical: true
  },
];

export default function MedicamentStockPage() {
  const dispatch = useDispatch();
  const { medicaments } = useSelector(state => state.medicament);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedicament, setEditingMedicament] = useState(null);
  const [deletingMedicament, setDeletingMedicament] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_MEDICAMENTS', payload: initialMedicaments });
  }, [dispatch]);

  const handleAddMedicament = (newMedicament) => {
    dispatch({ 
      type: 'ADD_MEDICAMENT', 
      payload: { ...newMedicament, id: Date.now() }
    });
    setIsModalOpen(false);
  };

  const handleEditMedicament = (updatedMedicament) => {
    dispatch({ 
      type: 'UPDATE_MEDICAMENT', 
      payload: updatedMedicament 
    });
    setEditingMedicament(null);
    setIsModalOpen(false);
  };

  const handleDeleteMedicament = (medicamentId) => {
    const medicamentToDelete = medicaments.find(med => med.id === medicamentId);
    setDeletingMedicament(medicamentToDelete);
  };

  const confirmDelete = () => {
    if (deletingMedicament) {
      dispatch({ 
        type: 'DELETE_MEDICAMENT', 
        payload: deletingMedicament.id 
      });
      setDeletingMedicament(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setEditingMedicament(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Ajouter un médicament
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <EntityTable
            data={medicaments}
            columns={[
              { key: "id", title: "ID" },
              { key: "nom", title: "Nom" },
              { 
                key: "quantite", 
                title: "Quantité",
                render: (value) => (
                  <span className="font-medium text-gray-700">
                    {value} unités
                  </span>
                )
              },
              { key: "dateExpiration", title: "Date d'expiration" },
              { key: "storageLocation", title: "Emplacement" },
              { 
                key: "isCritical", 
                title: "État",
                render: (value) => (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    value 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {value ? 'Stock critique' : 'Normal'}
                  </span>
                )
              },
            ]}
            title="Gestion du stock de médicaments"
            onEdit={(medicament) => {
              setEditingMedicament(medicament);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteMedicament}
          />
        </div>
      </div>

      <AddMedicamentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMedicament(null);
        }}
        onSubmit={editingMedicament ? handleEditMedicament : handleAddMedicament}
        initialData={editingMedicament}
      />

      <ConfirmationModal
        isOpen={!!deletingMedicament}
        onClose={() => setDeletingMedicament(null)}
        onConfirm={confirmDelete}
        title="Supprimer un médicament"
        message={`Êtes-vous sûr de vouloir supprimer ${deletingMedicament?.nom} du stock ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
} 