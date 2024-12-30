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
  // Dashboard
  { href: '/Dashboard', label: 'Dashboard', icon: AiFillDashboard },
  
  // Gestion des Salles
  { href: '/Dashboard/rooms', label: 'Salles', icon: FaHospital },
  
  // Personnel Medical
  {
    href: '/Dashboard/medical-staff',
    label: 'Personnel Medical',
    icon: FaUserMd,
    subLinks: [
      { href: '/Dashboard/medical-staff/doctors', label: 'Docteurs', icon: FaUserMd },
      { href: '/Dashboard/medical-staff/secretaries', label: 'Secrétaires', icon: FaUserNurse },
      { href: '/Dashboard/medical-staff/medicine-manager', label: 'Responsable Médicaments', icon: FaUserTie },
    ]
  },
  
  // Gestion des Patients
  { href: '/Dashboard/patients', label: 'Patients', icon: FaUserInjured },
  
  // Rendez-vous
  { href: '/Dashboard/appointments', label: 'Rendez-vous', icon: FaCalendar },
  
  // Traitements
  { href: '/Dashboard/treatments', label: 'Traitements', icon: FaNotesMedical },
  
  // Gestion des Médicaments
  {
    href: '/Dashboard/medicine',
    label: 'Médicaments',
    icon: FaPills,
    subLinks: [
      { href: '/Dashboard/medicine/stock', label: 'Stock Médicaments', icon: FaWarehouse },
      { href: '/Dashboard/medicine/inventory', label: 'Inventaire', icon: FaClipboardList },
    ]
  },
  
  // Communication
  { href: '/Dashboard/messages', label: 'Messages', icon: FaEnvelope },
  
  // Administration
  { href: '/Dashboard/settings', label: 'Paramètres', icon: FaCog },
];

export default navLinks;
