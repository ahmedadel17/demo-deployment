import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
    first_name?: string | null;
    phone: string | null;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error message
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Login success - set token and user data
    loginSuccess: (state, action: PayloadAction<{
      token: string;
      user: {
        id: string;
        email: string;
        name: string;
        first_name?: string;
        phone: string;
      };
    }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    // Logout - clear all auth data
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },

    // Update user data
    updateUser: (state, action: PayloadAction<Partial<{
      id: string;
      email: string;
      name: string;
      first_name?: string;
      phone: string;
    }>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Set token only (for cases where you have token but no user data yet)
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Initialize auth from localStorage (for persistence)
    initializeAuth: (state, action: PayloadAction<{
      token: string | null;
      user: {
        id: string;
        email: string;
        name: string;
        first_name?: string;
        phone: string;
      } | null;
    }>) => {
      if (action.payload.token && action.payload.user) {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  loginSuccess,
  logout,
  updateUser,
  setToken,
  clearError,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;




