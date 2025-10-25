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
    
    // Helpers
    isInWishlist,
    getWishlistCount,
  };
};
