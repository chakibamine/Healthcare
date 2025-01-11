"use client";
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';

export default function AddAppointmentModal({ isOpen, onClose, onSubmit, initialData }) {
  const doctors = useSelector(state => state.doctors.doctors);
  const patients = useSelector(state => state.patients.patients);
  
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    heure: '',
    statut: 'Pending',
    notes: '',
    patientId: '',
    doctorId: ''
  });

  useEffect(() => {
    if (initialData) {
      setAppointmentData({
        ...initialData,
        date: initialData.date.split('T')[0] // Format date for input
      });
    } else {
      setAppointmentData({
        date: '',
        heure: '',
        statut: 'Pending',
        notes: '',
        patientId: '',
        doctorId: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedData = {
      ...(initialData?.id && { id: initialData.id }),
      ...appointmentData,
      patientId: parseInt(appointmentData.patientId),
      doctorId: parseInt(appointmentData.doctorId)
    };

    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={appointmentData.date}
              onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              required
              value={appointmentData.heure}
              onChange={(e) => setAppointmentData({ ...appointmentData, heure: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              required
              value={appointmentData.statut}
              onChange={(e) => setAppointmentData({ ...appointmentData, statut: e.target.value })}
              className="form-input"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient
            </label>
            <select
              required
              value={appointmentData.patientId}
              onChange={(e) => setAppointmentData({ ...appointmentData, patientId: e.target.value })}
              className="form-input"
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor
            </label>
            <select
              required
              value={appointmentData.doctorId}
              onChange={(e) => setAppointmentData({ ...appointmentData, doctorId: e.target.value })}
              className="form-input"
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={appointmentData.notes}
              onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
              className="form-input"
              rows="3"
              placeholder="Add any notes..."
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {initialData ? 'Save Changes' : 'Add Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 