"use client";
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function AddMedicamentModal({ isOpen, onClose, onSubmit, initialData }) {
  const [medicamentData, setMedicamentData] = useState({
    nom: '',
    quantite: '',
    dateExpiration: '',
    storageLocation: '',
    isCritical: false
  });

  useEffect(() => {
    if (initialData) {
      setMedicamentData(initialData);
    } else {
      setMedicamentData({
        nom: '',
        quantite: '',
        dateExpiration: '',
        storageLocation: '',
        isCritical: false
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...medicamentData,
      quantite: parseInt(medicamentData.quantite),
      id: medicamentData.id || Date.now()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Modifier Médicament' : 'Ajouter Médicament'}
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
              Nom du médicament
            </label>
            <input
              type="text"
              required
              value={medicamentData.nom}
              onChange={(e) => setMedicamentData({ ...medicamentData, nom: e.target.value })}
              className="form-input"
              placeholder="Entrer le nom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantité
            </label>
            <input
              type="number"
              required
              min="0"
              value={medicamentData.quantite}
              onChange={(e) => setMedicamentData({ ...medicamentData, quantite: e.target.value })}
              className="form-input"
              placeholder="Entrer la quantité"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date d'expiration
            </label>
            <input
              type="date"
              required
              value={medicamentData.dateExpiration}
              onChange={(e) => setMedicamentData({ ...medicamentData, dateExpiration: e.target.value })}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emplacement
            </label>
            <input
              type="text"
              required
              value={medicamentData.storageLocation}
              onChange={(e) => setMedicamentData({ ...medicamentData, storageLocation: e.target.value })}
              className="form-input"
              placeholder="Entrer l'emplacement"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isCritical"
              checked={medicamentData.isCritical}
              onChange={(e) => setMedicamentData({ ...medicamentData, isCritical: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="isCritical" className="ml-2 text-sm text-gray-700">
              Stock critique
            </label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {initialData ? 'Sauvegarder' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 