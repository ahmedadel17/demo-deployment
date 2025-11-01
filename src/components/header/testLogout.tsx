"use client";

import React from 'react';
import { useAuth } from '../../app/hooks/useAuth';

const TestLogout: React.FC = () => {
  const { user, logout: logoutUser, isAuthenticated } = useAuth();

  const handleLogout = () => {
    // console.log('Logging out...');
    logoutUser();
    // console.log('Logged out successfully');
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Test Logout Functionality</h2>
      
      <div className="space-y-4">
        <div>
          <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
          <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'Not logged in'}</p>
        </div>

        <div>
          <p><strong>LocalStorage Token:</strong> {localStorage.getItem('authToken') || 'None'}</p>
          <p><strong>LocalStorage User:</strong> {localStorage.getItem('userData') || 'None'}</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TestLogout;
