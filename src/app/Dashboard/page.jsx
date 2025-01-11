"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AppointmentsCalendar from '@/Components/AppointmentsCalendar';
import MedicalLoading from '@/Components/Custom/MedicalLoading';
import { 
  fetchAppointments,
  setLoading,
  setError 
} from '@/redux/actions/appointmentActions';
import { fetchDoctors } from '@/redux/actions/doctorActions';
import { fetchPatients } from '@/redux/actions/patientActions';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(state => state.appointments || {});
    console.log('appointments : ', appointments);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
          axios.get(`${API_URL}/Appointments`),
          axios.get(`${API_URL}/Doctors`),
          axios.get(`${API_URL}/Patients`)
        ]);
        
        dispatch(fetchAppointments(appointmentsRes.data));
        dispatch(fetchDoctors(doctorsRes.data));
        dispatch(fetchPatients(patientsRes.data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <MedicalLoading />
    </div>
  );
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Existing stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ... existing stats cards ... */}
      </div>

      {/* Add Calendar */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Appointments Calendar</h2>
        <AppointmentsCalendar appointments={appointments} />
      </div>

      {/* Rest of your dashboard content */}
    </div>
  );
}