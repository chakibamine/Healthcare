"use client";
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function AddRoomModal({ isOpen, onClose, onSubmit, initialData }) {
  const [roomData, setRoomData] = useState({
    nom: '',
    type: '',
    capacity: '',
    availability: true
  });

  useEffect(() => {
    if (initialData) {
      setRoomData(initialData);
    } else {
      setRoomData({
        nom: '',
        type: '',
        capacity: '',
        availability: true
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...roomData,
      capacity: parseInt(roomData.capacity),
      id: roomData.id || Date.now()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Room' : 'Add New Room'}
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
              Room Name
            </label>
            <input
              type="text"
              required
              value={roomData.nom}
              onChange={(e) => setRoomData({ ...roomData, nom: e.target.value })}
              className="form-input"
              placeholder="Enter room name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              required
              value={roomData.type}
              onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
              className="form-input"
            >
              <option value="">Select room type</option>
              <option value="Consultation">Consultation</option>
              <option value="Surgery">Surgery</option>
              <option value="Emergency">Emergency</option>
              <option value="Recovery">Recovery</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              required
              min="1"
              value={roomData.capacity}
              onChange={(e) => setRoomData({ ...roomData, capacity: e.target.value })}
              className="form-input"
              placeholder="Enter room capacity"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="availability"
              checked={roomData.availability}
              onChange={(e) => setRoomData({ ...roomData, availability: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="availability" className="ml-2 text-sm text-gray-700">
              Available for use
            </label>
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
              {initialData ? 'Save Changes' : 'Add Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 