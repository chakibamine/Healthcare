"use client";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import EntityTable from "@/Components/Custom/EntityTable";
import { fetchAppointments, addAppointment } from '@/redux/actions/appointmentActions';

function AppointmentsPage({ appointments, fetchAppointments }) {
  useEffect(() => {
    // Simulate fetching appointments
    const fetchedAppointments = [
      { id: 1, date: "2023-10-01", heure: "10:00", statut: "Confirmed" },
      { id: 2, date: "2023-10-02", heure: "11:00", statut: "Pending" },
    ];
    fetchAppointments(fetchedAppointments);
  }, [fetchAppointments]);

  return (
    <EntityTable
      data={appointments}
      columns={[
        { key: "id", title: "ID" },
        { key: "date", title: "Date" },
        { key: "heure", title: "Heure" },
        { key: "statut", title: "Statut" },
      ]}
      title="Rendez-vous"
    />
  );
}

const mapStateToProps = state => ({
  appointments: state.appointments.appointments
});

export default connect(
  mapStateToProps,
  { fetchAppointments, addAppointment }
)(AppointmentsPage); 