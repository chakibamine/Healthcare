"use client";
import React from 'react';

const MedicalLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {/* Pulse Animation Container */}
      <div className="relative">
        {/* Medical Cross */}
        <div className="w-16 h-16 relative animate-pulse">
          <div className="absolute bg-blue-600 rounded-md">
            {/* Vertical bar */}
            <div className="absolute left-6 top-2 w-4 h-12 bg-blue-600 rounded-md"></div>
            {/* Horizontal bar */}
            <div className="absolute top-6 left-2 h-4 w-12 bg-blue-600 rounded-md"></div>
          </div>
        </div>
        
        {/* Circular Pulse Effect */}
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full animate-ping-slow bg-blue-100 opacity-75"></div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-4 text-blue-600 font-medium animate-pulse">
        Loading...
      </div>
      
      {/* Heart Beat Line */}
      <div className="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
    </div>
  );
};

export default MedicalLoading; 