"use client";
import { useEffect } from 'react';
import { connect } from 'react-redux';
import CustomTable from '@/Components/Custom/CustomTable';
import { fetchDoctors, addDoctor, updateDoctor, deleteDoctor } from '@/redux/actions/doctorActions';

function DoctorPage({ doctors, fetchDoctors, updateDoctor }) {
  useEffect(() => {
    // Simulate fetching doctors
    const fetchedDoctors = [
      {
        id: 1,
        name: "John Michael",
        email: "john@creative-tim.com",
        role: "Manager",
        department: "Organization",
        status: "online",
        employed: "23/04/18",
        avatar: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      },
      // Add more doctors...
    ];
    fetchDoctors(fetchedDoctors);
  }, [fetchDoctors]);

  const handleActionClick = (key, doctor) => {
    if (key === "edit") {
      updateDoctor(doctor);
    }
  };

  return (
    <CustomTable
      data={doctors}
      columns={[
        {
          key: "avatar",
          title: "Avatar",
          render: (value) => (
            <img src={value} alt="Avatar" className="h-9 w-9 rounded-full" />
          ),
        },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "role", title: "Role" },
        { key: "status", title: "Status" },
      ]}
      actions={[
        { key: "edit", label: "Edit", className: "text-green-500" },
      ]}
      onActionClick={handleActionClick}
      searchableKeys={["name", "email", "role"]}
    />
  );
}

const mapStateToProps = state => ({
  doctors: state.doctors.doctors
});

export default connect(
  mapStateToProps,
  { fetchDoctors, addDoctor, updateDoctor, deleteDoctor }
)(DoctorPage);
