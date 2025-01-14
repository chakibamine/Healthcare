"use client";
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function AddTreatmentModal({ isOpen, onClose, onSubmit, initialData }) {
  const { doctors } = useSelector(state => state.doctors);
  const { patients } = useSelector(state => state.patients);
  const { appointments } = useSelector(state => state.appointments);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  const [treatmentData, setTreatmentData] = useState({
    diagnosis: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  useEffect(() => {
    if (initialData) {
      setTreatmentData({
        id: initialData.id,
        diagnosis: initialData.diagnosis || '',
        patientId: initialData.patientId?.toString() || '',
        doctorId: initialData.doctorId?.toString() || '',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        appointmentId: initialData.appointmentId?.toString() || '',
        notes: initialData.notes || '',
        patientName: initialData.patient?.nom || '',
        doctorName: initialData.doctor?.nom || ''
      });
    } else {
      setTreatmentData({
        diagnosis: '',
        patientId: '',
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        appointmentId: '',
        notes: '',
        patientName: '',
        doctorName: ''
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5167/api/Appointments');
        const formattedAppointments = response.data.map(appointment => ({
          ...appointment,
          date: appointment.date.split('T')[0],
          time: appointment.heure,
          status: appointment.statut,
          doctorId: appointment.doctor.id,
          patientId: appointment.patient.id,
          doctorName: appointment.doctor.nom,
          patientName: appointment.patient.nom
        }));
        setAppointmentsList(formattedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5167/api/MedicalRecords');
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    fetchMedicalRecords();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedData = {
      ...(initialData?.id && { id: initialData.id }),
      diagnosis: treatmentData.diagnosis,
      date: treatmentData.date,
      patientId: parseInt(treatmentData.patientId),
      doctorId: parseInt(treatmentData.doctorId),
      appointmentId: parseInt(treatmentData.appointmentId),
      notes: treatmentData.notes || '',
      patient: { nom: treatmentData.patientName },
      doctor: { nom: treatmentData.doctorName }
    };

    onSubmit(formattedData);
  };

  const selectedAppointment = appointmentsList.find(a => a.id === parseInt(treatmentData.appointmentId));

  const getAppointmentDetails = () => {
    if (!selectedAppointment) return '';
    return `${selectedAppointment.notes || 'No notes'}`;
  };

  useEffect(() => {
    if (selectedAppointment) {
      setTreatmentData(prev => ({
        ...prev,
        patientId: selectedAppointment.patientId.toString(),
        doctorId: selectedAppointment.doctorId.toString(),
        date: selectedAppointment.date,
        notes: selectedAppointment.notes || '',
        patientName: selectedAppointment.patientName || '',
        doctorName: selectedAppointment.doctorName || ''
      }));
    }
  }, [treatmentData.appointmentId]);

  const getFilteredAppointments = () => {
    return appointmentsList.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      
      if (initialData && appointment.id === initialData.appointmentId) {
        return true;
      }
      
      const hasTreatment = medicalRecords.some(
        record => record.appointmentId === appointment.id
      );

      return appointmentDate <= today && !hasTreatment;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl px-6 pt-5 pb-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black">
              {initialData ? 'Edit Medical Record' : 'New Medical Record'}
            </h2>
            <p className="mt-1 text-sm text-black">
              {initialData ? 'Edit medical record information' : 'Add a new medical record'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Select Appointment
                  </label>
                  <select
                    value={treatmentData.appointmentId}
                    onChange={(e) => {
                      const selectedAppointment = appointmentsList.find(a => a.id === parseInt(e.target.value));
                      setTreatmentData(prev => ({
                        ...prev,
                        appointmentId: e.target.value,
                        patientId: selectedAppointment?.patientId.toString() || '',
                        doctorId: selectedAppointment?.doctorId.toString() || '',
                        date: selectedAppointment?.date || new Date().toISOString().split('T')[0],
                        patientName: selectedAppointment?.patientName || '',
                        doctorName: selectedAppointment?.doctorName || ''
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-black"
                    required
                  >
                    <option value="">Select an appointment</option>
                    {getFilteredAppointments().length > 0 ? (
                      getFilteredAppointments().map((appointment) => (
                        <option key={appointment.id} value={appointment.id}>
                          {new Date(appointment.date).toLocaleDateString()} {appointment.time} - {appointment.patientName} with Dr. {appointment.doctorName}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No available appointments without treatments</option>
                    )}
                  </select>
                </div>

                <div>
                  <p className="block text-sm font-medium text-black">
                    Patient
                  </p>
                  <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50 text-black">
                    {treatmentData.patientName || 'No patient selected'}
                  </div>
                </div>

                <div>
                  <p className="block text-sm font-medium text-black">
                    Doctor
                  </p>
                  <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50 text-black">
                    {treatmentData.doctorName || 'No doctor selected'}
                  </div>
                </div>

                <div>
                  <p className="block text-sm font-medium text-black">
                    Date
                  </p>
                  <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50 text-black">
                    {treatmentData.date ? new Date(treatmentData.date).toLocaleDateString() : 'No date'}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="block text-sm font-medium text-black">
                    Appointment Notes
                  </p>
                  <div className="mt-1 space-y-4">
                    {selectedAppointment && (
                      <div className="bg-gray-50 p-2 rounded-lg text-sm font-mono whitespace-pre-wrap text-black">
                        {getAppointmentDetails()}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    Diagnosis *
                  </label>
                  <textarea
                    required
                    value={treatmentData.diagnosis}
                    onChange={(e) => setTreatmentData(prev => ({...prev, diagnosis: e.target.value}))}
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 min-h-[100px] text-black"
                    placeholder="Enter diagnosis..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {initialData ? 'Save' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}