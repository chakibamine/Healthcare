"use client";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import EntityTable from "@/Components/Custom/EntityTable";
import { fetchPatients, addPatient, updatePatient, deletePatient } from '@/redux/actions/patientActions';

function PatientsPage({ patients, fetchPatients, updatePatient, deletePatient }) {
  useEffect(() => {
    // Simulate fetching patients
    const fetchedPatients = [
      { 
        id: 1, 
        nom: "Alice Brown", 
        adresse: "123 Main St",
        telephone: "+1234567890",
        email: "alice@example.com",
        dateNaissance: "1990-01-01",
        genre: "F"
      },
      { 
        id: 2, 
        nom: "Bob Smith", 
        adresse: "456 Elm St",
        telephone: "+0987654321",
        email: "bob@example.com",
        dateNaissance: "1985-05-15",
        genre: "M"
      },
    ];
    fetchPatients(fetchedPatients);
  }, [fetchPatients]);

  const handleActionClick = (key, patient) => {
    if (key === "edit") {
      updatePatient(patient);
    } else if (key === "delete") {
      deletePatient(patient.id);
    }
  };

  return (
    <EntityTable
      data={patients}
      columns={[
        { key: "id", title: "ID" },
        { key: "nom", title: "Nom" },
        { key: "adresse", title: "Adresse" },
        { key: "telephone", title: "Téléphone" },
        { key: "email", title: "Email" },
        { key: "dateNaissance", title: "Date de Naissance" },
        { key: "genre", title: "Genre" },
      ]}
      title="Patients"
      actions={[
        { key: "edit", label: "Modifier", className: "text-blue-500" },
        { key: "delete", label: "Supprimer", className: "text-red-500" },
      ]}
      onActionClick={handleActionClick}
      searchableKeys={["nom", "email", "telephone"]}
    />
  );
}

const mapStateToProps = state => ({
  patients: state.patients.patients
});

export default connect(
  mapStateToProps,
  { fetchPatients, addPatient, updatePatient, deletePatient }
)(PatientsPage); 