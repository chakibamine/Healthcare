"use client";
import Link from 'next/link';
import Image from "next/image";
import { FaAngleDown, FaSignOutAlt } from 'react-icons/fa';
import { HiX } from "react-icons/hi";
import navLinks from '../navLinks';
import { usePathname, useRouter } from 'next/navigation';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 h-screen bg-white shadow-lg transform ${
          isMenuOpen ? 'translate-y-0' : 'translate-y-full'
        } transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 p-2 bg-gray-200 rounded-full shadow-lg"
          onClick={() => setIsMenuOpen(false)} // Close the menu
        >
          <FaAngleDown className="text-xl" />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2 mb-4 p-4 w-full justify-center border-b">
          <Image
            src="/logo-icon.svg"
            alt="Hospital Logo"
            width={80}
            height={38}
            priority
          />
          <span className="text-xl font-bold text-blue-600">Hospital</span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 my-4 px-4">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(link.href);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center p-4 rounded-lg ${
                  pathname === link.href 
                    ? 'bg-blue-100 text-blue-500' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <link.icon className="text-xl mr-3" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <Link
            href="/logout"
            className="flex items-center text-gray-600 hover:text-blue-600 space-x-2"
            onClick={() => setIsMenuOpen(false)} // Close menu on logout
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
