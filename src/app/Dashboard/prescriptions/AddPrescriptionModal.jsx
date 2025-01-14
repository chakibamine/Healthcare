"use client";
import { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function AddPrescriptionModal({ isOpen, onClose, onSubmit, initialData }) {
  const [prescriptionData, setPrescriptionData] = useState({
    description: '',
    medicaments: '',
    posologie: '',
    duration: 0,
    sideEffects: [],
    medicalRecordId: ''
  });

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [existingPrescriptions, setExistingPrescriptions] = useState([]);
  const [newSideEffect, setNewSideEffect] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medicalRecordsRes, prescriptionsRes] = await Promise.all([
          axios.get('http://localhost:5167/api/MedicalRecords'),
          axios.get('http://localhost:5167/api/Prescriptions')
        ]);
        setMedicalRecords(medicalRecordsRes.data);
        setExistingPrescriptions(prescriptionsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getFilteredMedicalRecords = () => {
    return medicalRecords.filter(record => {
      if (initialData && record.id === initialData.medicalRecordId) {
        return true;
      }
      
      const hasPrescription = existingPrescriptions.some(
        prescription => prescription.medicalRecordId === record.id
      );

      return !hasPrescription;
    });
  };

  useEffect(() => {
    if (initialData) {
      setPrescriptionData({
        ...initialData,
        sideEffects: initialData.sideEffects || []
      });
    } else {
      setPrescriptionData({
        description: '',
        medicaments: '',
        posologie: '',
        duration: 0,
        sideEffects: [],
        medicalRecordId: ''
      });
    }
  }, [initialData]);

  const handleAddSideEffect = () => {
    if (newSideEffect.trim()) {
      setPrescriptionData(prev => ({
        ...prev,
        sideEffects: [...prev.sideEffects, newSideEffect.trim()]
      }));
      setNewSideEffect('');
    }
  };

  const handleRemoveSideEffect = (index) => {
    setPrescriptionData(prev => ({
      ...prev,
      sideEffects: prev.sideEffects.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prescriptionData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl px-6 pt-5 pb-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {initialData ? 'Edit Prescription' : 'New Prescription'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medical Record
                  </label>
                  <select
                    value={prescriptionData.medicalRecordId}
                    onChange={(e) => setPrescriptionData(prev => ({
                      ...prev,
                      medicalRecordId: parseInt(e.target.value)
                    }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3"
                    required
                  >
                    <option value="">Select Medical Record</option>
                    {getFilteredMedicalRecords().length > 0 ? (
                      getFilteredMedicalRecords().map((record) => (
                        <option key={record.id} value={record.id}>
                          {record.diagnosis} - {record.patient?.nom}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No available medical records without prescriptions</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={prescriptionData.description}
                    onChange={(e) => setPrescriptionData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medications
                  </label>
                  <textarea
                    value={prescriptionData.medicaments}
                    onChange={(e) => setPrescriptionData(prev => ({
                      ...prev,
                      medicaments: e.target.value
                    }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Posology
                  </label>
                  <textarea
                    value={prescriptionData.posologie}
                    onChange={(e) => setPrescriptionData(prev => ({
                      ...prev,
                      posologie: e.target.value
                    }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={prescriptionData.duration}
                    onChange={(e) => setPrescriptionData(prev => ({
                      ...prev,
                      duration: parseInt(e.target.value)
                    }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3"
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Side Effects
                  </label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={newSideEffect}
                      onChange={(e) => setNewSideEffect(e.target.value)}
                      className="block flex-1 rounded-md border border-gray-300 py-2 px-3"
                      placeholder="Add side effect"
                    />
                    <button
                      type="button"
                      onClick={handleAddSideEffect}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <FiPlus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {prescriptionData.sideEffects.map((effect, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span>{effect}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSideEffect(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
              >
                {initialData ? 'Save Changes' : 'Create Prescription'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 