"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EntityTable from "@/Components/Custom/EntityTable";
import AddDoctorModal from './AddDoctorModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';
import { 
  fetchDoctors, 
  addDoctor, 
  updateDoctor, 
  deleteDoctor 
} from '@/redux/actions/doctorActions';

const initialDoctorsData = [
  { id: 1, nom: "Dr. John Doe", specialite: "Cardiology", experience: 10, rating: 4.5 },
  { id: 2, nom: "Dr. Jane Smith", specialite: "Neurology", experience: 15, rating: 4.8 },
];

export default function DoctorsPage() {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector(state => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  useEffect(() => {
    // Initialize with some data
    dispatch(fetchDoctors(initialDoctorsData));
  }, [dispatch]);

  const handleAddDoctor = (newDoctor) => {
    dispatch(addDoctor(newDoctor));
  };

  const handleEditDoctor = (updatedDoctor) => {
    dispatch(updateDoctor(updatedDoctor));
    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (doctorId) => {
    setDeletingDoctor(doctors.find(doctor => doctor.id === doctorId));
  };

  const confirmDelete = () => {
    dispatch(deleteDoctor(deletingDoctor.id));
    setDeletingDoctor(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setEditingDoctor(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Add Doctor
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <EntityTable
            data={doctors}
            columns={[
              { key: "id", title: "ID" },
              { key: "nom", title: "Name" },
              { 
                key: "specialite", 
                title: "Spécialité",
                render: (value) => (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {value}
                  </span>
                )
              },
              { 
                key: "experience", 
                title: "Experience",
                render: (value) => (
                  <span className="font-medium text-gray-700">
                    {value} ans
                  </span>
                )
              },
              { 
                key: "rating", 
                title: "Rating",
                render: (value) => (
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 font-medium text-gray-700">{value}</span>
                  </div>
                )
              },
            ]}
            title="Gestion des docteurs"
            onEdit={(doctor) => {
              setEditingDoctor(doctor);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteDoctor}
          />
        </div>
      </div>

      <AddDoctorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDoctor(null);
        }}
        onSubmit={editingDoctor ? handleEditDoctor : handleAddDoctor}
        initialData={editingDoctor}
      />

      <ConfirmationModal
        isOpen={!!deletingDoctor}
        onClose={() => setDeletingDoctor(null)}
        onConfirm={confirmDelete}
        title="Supprimer un docteur"
        message={`Êtes-vous sûr de vouloir supprimer Dr. ${deletingDoctor?.nom} du système ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
} 