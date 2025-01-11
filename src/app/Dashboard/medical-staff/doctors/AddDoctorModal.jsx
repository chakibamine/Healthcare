"use client";
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function DoctorModal({ isOpen, onClose, onSubmit, initialData }) {
  // Initialize state with default values
  const [doctorData, setDoctorData] = useState({
    nom: '',
    specialite: '',
    experience: '',
    rating: '',
    Email: ''
  });

  // Reset form when modal opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      // If initialData is provided, use it to pre-fill the form
      setDoctorData({
        nom: initialData.nom || '',
        specialite: initialData.specialite || '',
        experience: initialData.experience || '',
        rating: initialData.rating || '',
        Email: initialData.Email || ''
      });
    } else {
      // If no initialData, reset the form to default values
      setDoctorData({
        nom: '',
        specialite: '',
        experience: '',
        rating: '',
        Email: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the formatted doctor data from the state
    const formattedData = {
      ...(initialData?.id && { id: initialData.id }), // Include ID if editing
      nom: doctorData.nom,
      specialite: doctorData.specialite,
      experience: parseInt(doctorData.experience, 10),
      rating: parseFloat(doctorData.rating),
      Email: doctorData.Email
    };

    // Submit the formatted data
    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Doctor' : 'Add New Doctor'}
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
              value={doctorData.nom}
              onChange={(e) => setDoctorData({ ...doctorData, nom: e.target.value })}
              className="form-input"
              placeholder="Enter doctor's name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={doctorData.Email}
              onChange={(e) => setDoctorData({ ...doctorData, Email: e.target.value })}
              className="form-input"
              placeholder="Enter doctor's email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speciality
            </label>
            <select
              required
              value={doctorData.specialite}
              onChange={(e) => setDoctorData({ ...doctorData, specialite: e.target.value })}
              className="form-input"
            >
              <option value="">Select speciality</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              required
              min="0"
              max="50"
              value={doctorData.experience}
              onChange={(e) => setDoctorData({ ...doctorData, experience: e.target.value })}
              className="form-input"
              placeholder="Enter years of experience"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <input
              type="number"
              required
              min="0"
              max="5"
              step="0.1"
              value={doctorData.rating}
              onChange={(e) => setDoctorData({ ...doctorData, rating: e.target.value })}
              className="form-input"
              placeholder="Enter rating (0-5)"
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
              {initialData ? 'Save Changes' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}