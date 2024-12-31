"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EntityTable from "@/Components/Custom/EntityTable";
import AddRoomModal from './AddRoomModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';

const initialRooms = [
  { id: 1, nom: "Room A", type: "Consultation", capacity: 4, availability: true },
  { id: 2, nom: "Room B", type: "Surgery", capacity: 6, availability: true },
];

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { rooms } = useSelector(state => state.room);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_ROOMS', payload: initialRooms });
  }, [dispatch]);

  const handleAddRoom = (newRoom) => {
    dispatch({ 
      type: 'ADD_ROOM', 
      payload: { ...newRoom, id: Date.now() }
    });
    setIsModalOpen(false);
  };

  const handleEditRoom = (updatedRoom) => {
    dispatch({ 
      type: 'UPDATE_ROOM', 
      payload: updatedRoom 
    });
    setEditingRoom(null);
    setIsModalOpen(false);
  };

  const handleDeleteRoom = (roomId) => {
    const roomToDelete = rooms.find(room => room.id === roomId);
    setDeletingRoom(roomToDelete);
  };

  const confirmDelete = () => {
    if (deletingRoom) {
      dispatch({ 
        type: 'DELETE_ROOM', 
        payload: deletingRoom.id 
      });
      setDeletingRoom(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setEditingRoom(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Ajouter une salle
          </button>
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          <EntityTable
            data={rooms}
            columns={[
              { key: "id", title: "ID" },
              { key: "nom", title: "Room Name" },
              { 
                key: "type", 
                title: "Room Type",
                render: (value) => (
                  <span className="font-medium text-gray-700">
                    {value}
                  </span>
                )
              },
              { 
                key: "capacity", 
                title: "Capacity",
                render: (value) => (
                  <div className="flex items-center">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {value} Lits
                    </span>
                  </div>
                )
              },
              { 
                key: "availability", 
                title: "Status",
                render: (value) => (
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    value 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {value ? '● Disponible' : '● Occupée'}
                  </span>
                )
              },
            ]}
            title="Gestion des salles"
            onEdit={(room) => {
              setEditingRoom(room);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteRoom}
          />
        </div>
      </div>

      <AddRoomModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRoom(null);
        }}
        onSubmit={editingRoom ? handleEditRoom : handleAddRoom}
        initialData={editingRoom}
      />

      <ConfirmationModal
        isOpen={!!deletingRoom}
        onClose={() => setDeletingRoom(null)}
        onConfirm={confirmDelete}
        title="Supprimer une salle"
        message={`Êtes-vous sûr de vouloir supprimer la salle ${deletingRoom?.nom} ?`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
}