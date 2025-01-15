"use client";
import { useState } from 'react';
import SideNavbar from './SideNavbar';
import Navbar from './Navbar';
import BottomNav from './mobile/BottomNav';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - hidden on mobile, visible on desktop */}
      <div className="hidden md:block">
        <SideNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 pb-20 md:pb-0">
          {children}
        </main>

        {/* Bottom Navigation - visible only on mobile */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
} 