import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompareProduct {
  id: number | string;
  title?: string;
  name?: string;
  thumbnail?: string;
  slug?: string;
  price?: string;
  image?: string;
  hover?: string;
  category?: string;
  old_price?: string | null;
  colors?: string[];
  sizes?: string[];
  badges?: { type: string; text: string }[];
  variations?: any[];
  min_price?: string;
  price_after_discount?: string;
  price_before_discount?: string;
  default_variation_id?: string | number;
  is_favourite?: boolean;
  [key: string]: any; // Allow additional properties
}

interface CompareState {
  products: CompareProduct[];
}

const initialState: CompareState = {
  products: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    toggleCompareProduct: (state, action: PayloadAction<CompareProduct>) => {
      const product = action.payload;
      const existingIndex = state.products.findIndex(
        p => String(p.id) === String(product.id)
      );

      if (existingIndex === -1) {
        // Add to compare (max 4 products)
        if (state.products.length < 4) {
          state.products.push(product);
        }
      } else {
        // Remove from compare
        state.products.splice(existingIndex, 1);
      }

      // Save to localStorage
      try {
        localStorage.setItem('compareList', JSON.stringify(state.products));
      } catch (error) {
        console.error('❌ Failed to save compare list to localStorage:', error);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string | number>) => {
      const productId = action.payload;
      state.products = state.products.filter(
        p => String(p.id) !== String(productId)
      );

      // Update localStorage
      try {
        localStorage.setItem('compareList', JSON.stringify(state.products));
      } catch (error) {
        console.error('❌ Failed to update compare list in localStorage:', error);
      }
    },
    clearCompare: (state) => {
      state.products = [];

      // Clear from localStorage
      try {
        localStorage.removeItem('compareList');
      } catch (error) {
        console.error('❌ Failed to clear compare list from localStorage:', error);
      }
    },
    loadCompareFromStorage: (state) => {
      try {
        const savedCompare = localStorage.getItem('compareList');
        if (savedCompare) {
          const products = JSON.parse(savedCompare);
          state.products = products;
        }
      } catch (error) {
        console.error('❌ Failed to load compare list from localStorage:', error);
        state.products = [];
      }
    },
  },
});

export const {
  toggleCompareProduct,
  removeFromCompare,
  clearCompare,
  loadCompareFromStorage,
} = compareSlice.actions;

export default compareSlice.reducer;

