'use client';

import React, { useState, useEffect } from 'react';
import { useNetworkStatus, useNetworkPing } from '../app/hooks/useNetworkStatus';

interface NetworkStatusProps {
  showDetails?: boolean;
  position?: 'top' | 'bottom';
  autoHide?: boolean;
  hideDelay?: number;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({
  showDetails = false,
  position = 'top',
  autoHide = true,
  hideDelay = 3000,
}) => {
  const { isOnline, isOffline, connectionType, effectiveType, downlink } = useNetworkStatus();
  const { isReachable, lastCheck } = useNetworkPing();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOffline || !isReachable) {
      setIsVisible(true);
    } else if (isOnline && isReachable) {
      if (autoHide) {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, hideDelay);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(true);
      }
    }
  }, [isOnline, isOffline, isReachable, autoHide, hideDelay]);

  if (!isVisible) return null;

  const getConnectionIcon = () => {
    if (isOffline || !isReachable) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      );
    }
    
    if (effectiveType === '4g') {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    }
    
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    );
  };

  const getStatusText = () => {
    if (isOffline) return 'You are offline';
    if (!isReachable) return 'Connection unstable';
    if (isOnline && isReachable) return 'You are back online';
    return 'Checking connection...';
  };

  const getStatusColor = () => {
    if (isOffline || !isReachable) return 'bg-red-500';
    return 'bg-green-500';
  };

  const formatLastCheck = () => {
    if (!lastCheck) return '';
    const now = new Date();
    const diff = now.getTime() - lastCheck.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <div className={`${getStatusColor()} text-white px-4 py-3 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getConnectionIcon()}
            <div>
              <p className="font-medium">{getStatusText()}</p>
              {showDetails && (
                <div className="text-sm opacity-90 mt-1">
                  {connectionType && (
                    <span className="mr-4">Type: {connectionType}</span>
                  )}
                  {effectiveType && (
                    <span className="mr-4">Speed: {effectiveType}</span>
                  )}
                  {downlink && (
                    <span className="mr-4">Downlink: {downlink}Mbps</span>
                  )}
                  {lastCheck && (
                    <span>Last check: {formatLastCheck()}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;

