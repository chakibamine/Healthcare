"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EntityTable from "@/Components/Custom/EntityTable";
import AddDoctorModal from './AddDoctorModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';
import { 
  fetchDoctors, 
  addDoctor, 
  updateDoctor, 
  deleteDoctor,
  setLoading,
  setError 
} from '@/redux/actions/doctorActions';
import MedicalLoading from '@/Components/Custom/MedicalLoading';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DoctorsPage() {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector(state => state.doctors || {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await axios.get(`${API_URL}/Doctors`);
        dispatch(fetchDoctors(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddDoctor = async (newDoctor) => {
    dispatch(setLoading(true));
    try {
      console.log('Sending doctor data:', newDoctor);
      const { data } = await axios.post(`${API_URL}/Doctors`, newDoctor);
      console.log('Received response:', data);
      dispatch(addDoctor(data));
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditDoctor = async (updatedDoctor) => {
    dispatch(setLoading(true));
    try {
      console.log('Updating doctor:', updatedDoctor);
      const { data } = await axios.put(`${API_URL}/Doctors/${updatedDoctor.id}`, updatedDoctor);
      console.log('Server response:', data);
      
      // Update the store with the data returned from the server
      dispatch(updateDoctor(data));
      setEditingDoctor(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error updating doctor:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteDoctor = (doctorId) => {
    setDeletingDoctor(doctors.find(doctor => doctor.id === doctorId));
  };

  const confirmDelete = async () => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`${API_URL}/Doctors/${deletingDoctor.id}`);
      dispatch(deleteDoctor(deletingDoctor.id));
      setDeletingDoctor(null);
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <MedicalLoading />
    </div>
  );
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;

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