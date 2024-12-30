"use client";
import { useState, useEffect } from "react";
import Navbar from "@/Components/layout/Navbar";
import Sidebar from "@/Components/layout/SideNavbar";
import BottomNav from "@/Components/layout/mobile/BottomNav";

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setIsMobile(true);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setIsMobile(true);
    }
  }, []);

  return (
    <section className="flex min-h-screen bg-gray-50">
      {isMobile ? (
        <BottomNav />
      ) : (
        <>
          <div>
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col bg-gray-100">
            <div className="ml-auto mr-4">
              <Navbar />
            </div>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg md:ml-60">
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
} 