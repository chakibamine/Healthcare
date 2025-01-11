"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EntityTable from "@/Components/Custom/EntityTable";
import AddAppointmentModal from './AddAppointmentModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';
import MedicalLoading from '@/Components/Custom/MedicalLoading';
import { 
  fetchAppointments, 
  addAppointment, 
  updateAppointment, 
  deleteAppointment,
  setLoading,
  setError 
} from '@/redux/actions/appointmentActions';
import { fetchDoctors } from '@/redux/actions/doctorActions';
import { fetchPatients } from '@/redux/actions/patientActions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AppointmentsPage() {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(state => state.appointments || {});
  const { doctors } = useSelector(state => state.doctors);
  const { patients } = useSelector(state => state.patients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
          axios.get(`${API_URL}/Appointments`),
          axios.get(`${API_URL}/Doctors`),
          axios.get(`${API_URL}/Patients`)
        ]);
        
        dispatch(fetchAppointments(appointmentsRes.data));
        dispatch(fetchDoctors(doctorsRes.data));
        dispatch(fetchPatients(patientsRes.data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddAppointment = async (newAppointment) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${API_URL}/Appointments`, newAppointment);
      dispatch(addAppointment(data));
      setIsModalOpen(false);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditAppointment = async (updatedAppointment) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.put(`${API_URL}/Appointments/${updatedAppointment.id}`, updatedAppointment);
      dispatch(updateAppointment(response.data));
      setEditingAppointment(null);
      setIsModalOpen(false);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteAppointment = (appointmentId) => {
    setDeletingAppointment(appointments.find(appointment => appointment.id === appointmentId));
  };

  const confirmDelete = async () => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`${API_URL}/Appointments/${deletingAppointment.id}`);
      dispatch(deleteAppointment(deletingAppointment.id));
      setDeletingAppointment(null);
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
              setEditingAppointment(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Add Appointment
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <EntityTable
            data={appointments}
            columns={[
              { key: "id", title: "ID" },
              { 
                key: "date", 
                title: "Date",
                render: (value) => new Date(value).toLocaleDateString()
              },
              { key: "heure", title: "Time" },
              { 
                key: "statut", 
                title: "Status",
                render: (value) => (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    value === 'Confirmed' ? 'bg-green-50 text-green-700' : 
                    value === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                    value === 'Completed' ? 'bg-blue-50 text-blue-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {value}
                  </span>
                )
              },
              { 
                key: "patientId", 
                title: "Patient",
                render: (value) => {
                  const patient = patients.find(p => p.id === value);
                  return patient ? patient.nom : 'Unknown';
                }
              },
              { 
                key: "doctorId", 
                title: "Doctor",
                render: (value) => {
                  const doctor = doctors.find(d => d.id === value);
                  return doctor ? doctor.nom : 'Unknown';
                }
              },
              { key: "notes", title: "Notes" }
            ]}
            title="Appointment Management"
            onEdit={(appointment) => {
              setEditingAppointment(appointment);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteAppointment}
          />
        </div>
      </div>

      <AddAppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAppointment(null);
        }}
        onSubmit={editingAppointment ? handleEditAppointment : handleAddAppointment}
        initialData={editingAppointment}
      />

      <ConfirmationModal
        isOpen={!!deletingAppointment}
        onClose={() => setDeletingAppointment(null)}
        onConfirm={confirmDelete}
        title="Delete Appointment"
        message={`Are you sure you want to delete this appointment?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
} 