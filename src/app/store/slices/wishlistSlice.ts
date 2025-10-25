import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistProduct {
  id: number;
  name: string;
  min_price: number;
  price_after_discount: number;
  default_variation_id: number | null;
  discount: number;
  is_favourite: boolean;
  out_of_stock: boolean;
  rate: string;
  short_description: string;
  thumbnail: string;
  slug?: string;
  category?: string;
  variations?: any[];
}

interface WishlistState {
  products: WishlistProduct[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: WishlistState = {
  products: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistProducts: (state, action: PayloadAction<WishlistProduct[]>) => {
      state.products = action.payload;
      state.error = null;
      state.lastUpdated = new Date().toISOString();
      
      // Save to localStorage
      try {
        localStorage.setItem('wishlistProducts', JSON.stringify(action.payload));
        console.log('💾 Wishlist products saved to localStorage:', action.payload);
      } catch (error) {
        console.error('❌ Failed to save wishlist to localStorage:', error);
      }
    },
    addToWishlist: (state, action: PayloadAction<WishlistProduct>) => {
      const product = action.payload;
      const existingIndex = state.products.findIndex(p => p.id === product.id);
      
      if (existingIndex === -1) {
        state.products.push({ ...product, is_favourite: true });
        state.lastUpdated = new Date().toISOString();
        
        // Update localStorage
        try {
          localStorage.setItem('wishlistProducts', JSON.stringify(state.products));
          console.log('💾 Product added to wishlist:', product);
        } catch (error) {
          console.error('❌ Failed to save wishlist to localStorage:', error);
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.products = state.products.filter(product => product.id !== productId);
      state.lastUpdated = new Date().toISOString();
      
      // Update localStorage
      try {
        localStorage.setItem('wishlistProducts', JSON.stringify(state.products));
        console.log('🗑️ Product removed from wishlist:', productId);
      } catch (error) {
        console.error('❌ Failed to update wishlist in localStorage:', error);
      }
    },
    toggleWishlistItem: (state, action: PayloadAction<WishlistProduct>) => {
      const product = action.payload;
      const existingIndex = state.products.findIndex(p => p.id === product.id);
      
      if (existingIndex === -1) {
        // Add to wishlist
        state.products.push({ ...product, is_favourite: true });
        console.log('💾 Product added to wishlist:', product);
      } else {
        // Remove from wishlist
        state.products.splice(existingIndex, 1);
        console.log('🗑️ Product removed from wishlist:', product);
      }
      
      state.lastUpdated = new Date().toISOString();
      
      // Update localStorage
      try {
        localStorage.setItem('wishlistProducts', JSON.stringify(state.products));
      } catch (error) {
        console.error('❌ Failed to update wishlist in localStorage:', error);
      }
    },
    clearWishlist: (state) => {
      state.products = [];
      state.lastUpdated = new Date().toISOString();
      
      // Clear from localStorage
      try {
        localStorage.removeItem('wishlistProducts');
        console.log('🗑️ Wishlist cleared');
      } catch (error) {
        console.error('❌ Failed to clear wishlist from localStorage:', error);
      }
    },
    loadWishlistFromStorage: (state) => {
      try {
        const savedWishlist = localStorage.getItem('wishlistProducts');
        if (savedWishlist) {
          const products = JSON.parse(savedWishlist);
          state.products = products;
          console.log('📦 Wishlist loaded from localStorage:', products);
        }
      } catch (error) {
        console.error('❌ Failed to load wishlist from localStorage:', error);
        state.products = [];
      }
    },
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWishlistError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateWishlistFromAPI: (state, action: PayloadAction<WishlistProduct[]>) => {
      state.products = action.payload;
      state.error = null;
      state.lastUpdated = new Date().toISOString();
      
      // Save to localStorage
      try {
        localStorage.setItem('wishlistProducts', JSON.stringify(action.payload));
        console.log('💾 Wishlist updated from API:', action.payload);
      } catch (error) {
        console.error('❌ Failed to save wishlist to localStorage:', error);
      }
    },
  },
});

export const {
  setWishlistProducts,
  addToWishlist,
  removeFromWishlist,
  toggleWishlistItem,
  clearWishlist,
  loadWishlistFromStorage,
  setWishlistLoading,
  setWishlistError,
  updateWishlistFromAPI,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
