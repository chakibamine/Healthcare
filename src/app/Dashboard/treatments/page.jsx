"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EntityTable from "@/Components/Custom/EntityTable";
import AddTreatmentModal from './AddTreatmentModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';
import { 
  fetchTreatments, 
  addTreatment, 
  updateTreatment, 
  deleteTreatment,
  setError 
} from '@/redux/actions/treatmentActions';
import { fetchDoctors } from '@/redux/actions/doctorActions';
import { fetchPatients } from '@/redux/actions/patientActions';
import { fetchAppointments } from '@/redux/actions/appointmentActions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TreatmentsPage() {
  
  const dispatch = useDispatch();
  const { treatments, loading, error } = useSelector(state => state.treatments || { 
    treatments: [], 
    loading: false, 
    error: null 
  });
  const { doctors } = useSelector(state => state.doctors || { doctors: [] });
  const { patients } = useSelector(state => state.patients || { patients: [] });
  const { appointments } = useSelector(state => state.appointments || { appointments: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [deletingTreatment, setDeletingTreatment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicalRecordsRes, doctorsRes, patientsRes, appointmentsRes] = await Promise.all([
          axios.get(`${API_URL}/MedicalRecords`),
          axios.get(`${API_URL}/Doctors`),
          axios.get(`${API_URL}/Patients`),
          axios.get(`${API_URL}/Appointments`)
        ]);
        
        dispatch(fetchTreatments(medicalRecordsRes.data));
        dispatch(fetchDoctors(doctorsRes.data));
        dispatch(fetchPatients(patientsRes.data));
        dispatch(fetchAppointments(appointmentsRes.data));
      } catch (error) {
        dispatch(setError(error.message));
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddTreatment = async (newTreatment) => {
    try {
      console.log('Adding new treatment:', newTreatment);
      const treatmentToAdd = {
        diagnosis: newTreatment.diagnosis,
        date: newTreatment.date,
        patientId: newTreatment.patientId,
        doctorId: newTreatment.doctorId,
        notes: newTreatment.notes || '',
        prescription: null,
        appointmentId: newTreatment.appointmentId
      };

      const response = await axios.post(`${API_URL}/MedicalRecords`, treatmentToAdd);
      console.log('Treatment added successfully:', response.data);
      dispatch(addTreatment(response.data));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add treatment:', error.response?.data || error.message);
    }
  };

  const handleEditTreatment = async (updatedTreatment) => {
    try {
      console.log('Updating treatment:', updatedTreatment);
      const treatmentToUpdate = {
        id: updatedTreatment.id,
        diagnosis: updatedTreatment.diagnosis,
        date: updatedTreatment.date,
        patientId: updatedTreatment.patientId,
        doctorId: updatedTreatment.doctorId,
        notes: updatedTreatment.notes || '',
        appointmentId: updatedTreatment.appointmentId
      };

      const response = await axios.put(`${API_URL}/MedicalRecords/${updatedTreatment.id}`, treatmentToUpdate);
      console.log('Treatment updated successfully:', response.data);
      dispatch(updateTreatment(response.data));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update treatment:', error.response?.data || error.message);
    }
  };

  const handleDeleteTreatment = (treatmentId) => {
    const treatmentToDelete = treatments.find(t => t.id === treatmentId);
    setDeletingTreatment(treatmentToDelete);
  };

  const confirmDelete = async () => {
    if (deletingTreatment) {
      try {
        await axios.delete(`${API_URL}/MedicalRecords/${deletingTreatment.id}`);
        dispatch(deleteTreatment(deletingTreatment.id));
        setDeletingTreatment(null);
      } catch (error) {
        console.error('Failed to delete treatment:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">Rendez-vous et Traitements</h1>
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date RDV</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Docteur</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Traitement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((appointment) => (
                <tr 
                  key={appointment.id}
                  onClick={() => {
                    const treatment = treatments.find(t => t.appointmentId === appointment.id);
                    setEditingTreatment(treatment || { appointmentId: appointment.id });
                    setIsModalOpen(true);
                  }}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appointment.heure}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patients.find(p => p.id === appointment.patientId)?.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doctors.find(d => d.id === appointment.doctorId)?.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${appointment.statut === 'Completed' ? 'bg-green-100 text-green-800' :
                      appointment.statut === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                      {appointment.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {appointment.notes || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {treatments.find(t => t.appointmentId === appointment.id)?.diagnosis ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Traité
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        En attente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <AddTreatmentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTreatment(null);
          }}
          onSubmit={editingTreatment?.id ? handleEditTreatment : handleAddTreatment}
          initialData={editingTreatment}
        />
      )}

      <ConfirmationModal
        isOpen={!!deletingTreatment}
        onClose={() => setDeletingTreatment(null)}
        onConfirm={confirmDelete}
        title="Supprimer le dossier médical"
        message={`Êtes-vous sûr de vouloir supprimer ce dossier médical ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
}