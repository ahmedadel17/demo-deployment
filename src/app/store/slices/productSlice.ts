import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VariationData {
  id?: number;
  price?: number;
  stock?: number;
  sku?: string;
  [key: string]: unknown;
}

interface ProductState {
  selectedSizeId: number | null;
  selectedColorId: number | null;
  variationData: VariationData | null;
  isLoadingVariation: boolean;
  error: string | null;
}

const initialState: ProductState = {
  selectedSizeId: null,
  selectedColorId: null,
  variationData: null,
  isLoadingVariation: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Set selected size
    setSelectedSize: (state, action: PayloadAction<number | null>) => {
      state.selectedSizeId = action.payload;
      // Clear variation data when size changes
      if (state.selectedSizeId !== action.payload) {
        state.variationData = null;
      }
    },

    // Set selected color
    setSelectedColor: (state, action: PayloadAction<number | null>) => {
      state.selectedColorId = action.payload;
      // Clear variation data when color changes
      if (state.selectedColorId !== action.payload) {
        state.variationData = null;
      }
    },

    // Set both size and color
    setSelection: (state, action: PayloadAction<{
      sizeId: number | null;
      colorId: number | null;
    }>) => {
      state.selectedSizeId = action.payload.sizeId;
      state.selectedColorId = action.payload.colorId;
      // Clear variation data when selection changes
      state.variationData = null;
    },

    // Set variation data
    setVariationData: (state, action: PayloadAction<VariationData | null>) => {
      state.variationData = action.payload;
    },

    // Set loading state for variation
    setVariationLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingVariation = action.payload;
    },

    // Set error
    setVariationError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoadingVariation = false;
    },

    // Clear error
    clearVariationError: (state) => {
      state.error = null;
    },

    // Clear all product data
    clearProductData: (state) => {
      state.selectedSizeId = null;
      state.selectedColorId = null;
      state.variationData = null;
      state.isLoadingVariation = false;
      state.error = null;
    },
  },
});

export const {
  setSelectedSize,
  setSelectedColor,
  setSelection,
  setVariationData,
  setVariationLoading,
  setVariationError,
  clearVariationError,
  clearProductData,
} = productSlice.actions;

export default productSlice.reducer;





