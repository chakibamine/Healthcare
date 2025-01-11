// navLinks.js
import { AiFillDashboard } from "react-icons/ai";
import {
  FaUser,
  FaCalendar,
  FaUserMd,
  FaEnvelope,
  FaBook,
  FaPills,
  FaCog,
  FaUserInjured,
  FaClipboardList,
  FaHospital,
  FaNotesMedical,
  FaUserNurse,
  FaWarehouse,
  FaUserTie,
} from "react-icons/fa";

const navLinks = [
  // Dashboard - visible to all
  { 
    href: '/Dashboard', 
    label: 'Dashboard', 
    icon: AiFillDashboard,
    roles: ['Doctor', 'Secretary'] 
  },
  
  // Gestion des Salles - visible to all
  { 
    href: '/Dashboard/rooms', 
    label: 'Salles', 
    icon: FaHospital,
    roles: ['Doctor', 'Secretary']
  },

  { 
    href: '/Dashboard/medical-staff/doctors', 
    label: 'Docteurs', 
    icon: FaUserMd, 
    roles: ['Doctor']
  },
  // Personnel Medical - only visible to doctors
  // {
  //   href: '/Dashboard/medical-staff',
  //   label: 'Personnel Medical',
  //   icon: FaUserMd,
  //   roles: ['Doctor'],
  //   subLinks: [
  //     { href: '/Dashboard/medical-staff/doctors', label: 'Docteurs', icon: FaUserMd },
  //     { href: '/Dashboard/medical-staff/secretaries', label: 'Secrétaires', icon: FaUserNurse },
  //     //{ href: '/Dashboard/medical-staff/medicine-manager', label: 'Responsable Médicaments', icon: FaUserTie },
  //   ]
  // },
  
  // Gestion des Patients - visible to all
  { 
    href: '/Dashboard/patients', 
    label: 'Patients', 
    icon: FaUserInjured,
    roles: ['Doctor', 'Secretary']
  },
  
  // Rendez-vous - visible to all
  { 
    href: '/Dashboard/appointments', 
    label: 'Rendez-vous', 
    icon: FaCalendar,
    roles: ['Doctor', 'Secretary', 'Patient']
  },
  
  // Traitements - only visible to doctors
  { 
    href: '/Dashboard/treatments', 
    label: 'Traitements', 
    icon: FaNotesMedical,
    roles: ['Doctor']
  },

  // Stock Médicaments - only visible to doctors
  { 
    href: '/Dashboard/medicine/stock', 
    label: 'Stock Médicaments', 
    icon: FaPills,
    roles: ['Doctor']
  },
  
  // Messages - visible to all
  { 
    href: '/Dashboard/messages', 
    label: 'Messages', 
    icon: FaEnvelope,
    roles: ['Doctor', 'Secretary', 'Patient']
  },
  
  // Administration - only visible to doctors
  // { 
  //   href: '/Dashboard/settings', 
  //   label: 'Paramètres', 
  //   icon: FaCog,
  //   roles: ['Doctor']
  // },
];

export default navLinks;
