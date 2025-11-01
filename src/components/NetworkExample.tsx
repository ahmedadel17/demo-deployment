'use client';

import React from 'react';
import { useAppSelector } from '../app/store/hooks';
import { useNetworkStatus } from '../app/hooks/useNetworkStatus';

// Example component showing how to use network detection
const NetworkExample: React.FC = () => {
  // Using Redux state
  const networkState = useAppSelector((state) => state.network);
  
  // Using hook directly (alternative approach)
  const { isOnline, isOffline, connectionType, effectiveType } = useNetworkStatus();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Network Status</h3>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${networkState.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>Status: {networkState.isOnline ? 'Online' : 'Offline'}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${networkState.isReachable ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span>Reachability: {networkState.isReachable ? 'Reachable' : 'Unreachable'}</span>
        </div>
        
        {networkState.connectionType && (
          <div>
            <span className="text-sm text-gray-600">Connection Type: {networkState.connectionType}</span>
          </div>
        )}
        
        {networkState.effectiveType && (
          <div>
            <span className="text-sm text-gray-600">Speed: {networkState.effectiveType}</span>
          </div>
        )}
        
        {networkState.downlink && (
          <div>
            <span className="text-sm text-gray-600">Downlink: {networkState.downlink} Mbps</span>
          </div>
        )}
        
        {networkState.lastCheck && (
          <div>
            <span className="text-sm text-gray-600">
              Last Check: {new Date(networkState.lastCheck).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>
      
      {/* Conditional rendering based on network status */}
      {networkState.isOffline && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-red-700 text-sm">
            You are currently offline. Some features may not be available.
          </p>
        </div>
      )}
      
      {!networkState.isReachable && networkState.isOnline && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
          <p className="text-yellow-700 text-sm">
            Connection is unstable. Please check your internet connection.
          </p>
        </div>
      )}
    </div>
  );
};

export default NetworkExample;

