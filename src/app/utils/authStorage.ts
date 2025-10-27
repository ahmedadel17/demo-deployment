'use client';

/**
 * Utility functions for managing authentication tokens in both localStorage and cookies
 */

// Save token to both localStorage and cookies
export const saveAuthToken = (token: string) => {
  // Save to localStorage (for client-side access)
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    
    // Save to cookies (for server-side access)
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
  }
};

// Save user data to localStorage
export const saveUserData = (userData: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
};

// Get token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Get user data from localStorage
export const getUserData = (): any | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

// Clear all auth data from both localStorage and cookies
export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Clear cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

