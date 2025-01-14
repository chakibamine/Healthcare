"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import AddTreatmentModal from './AddTreatmentModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { 
  fetchTreatments, 
  addTreatment, 
  updateTreatment, 
  deleteTreatment 
} from '@/redux/actions/treatmentActions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TreatmentsPage() {
  const dispatch = useDispatch();
  const { treatments } = useSelector(state => state.treatments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [deletingTreatment, setDeletingTreatment] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/MedicalRecords`);
        dispatch(fetchTreatments(response.data));
      } catch (error) {
        console.error('Failed to fetch treatments:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddTreatment = async (newTreatment) => {
    try {
      if (!newTreatment.appointmentId) {
        throw new Error('Please select an appointment');
      }

      // Check if chat already exists between doctor and patient
      const doctorContacts = await axios.get(`${API_URL}/chat/contacts/${newTreatment.doctorId}?role=doctor`);
      const chatExists = doctorContacts.data.some(contact => contact.otherPartyId === newTreatment.patientId);

      // Create chat if it doesn't exist
      if (!chatExists) {
        await axios.post(`${API_URL}/chat/create`, {
          doctorId: newTreatment.doctorId,
          patientId: newTreatment.patientId
        });
      }

      const response = await axios.post(`${API_URL}/MedicalRecords`, newTreatment);
      dispatch(addTreatment(response.data));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add treatment:', error);
      alert(error.message || 'Failed to add treatment');
    }
  };

  const handleEditTreatment = async (updatedTreatment) => {
    try {
      if (!updatedTreatment.appointmentId) {
        throw new Error('Please select an appointment');
      }

      const response = await axios.put(
        `${API_URL}/MedicalRecords/${updatedTreatment.id}`, 
        updatedTreatment
      );
      dispatch(updateTreatment(response.data));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update treatment:', error);
      alert(error.message || 'Failed to update treatment');
    }
  };

  const handleDeleteTreatment = async (treatmentId) => {
    try {
      await axios.delete(`${API_URL}/MedicalRecords/${treatmentId}`);
      dispatch(deleteTreatment(treatmentId));
      setDeletingTreatment(null);
    } catch (error) {
      console.error('Failed to delete treatment:', error);
      alert('Failed to delete treatment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Dossiers Médicaux</h1>
          <button
            onClick={() => {
              setEditingTreatment(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Ajouter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Docteur</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Diagnostic</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {treatments.map((treatment) => (
                <tr key={treatment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {treatment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(treatment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {treatment.patient?.nom || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {treatment.doctor?.nom || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {treatment.diagnosis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setEditingTreatment(treatment);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => setDeletingTreatment(treatment)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddTreatmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingTreatment ? handleEditTreatment : handleAddTreatment}
        initialData={editingTreatment}
      />

      <ConfirmationModal
        isOpen={!!deletingTreatment}
        onClose={() => setDeletingTreatment(null)}
        onConfirm={() => handleDeleteTreatment(deletingTreatment.id)}
        title="Supprimer le dossier médical"
        message="Êtes-vous sûr de vouloir supprimer ce dossier médical ?"
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
}