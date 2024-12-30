// components/Navbar.js
import { BellIcon } from '@heroicons/react/outline';

export default function Navbar() {
  return (
    <nav className="flex items-end justify-between p-8">

      <div className="flex items-center space-x-4 ml-auto">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-gray-500" />
        </button>

        {/* User info */}
        <div className="flex items-center space-x-2">
          <img
            src="/images/dr-cameron.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">Janet Catherine</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
