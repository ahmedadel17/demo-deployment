'use client';

import { useState, useEffect } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  isOffline: boolean;
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  });

  useEffect(() => {
    // Handle online/offline events
    const handleOnline = () => {
      setNetworkStatus(prev => ({
        ...prev,
        isOnline: true,
        isOffline: false,
      }));
    };

    const handleOffline = () => {
      setNetworkStatus(prev => ({
        ...prev,
        isOnline: false,
        isOffline: true,
      }));
    };

    // Handle connection change events (for more detailed network info)
    const handleConnectionChange = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setNetworkStatus(prev => ({
          ...prev,
          isOnline: navigator.onLine,
          isOffline: !navigator.onLine,
          connectionType: connection?.type,
          effectiveType: connection?.effectiveType,
          downlink: connection?.downlink,
          rtt: connection?.rtt,
        }));
      } else {
        setNetworkStatus(prev => ({
          ...prev,
          isOnline: navigator.onLine,
          isOffline: !navigator.onLine,
        }));
      }
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Add connection change listener if available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', handleConnectionChange);
      
      // Set initial connection info
      setNetworkStatus(prev => ({
        ...prev,
        connectionType: connection?.type,
        effectiveType: connection?.effectiveType,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
      }));
    }

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkStatus;
};

// Additional utility hook for periodic network checks
export const useNetworkPing = (url: string = '/api/health', interval: number = 30000) => {
  const [isReachable, setIsReachable] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  useEffect(() => {
    const checkConnectivity = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(url, {
          method: 'HEAD',
          signal: controller.signal,
          cache: 'no-cache',
        });
        
        clearTimeout(timeoutId);
        setIsReachable(response.ok);
        setLastCheck(new Date());
      } catch (error) {
        setIsReachable(false);
        setLastCheck(new Date());
      }
    };

    // Initial check
    checkConnectivity();

    // Set up interval
    const intervalId = setInterval(checkConnectivity, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [url, interval]);

  return { isReachable, lastCheck };
};

