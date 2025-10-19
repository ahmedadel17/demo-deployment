'use client';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  setLoading, 
  setError, 
  loginSuccess, 
  logout, 
  updateUser, 
  setToken, 
  clearError,
  initializeAuth 
} from '../store/slices/authSlice';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const initializeAuthFromStorage = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch(initializeAuth({ token, user }));
        }
      } catch (error) {
        console.error('Error initializing auth from storage:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    };

    initializeAuthFromStorage();
  }, [dispatch]);

  // Login function
  const login = async (credentials: { email: string; password: string }) => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token and user data in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      // Update Redux store
      dispatch(loginSuccess({
        token: data.token,
        user: data.user,
      }));

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logoutUser = () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Update Redux store
    dispatch(logout());
  };

  // Update user data
  const updateUserData = (userData: Partial<{
    id: string;
    email: string;
    name: string;
    phone: string;
  }>) => {
    dispatch(updateUser(userData));
    
    // Update localStorage if user data exists
    if (auth.user) {
      const updatedUser = { ...auth.user, ...userData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  // Set token (for cases where you have token but no user data)
  const setAuthToken = (token: string) => {
    localStorage.setItem('authToken', token);
    dispatch(setToken(token));
  };

  // Clear error
  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Get auth token
  const getToken = () => {
    return auth.token || localStorage.getItem('authToken');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return auth.isAuthenticated && !!getToken();
  };

  // Send OTP function
  const sendOTP = async (phone: string) => {
    dispatch(setLoading(true));
    dispatch(clearError());

    try {
      const phoneNormalized = phone.startsWith("+") ? phone : `+${phone}`;
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNormalized }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      const data = await response.json();
      dispatch(setLoading(false));
      
      return { 
        success: true, 
        data,
        isRegistered: data.data?.registered || false,
        phone: phoneNormalized
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  return {
    // State
    token: auth.token,
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    
    // Actions
    login,
    logout: logoutUser,
    updateUser: updateUserData,
    setToken: setAuthToken,
    clearError: clearAuthError,
    getToken,
    isAuthenticated: isAuthenticated(),
    sendOTP,
    
    // Redux actions (for direct use)
    loginSuccess: (data: { token: string; user: { id: string; email: string; name: string; phone: string; } }) => {
      dispatch(loginSuccess(data));
    },
    setLoading: (loading: boolean) => {
      dispatch(setLoading(loading));
    },
    setError: (error: string | null) => {
      dispatch(setError(error));
    },
  };
};
