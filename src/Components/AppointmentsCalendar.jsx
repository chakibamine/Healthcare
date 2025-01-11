"use client";
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { isSameDay } from 'date-fns';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function AppointmentsCalendar({ appointments }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);

  const events = appointments.map(appointment => ({
    ...appointment,
    title: `${appointment.patientId} - ${appointment.notes}`,
    start: new Date(appointment.date),
    end: new Date(new Date(appointment.date).getTime() + 60 * 60 * 1000),
  }));

  const handleEventClick = (event) => {
    setSelectedAppointment(event);
    setShowCalendar(false);
  };

  const handleDayClick = (date) => {
    const appointmentsOnDay = events.filter(event => 
      isSameDay(new Date(event.start), new Date(date))
    );
    
    if (appointmentsOnDay.length > 0) {
      setSelectedDayAppointments(appointmentsOnDay);
      setShowCalendar(false);
    }
  };

  const handleBack = () => {
    setSelectedAppointment(null);
    setSelectedDayAppointments(null);
    setShowCalendar(true);
  };

  if (showCalendar) {
    return (
      <div className="h-[600px] bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg border border-blue-100">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={['month', 'week', 'day']}
          defaultView="month"
          onSelectEvent={handleEventClick}
          onSelectSlot={({ start }) => handleDayClick(start)}
          selectable={true}
          className="rounded-xl overflow-hidden shadow-inner"
        />
      </div>
    );
  }

  if (selectedAppointment) {
    return (
      <div className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-2xl shadow-lg border border-indigo-100">
        <button 
          onClick={handleBack}
          className="mb-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          ← Back to Calendar
        </button>
        <h2 className="text-2xl font-bold mb-6 text-indigo-900">Appointment Details</h2>
        <div className="space-y-4 text-gray-700">
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            <p className="flex items-center">
              <span className="font-semibold text-indigo-900 w-32">Patient ID:</span> 
              <span className="text-gray-700">{selectedAppointment.patientId}</span>
            </p>
          </div>
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            <p className="flex items-center">
              <span className="font-semibold text-indigo-900 w-32">Date:</span>
              <span className="text-gray-700">{format(selectedAppointment.start, 'PPP')}</span>
            </p>
          </div>
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            <p className="flex items-center">
              <span className="font-semibold text-indigo-900 w-32">Time:</span>
              <span className="text-gray-700">{format(selectedAppointment.start, 'p')}</span>
            </p>
          </div>
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            <p className="flex items-center">
              <span className="font-semibold text-indigo-900 w-32">Doctor ID:</span>
              <span className="text-gray-700">{selectedAppointment.doctorId}</span>
            </p>
          </div>
          {selectedAppointment.notes && (
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
              <p className="flex items-center">
                <span className="font-semibold text-indigo-900 w-32">Notes:</span>
                <span className="text-gray-700">{selectedAppointment.notes}</span>
              </p>
            </div>
          )}
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
            <p className="flex items-center">
              <span className="font-semibold text-indigo-900 w-32">Status:</span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                selectedAppointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                selectedAppointment.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {selectedAppointment.status}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedDayAppointments) {
    return (
      <div className="bg-gradient-to-br from-white to-violet-50 p-8 rounded-2xl shadow-lg border border-violet-100">
        <button 
          onClick={handleBack}
          className="mb-6 px-6 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          ← Back to Calendar
        </button>
        <h2 className="text-2xl font-bold mb-6 text-violet-900">
          Appointments on {format(selectedDayAppointments[0].start, 'PPP')}
        </h2>
        <div className="space-y-4">
          {selectedDayAppointments.map((appointment, index) => (
            <div key={index} className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="grid grid-cols-2 gap-4">
                <p className="flex items-center">
                  <span className="font-semibold text-violet-900 w-24">Time:</span>
                  <span className="text-gray-700">{format(appointment.start, 'p')}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-violet-900 w-24">Patient ID:</span>
                  <span className="text-gray-700">{appointment.patientId}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-violet-900 w-24">Doctor ID:</span>
                  <span className="text-gray-700">{appointment.doctorId}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-violet-900 w-24">Status:</span>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    appointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    appointment.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {appointment.status}
                  </span>
                </p>
              </div>
              {appointment.notes && (
                <p className="mt-4 flex items-center">
                  <span className="font-semibold text-violet-900 w-24">Notes:</span>
                  <span className="text-gray-700">{appointment.notes}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}