"use client";

import React from 'react';
import FooterNav from './footerNav';

const TestFooterNav: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Content to test scrolling */}
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Test Footer Navigation</h1>
        
        {/* Long content to test scrolling */}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Section {i + 1}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is test content to demonstrate that the footer navigation 
              stays sticky at the bottom of the screen on mobile devices.
              Scroll down to see more content and verify the footer remains fixed.
            </p>
          </div>
        ))}
        
        <div className="h-32 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
          <p className="text-center text-blue-800 dark:text-blue-200">
            This is the last section. The footer should still be visible at the bottom.
          </p>
        </div>
      </div>
      
      {/* Footer Navigation - Only visible on mobile */}
      <FooterNav />
    </div>
  );
};

export default TestFooterNav;
