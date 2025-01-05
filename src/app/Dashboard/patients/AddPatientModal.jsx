"use client";
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function AddPatientModal({ isOpen, onClose, onSubmit, initialData }) {
  const [patientData, setPatientData] = useState({
    nom: '',
    adresse: '',
    phoneNumber: '',
    email: ''
  });

  useEffect(() => {
    if (initialData) {
      setPatientData(initialData);
    } else {
      setPatientData({
        nom: '',
        adresse: '',
        phoneNumber: '',
        email: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedData = {
      ...(initialData?.id && { id: initialData.id }),
      ...patientData
    };

    console.log('Submitting patient data:', formattedData);
    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={patientData.nom}
              onChange={(e) => setPatientData({ ...patientData, nom: e.target.value })}
              className="form-input"
              placeholder="Enter patient's full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              required
              value={patientData.adresse}
              onChange={(e) => setPatientData({ ...patientData, adresse: e.target.value })}
              className="form-input"
              placeholder="Enter address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={patientData.phoneNumber}
              onChange={(e) => setPatientData({ ...patientData, phoneNumber: e.target.value })}
              className="form-input"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={patientData.email}
              onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
              className="form-input"
              placeholder="Enter email address"
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
              {initialData ? 'Save Changes' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 