"use client";
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export default function AddTreatmentModal({ isOpen, onClose, onSubmit, initialData }) {
  const { doctors } = useSelector(state => state.doctors || { doctors: [] });
  const { patients } = useSelector(state => state.patients || { patients: [] });
  const { appointments } = useSelector(state => state.appointments || { appointments: [] });

  const [treatmentData, setTreatmentData] = useState({
    diagnosis: '',
    patientId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    appointmentId: '',
    notes: ''
  });
  
  useEffect(() => {
    if (initialData) {
      const appointment = appointments.find(a => a.id === initialData.appointmentId);
      
      setTreatmentData({
        ...initialData,
        date: appointment ? new Date(appointment.date).toISOString().split('T')[0] 
                        : new Date().toISOString().split('T')[0],
        patientId: appointment?.patientId || '',
        doctorId: appointment?.doctorId || '',
        appointmentId: initialData.appointmentId || '',
        diagnosis: initialData.diagnosis || '',
        notes: initialData.notes || ''
      });
    } else {
      setTreatmentData({
        diagnosis: '',
        patientId: '',
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        appointmentId: '',
        notes: ''
      });
    }
  }, [initialData, appointments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the data according to the MedicalRecord model
    const formattedData = {
      diagnosis: treatmentData.diagnosis,
      date: treatmentData.date,
      patientId: parseInt(treatmentData.patientId),
      doctorId: parseInt(treatmentData.doctorId),
      notes: treatmentData.notes,
    };

    console.log('Submitting data:', formattedData);
    onSubmit(formattedData);
  };

  // Get the selected appointment details
  const selectedAppointment = appointments.find(a => a.id === parseInt(treatmentData.appointmentId));
  const selectedPatient = patients.find(p => p.id === selectedAppointment?.patientId);
  const selectedDoctor = doctors.find(d => d.id === selectedAppointment?.doctorId);

  const getAppointmentDetails = () => {
    if (!selectedAppointment) return '';
    return `
      ${selectedAppointment.notes || 'No notes'}`;
  };

  // Update notes when appointment changes
  useEffect(() => {
    if (selectedAppointment) {
      setTreatmentData(prev => ({
        ...prev,
        patientId: selectedAppointment.patientId.toString(),
        doctorId: selectedAppointment.doctorId.toString(),
        date: new Date(selectedAppointment.date).toISOString().split('T')[0],
        notes: selectedAppointment.notes || ''
      }));
    }
  }, [treatmentData.appointmentId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        {/* Modal panel */}
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
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <p className="block text-sm font-medium text-black">
                    Patient
                  </p>
                  <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50 text-black">
                    {patients.find(p => p.id === parseInt(treatmentData.patientId))?.nom || 'No patient selected'}
                  </div>
                </div>

                <div>
                  <p className="block text-sm font-medium text-black">
                    Doctor
                  </p>
                  <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50 text-black">
                    {doctors.find(d => d.id === parseInt(treatmentData.doctorId))?.nom || 'No doctor selected'}
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

                <div>
                  <p className="block text-sm font-medium text-black">
                    Appointment
                  </p>
                  <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 text-black">
                    {selectedAppointment ? 
                      `${new Date(selectedAppointment.date).toLocaleDateString()} - ${
                        patients.find(p => p.id === selectedAppointment.patientId)?.nom
                      }` : 
                      'No appointment selected'
                    }
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <p className="block text-sm font-medium text-black">
                    Notes
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
                  <p className="block text-sm font-medium text-black">
                    Diagnosis
                  </p>
                  <textarea
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