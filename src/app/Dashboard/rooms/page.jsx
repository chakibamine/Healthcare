"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EntityTable from "@/Components/Custom/EntityTable";
import AddRoomModal from './AddRoomModal';
import ConfirmationModal from '@/Components/Custom/ConfirmationModal';
import { FiPlus } from 'react-icons/fi';
import MedicalLoading from '@/Components/Custom/MedicalLoading';
import { 
  fetchRooms, 
  addRoom, 
  updateRoom, 
  deleteRoom,
  setLoading,
  setError 
} from '@/redux/actions/roomActions';
import { fetchDoctors } from '@/redux/actions/doctorActions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector(state => state.rooms || {});
  const { doctors } = useSelector(state => state.doctors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const [roomsResponse, doctorsResponse] = await Promise.all([
          axios.get(`${API_URL}/Rooms`),
          axios.get(`${API_URL}/Doctors`)
        ]);
        
        dispatch(fetchRooms(roomsResponse.data));
        dispatch(fetchDoctors(doctorsResponse.data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddRoom = async (newRoom) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${API_URL}/Rooms`, newRoom);
      dispatch(addRoom(data));
      setIsModalOpen(false);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditRoom = async (updatedRoom) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.put(`${API_URL}/Rooms/${updatedRoom.id}`, updatedRoom);
      dispatch(updateRoom(data));
      setEditingRoom(null);
      setIsModalOpen(false);
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteRoom = (roomId) => {
    setDeletingRoom(rooms.find(room => room.id === roomId));
  };

  const confirmDelete = async () => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`${API_URL}/Rooms/${deletingRoom.id}`);
      dispatch(deleteRoom(deletingRoom.id));
      setDeletingRoom(null);
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
              setEditingRoom(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Add Room
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
                title: "Type",
                render: (value) => (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {value}
                  </span>
                )
              },
              { 
                key: "capacity", 
                title: "Capacity",
                render: (value) => (
                  <span className="font-medium text-gray-700">
                    {value} persons
                  </span>
                )
              },
              { 
                key: "availability", 
                title: "Status",
                render: (value) => (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    value ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {value ? 'Available' : 'Occupied'}
                  </span>
                )
              },
              { 
                key: "doctorId", 
                title: "Assigned Doctor",
                render: (value) => {
                  const doctor = doctors.find(d => d.id === value);
                  return doctor ? (
                    <span className="text-gray-700">{doctor.nom}</span>
                  ) : (
                    <span className="text-gray-400">Not assigned</span>
                  );
                }
              },
            ]}
            title="Room Management"
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
        title="Delete Room"
        message={`Are you sure you want to delete Room ${deletingRoom?.nom}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}