import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NetworkState {
  isOnline: boolean;
  isOffline: boolean;
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  isReachable: boolean;
  lastCheck?: string;
  showNotification: boolean;
}

const initialState: NetworkState = {
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  isReachable: true,
  showNotification: false,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
      state.isOffline = !action.payload;
    },
    setConnectionInfo: (state, action: PayloadAction<{
      connectionType?: string;
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
    }>) => {
      state.connectionType = action.payload.connectionType;
      state.effectiveType = action.payload.effectiveType;
      state.downlink = action.payload.downlink;
      state.rtt = action.payload.rtt;
    },
    setReachability: (state, action: PayloadAction<boolean>) => {
      state.isReachable = action.payload;
    },
    setLastCheck: (state, action: PayloadAction<string>) => {
      state.lastCheck = action.payload;
    },
    setShowNotification: (state, action: PayloadAction<boolean>) => {
      state.showNotification = action.payload;
    },
    updateNetworkStatus: (state, action: PayloadAction<Partial<NetworkState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setOnlineStatus,
  setConnectionInfo,
  setReachability,
  setLastCheck,
  setShowNotification,
  updateNetworkStatus,
} = networkSlice.actions;

export default networkSlice.reducer;

