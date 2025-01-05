"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EntityTable from "@/Components/Custom/EntityTable";
import AddPatientModal from './AddPatientModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';
import MedicalLoading from '@/Components/Custom/MedicalLoading';
import { 
  fetchPatients, 
  addPatient, 
  updatePatient, 
  deletePatient,
  setLoading,
  setError 
} from '@/redux/actions/patientActions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PatientsPage() {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector(state => state.patients || {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await axios.get(`${API_URL}/Patients`);
        dispatch(fetchPatients(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);


  const handleAddPatient = async (newPatient) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${API_URL}/Patients`, newPatient);
      dispatch(addPatient(data));
      setIsModalOpen(false);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditPatient = async (updatedPatient) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`${API_URL}/Patients/${updatedPatient.id}`, {
        id: updatedPatient.id,
        nom: updatedPatient.nom,
        adresse: updatedPatient.adresse,
        phoneNumber: updatedPatient.phoneNumber,
        email: updatedPatient.email
      });
      
      dispatch(updatePatient(response.data));
      
      setTimeout(() => {
        setEditingPatient(null);
        setIsModalOpen(false);
      }, 100);

    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeletePatient = (patientId) => {
    setDeletingPatient(patients.find(patient => patient.id === patientId));
  };

  const confirmDelete = async () => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`${API_URL}/Patients/${deletingPatient.id}`);
      dispatch(deletePatient(deletingPatient.id));
      setDeletingPatient(null);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
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
              setEditingPatient(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Add Patient
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <EntityTable
            data={patients}
            columns={[
              { key: "id", title: "ID" },
              { key: "nom", title: "Full Name" },
              { 
                key: "adresse", 
                title: "Address",
                render: (value) => (
                  <span className="text-gray-600">
                    {value}
                  </span>
                )
              },
              { 
                key: "phoneNumber", 
                title: "Phone",
                render: (value) => (
                  <span className="font-medium text-gray-700">
                    {value}
                  </span>
                )
              },
              { 
                key: "email", 
                title: "Email",
                render: (value) => (
                  <span className="text-blue-600">
                    {value}
                  </span>
                )
              }
            ]}
            title="Patient Management"
            onEdit={(patient) => {
              setEditingPatient(patient);
              setIsModalOpen(true);
            }}
            onDelete={handleDeletePatient}
          />
        </div>
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPatient(null);
        }}
        onSubmit={editingPatient ? handleEditPatient : handleAddPatient}
        initialData={editingPatient}
      />

      <ConfirmationModal
        isOpen={!!deletingPatient}
        onClose={() => setDeletingPatient(null)}
        onConfirm={confirmDelete}
        title="Delete Patient"
        message={`Are you sure you want to delete patient ${deletingPatient?.nom}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
} 