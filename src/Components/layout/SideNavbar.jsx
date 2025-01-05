"use client";
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import {
  FaAngleLeft,
  FaSignOutAlt,
  FaAngleDown,
  FaAngleUp
} from 'react-icons/fa';
import { useState } from 'react';
import { HiMenu, HiX } from "react-icons/hi";
import navLinks from './navLinks';

const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedLinks, setExpandedLinks] = useState({});

  const toggleSubLinks = (href) => {
    setExpandedLinks(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}

      {isSidebarOpen ? (
        <>
        </>
      ) : (
        <button
          className={`md:hidden fixed top-4 left-4 z-50 p-4 rounded-lg shadow-sm transition-all duration-300 text-black`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <HiX className="text-3xl transition-transform duration-200 transform rotate-180" />
          ) : (
            <HiMenu className="text-3xl transition-transform duration-200 transform rotate-0" />
          )}
        </button>
      )
      }
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col items-start border-r border-blue-200 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-gray-500 p-2 bg-gray-200 rounded-full shadow-lg"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaAngleLeft className="text-xl" />
        </button>
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8 p-4">
          <Image
            className="dark:invert"
            src="/logo-icon.svg"
            alt="Next.js logo"
            width={80}
            height={38}
            priority
          />
          <span className="text-xl font-bold text-blue-600">Hospital</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 my-4 w-full overflow-y-auto hide-scrollbar">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.subLinks ? "#" : link.href}
                className={`flex items-center justify-between p-4 w-full ${pathname === link.href
                  ? 'bg-blue-100'
                  : 'text-gray-500 hover:text-[#3497F9]'
                  }`}
                style={{
                  color: pathname === link.href ? '#3497F9' : '',
                  borderLeft: pathname === link.href ? '4px solid #3497F9' : '',
                }}
                onClick={(e) => {
                  if (link.subLinks) {
                    e.preventDefault();
                    toggleSubLinks(link.href);
                  } else {
                    setIsSidebarOpen(false);
                  }
                }}
              >
                <div className="flex items-center">
                  <link.icon className="text-xl mr-3" />
                  <span>{link.label}</span>
                </div>
                {link.subLinks && (
                  <div className="ml-2">
                    {expandedLinks[link.href] ? (
                      <FaAngleUp className="text-lg" />
                    ) : (
                      <FaAngleDown className="text-lg" />
                    )}
                  </div>
                )}
              </Link>
              
              {/* Sub Links */}
              {link.subLinks && expandedLinks[link.href] && (
                <div className="ml-8">
                  {link.subLinks.map((subLink) => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      className={`flex items-center p-3 w-full ${
                        pathname === subLink.href
                          ? 'bg-blue-100 text-[#3497F9]'
                          : 'text-gray-500 hover:text-[#3497F9]'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <subLink.icon className="text-lg mr-2" />
                      <span className="text-sm">{subLink.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto w-full p-4">
          <Link
            href="/logout"
            className="flex items-center text-gray-500 hover:text-blue-500 space-x-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
