"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import AddPrescriptionModal from './AddPrescriptionModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { 
  fetchPrescriptions, 
  addPrescription, 
  updatePrescription, 
  deletePrescription 
} from '@/redux/actions/prescriptionActions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PrescriptionsPage() {
  const dispatch = useDispatch();
  const { prescriptions } = useSelector(state => state.prescriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [deletingPrescription, setDeletingPrescription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/Prescriptions`);
        dispatch(fetchPrescriptions(response.data));
      } catch (error) {
        console.error('Failed to fetch prescriptions:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const sendPrescriptionMessage = async (prescription, medicalRecord) => {
    try {
      // Get doctor contacts using the medical record's doctorId
      const doctorContacts = await axios.get(`${API_URL}/chat/contacts/${medicalRecord.doctorId}?role=doctor`);
      const chatExists = doctorContacts.data.some(contact => contact.otherPartyId === medicalRecord.patientId);

      // Create chat if it doesn't exist
      if (!chatExists) {
        await axios.post(`${API_URL}/chat/create`, {
          doctorId: medicalRecord.doctorId,
          patientId: medicalRecord.patientId
        });
      }

      const messageContent = `
🏥 *New Prescription Details* 🏥

💊 *Medications*
${prescription.medicaments}

📝 *Posology* 
${prescription.posologie}

⏱️ *Duration*
${prescription.duration} days

📋 *Description*
${prescription.description}

⚠️ *Side Effects*
${prescription.sideEffects.length > 0 ? prescription.sideEffects.join('\n• ') : 'None reported'}

Please follow the prescription carefully and contact your doctor if you experience any issues.
Get well soon! 🌟`;

      // Send the message
      await axios.post(`${API_URL}/chat/send`, {
        chatId: chatExists ? doctorContacts.data.find(c => c.otherPartyId === medicalRecord.patientId).chatId : null,
        sender: 'doctor',
        content: messageContent
      });
    } catch (error) {
      console.error('Failed to send prescription message:', error);
    }
  };

  const handleAddPrescription = async (newPrescription) => {
    try {
      const response = await axios.post(`${API_URL}/Prescriptions`, newPrescription);
      dispatch(addPrescription(response.data));

      // Get medical record to get chat details
      const medicalRecordResponse = await axios.get(`${API_URL}/MedicalRecords/${newPrescription.medicalRecordId}`);
      await sendPrescriptionMessage(newPrescription, medicalRecordResponse.data);
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add prescription:', error);
      alert(error.message || 'Failed to add prescription');
    }
  };

  const handleEditPrescription = async (updatedPrescription) => {
    try {
      const response = await axios.put(
        `${API_URL}/Prescriptions/${updatedPrescription.id}`, 
        updatedPrescription
      );
      dispatch(updatePrescription(response.data));

      // Get medical record to get chat details
      const medicalRecordResponse = await axios.get(`${API_URL}/MedicalRecords/${updatedPrescription.medicalRecordId}`);
      await sendPrescriptionMessage(updatedPrescription, medicalRecordResponse.data);

      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update prescription:', error);
      alert(error.message || 'Failed to update prescription');
    }
  };

  const handleDeletePrescription = async (prescriptionId) => {
    try {
      await axios.delete(`${API_URL}/Prescriptions/${prescriptionId}`);
      dispatch(deletePrescription(prescriptionId));
      setDeletingPrescription(null);
    } catch (error) {
      console.error('Failed to delete prescription:', error);
      alert('Failed to delete prescription');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <button
            onClick={() => {
              setEditingPrescription(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Add Prescription
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Medical Record</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Medications</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.medicalRecordId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {prescription.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {prescription.medicaments}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.duration} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setEditingPrescription(prescription);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingPrescription(prescription)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingPrescription ? handleEditPrescription : handleAddPrescription}
        initialData={editingPrescription}
      />

      <ConfirmationModal
        isOpen={!!deletingPrescription}
        onClose={() => setDeletingPrescription(null)}
        onConfirm={() => handleDeletePrescription(deletingPrescription.id)}
        title="Delete Prescription"
        message="Are you sure you want to delete this prescription?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
} 