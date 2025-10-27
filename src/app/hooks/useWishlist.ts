import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  setWishlistProducts,
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
  loadWishlistFromStorage,
  setWishlistLoading,
  setWishlistError,
  updateWishlistFromAPI,
} from '@/app/store/slices/wishlistSlice';
import getRequest from '../../../helpers/get';
import toast from 'react-hot-toast';

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist);

  // Load wishlist from localStorage
  const loadWishlist = useCallback(() => {
    dispatch(loadWishlistFromStorage());
  }, [dispatch]);

  // Add product to wishlist
  const addProduct = useCallback((product: any) => {
    dispatch(addToWishlist(product));
  }, [dispatch]);

  // Remove product from wishlist
  const removeProduct = useCallback((productId: number) => {
    dispatch(removeFromWishlist(productId));
  }, [dispatch]);

  // Toggle product in wishlist (add if not present, remove if present)
  const toggleProduct = useCallback((product: any) => {
    dispatch(toggleWishlistItem(product));
  }, [dispatch]);

  // Clear entire wishlist
  const clearAll = useCallback(() => {
    dispatch(clearWishlist());
  }, [dispatch]);

  // Set wishlist products (usually from API)
  const setProducts = useCallback((products: any[]) => {
    dispatch(setWishlistProducts(products));
  }, [dispatch]);

  // Update wishlist from API response
  const updateFromAPI = useCallback((products: any[]) => {
    dispatch(updateWishlistFromAPI(products));
  }, [dispatch]);

  // Set loading state
  const setLoading = useCallback((loading: boolean) => {
    dispatch(setWishlistLoading(loading));
  }, [dispatch]);

  // Set error state
  const setError = useCallback((error: string | null) => {
    dispatch(setWishlistError(error));
  }, [dispatch]);

  // Fetch wishlist data from API
  const fetchWishlistData = useCallback(async (token?: string, locale?: string) => {
    if (!token) return;
    
    dispatch(setWishlistLoading(true));
    dispatch(setWishlistError(null));

    try {
      const response = await getRequest('/catalog/favorites/products', { 'Content-Type': 'application/json' }, token, locale);
      
      if (response.data ) {
        dispatch(updateWishlistFromAPI(response.data));
      } else {
        toast.error('Invalid wishlist data received from API');
        throw new Error('Invalid wishlist data received from API');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch wishlist data';
      toast.error(errorMessage);
      console.error('❌ Failed to fetch wishlist data:', error);
      dispatch(setWishlistError(errorMessage));
      
      // If API fails, try to load from localStorage as fallback
      dispatch(loadWishlistFromStorage());
    } finally {
      dispatch(setWishlistLoading(false));
    }
  }, [dispatch]);

  // Check if product is in wishlist
  const isInWishlist = useCallback((productId: number) => {
    return wishlist.products.some(product => product.id === productId);
  }, [wishlist.products]);

  // Get wishlist count
  const getWishlistCount = useCallback(() => {
    return wishlist.products.length;
  }, [wishlist.products]);

  return {
    // State
    products: wishlist.products,
    isLoading: wishlist.isLoading,
    error: wishlist.error,
    lastUpdated: wishlist.lastUpdated,
    
    // Actions
    loadWishlist,
    addProduct,
    removeProduct,
    toggleProduct,
    clearAll,
    setProducts,
    updateFromAPI,
    setLoading,
    setError,
    fetchWishlistData,
    
    // Helpers
    isInWishlist,
    getWishlistCount,
  };
};

