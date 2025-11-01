'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '../app/store/hooks';
import { 
  setOnlineStatus, 
  setConnectionInfo, 
  setReachability, 
  setLastCheck 
} from '../app/store/slices/networkSlice';
import { useNetworkStatus, useNetworkPing } from '../app/hooks/useNetworkStatus';

const NetworkManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOnline, isOffline, connectionType, effectiveType, downlink, rtt } = useNetworkStatus();
  const { isReachable, lastCheck } = useNetworkPing();

  useEffect(() => {
    dispatch(setOnlineStatus(isOnline));
  }, [isOnline, dispatch]);

  useEffect(() => {
    dispatch(setConnectionInfo({
      connectionType,
      effectiveType,
      downlink,
      rtt,
    }));
  }, [connectionType, effectiveType, downlink, rtt, dispatch]);

  useEffect(() => {
    dispatch(setReachability(isReachable));
  }, [isReachable, dispatch]);

  useEffect(() => {
    if (lastCheck) {
      dispatch(setLastCheck(lastCheck.toISOString()));
    }
  }, [lastCheck, dispatch]);

  return null; // This component doesn't render anything
};

export default NetworkManager;

