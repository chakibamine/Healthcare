"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaUtensils, FaTag, FaUser, FaShoppingCart } from 'react-icons/fa';
import { GiHotMeal } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';
import MobileMenu from './MobileMenu';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the sliding menu

  const tabs = [
    { name: 'Recipes', icon: FaUtensils, path: '/recipes' },
    { name: 'Brands', icon: FaTag, path: '/brands' },
    { name: 'Home', icon: GiHotMeal, path: '/Dashboard' },
    { name: 'Profile', icon: FaUser, path: '/Dashboard/Admin' },
    { name: 'Cart', icon: FaShoppingCart, path: '/cart' },
  ];

  return (
    <>
      {/* Mobile Menu */}
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md py-2 md:hidden z-50">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => (
            <Link href={tab.path} key={tab.name}>
              <button
                onClick={() => setActiveTab(tab.name)}
                className="flex flex-col items-center space-y-1"
              >
                <div
                  className={`p-3 rounded-full ${
                    activeTab === tab.name
                      ? 'bg-black text-white'
                      : 'text-gray-400'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-xs ${
                    activeTab === tab.name
                      ? 'text-black font-semibold'
                      : 'text-gray-400'
                  }`}
                >
                  {tab.name}
                </span>
              </button>
            </Link>
          ))}

          {/* Open Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center space-y-1"
          >
            <div className="p-3 rounded-full text-gray-400 hover:bg-gray-100">
              <HiMenu className="h-5 w-5" />
            </div>
            <span className="text-xs text-gray-400">Menu</span>
          </button>
        </div>
      </nav>
    </>
  );
}
