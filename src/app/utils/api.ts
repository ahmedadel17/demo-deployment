import { store } from '../store';

// Get the current token from Redux store
const getToken = () => {
  const state = store.getState();
  return state.auth.token;
};

// Make authenticated API request
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If token is invalid, logout user
  if (response.status === 401) {
    store.dispatch({ type: 'auth/logout' });
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  return response;
};

// Example API functions using the authenticated fetch
export const api = {
  // Get user profile
  getUserProfile: async () => {
    const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`);
    return response.json();
  },

  // Update user profile
  updateUserProfile: async (userData: any) => {
    const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Get products (authenticated)
  getProducts: async () => {
    const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products`);
    return response.json();
  },

  // Add to cart
  addToCart: async (productId: string, quantity: number) => {
    const response = await authenticatedFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },
};




