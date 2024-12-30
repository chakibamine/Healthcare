"use client";
import React from 'react'
import AppointmentTable from './AppointmentTable';
import EmployeeList from './List';

export default function Admin() {
  return (
    <div className="min-h-full">
      <EmployeeList />
    </div>
  )
}
