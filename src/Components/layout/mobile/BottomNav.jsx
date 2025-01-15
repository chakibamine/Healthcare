"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaUserInjured, 
  FaEnvelope, 
  FaBars,
  FaPrescriptionBottleAlt,
  FaNotesMedical
} from 'react-icons/fa';
import MobileMenu from './MobileMenu';

export default function BottomNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { 
      name: 'Home', 
      icon: FaHome, 
      path: '/Dashboard',
      roles: ['Doctor', 'Secretary', 'Patient']
    },
    { 
      name: 'Appointments', 
      icon: FaCalendarAlt, 
      path: '/Dashboard/appointments',
      roles: ['Doctor', 'Secretary', 'Patient']
    },
    { 
      name: 'Patients', 
      icon: FaUserInjured, 
      path: '/Dashboard/patients',
      roles: ['Doctor', 'Secretary']
    },
    { 
      name: 'Prescriptions', 
      icon: FaPrescriptionBottleAlt, 
      path: '/Dashboard/prescriptions',
      roles: ['Doctor']
    },
    { 
      name: 'Messages', 
      icon: FaEnvelope, 
      path: '/Dashboard/messages',
      roles: ['Doctor', 'Secretary', 'Patient']
    },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg py-2 md:hidden z-50">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleNavigation(tab.path)}
              className="flex flex-col items-center space-y-1 px-2 py-1"
            >
              <div className={`p-2 rounded-full transition-colors duration-200 ${
                pathname === tab.path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}>
                <tab.icon className="h-5 w-5" />
              </div>
              <span className={`text-xs ${
                pathname === tab.path
                  ? 'text-blue-500 font-medium'
                  : 'text-gray-500'
              }`}>
                {tab.name}
              </span>
            </button>
          ))}
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center space-y-1 px-2 py-1"
          >
            <div className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors duration-200">
              <FaBars className="h-5 w-5" />
            </div>
            <span className="text-xs text-gray-500">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
