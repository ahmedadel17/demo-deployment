import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartProduct {
  id: number;
  name: string;
  variation_id: number;
  product_id: number;
  price: number;
  qty: number;
  variation: string;
  image: string;
  in_stock: boolean;
}

interface ShippingMethod {
  id: number;
  name: string;
  description: string;
  slug: string;
  selected: boolean;
  price: string;
  image: string;
}

interface OrderAttribute {
  label: string;
  value: string;
  color: string;
  show_currency: boolean;
}

interface CartResponse {
  id: number;
  type: string;
  status: string;
  status_value: string;
  sub_total: string;
  vat_amount: string;
  total_amount: string;
  amount_to_pay: string;
  products: CartProduct[];
  offers: any[];
  voucher: any;
  customer_note: string | null;
  address: any;
  use_wallet: boolean;
  user_balance: string;
  allow_voucher: boolean;
  allowed_payment_methods: string[];
  shipping_methods: ShippingMethod[];
  created_at: string;
  cart_count: number;
  order_attributes: OrderAttribute[];
  can_cancel: boolean;
  can_rate: boolean;
  can_pay: boolean;
}

interface CartState {
  cartData: CartResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartData: null,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action: PayloadAction<CartResponse>) => {
      state.cartData = action.payload;
      state.error = null;
      
      // Save to localStorage
      try {
        localStorage.setItem('cartData', JSON.stringify(action.payload));
        // console.log('💾 Cart data saved to localStorage:', action.payload);
      } catch (error) {
        console.error('❌ Failed to save cart to localStorage:', error);
      }
    },
    updateCartData: (state, action: PayloadAction<CartResponse>) => {
      state.cartData = action.payload;
      
      // Update localStorage
      try {
        localStorage.setItem('cartData', JSON.stringify(action.payload));
        // console.log('💾 Cart data updated in localStorage:', action.payload);
      } catch (error) {
        console.error('❌ Failed to update cart in localStorage:', error);
      }
    },
    clearCart: (state) => {
      state.cartData = null;
      
      // Clear from localStorage
      try {
        localStorage.removeItem('cartData');
        // console.log('🗑️ Cart data cleared from localStorage');
      } catch (error) {
        console.error('❌ Failed to clear cart from localStorage:', error);
      }
    },
    loadCartFromStorage: (state) => {
      try {
        const savedCart = localStorage.getItem('cartData');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          state.cartData = cartData;
          // console.log('📦 Cart data loaded from localStorage:', cartData);
        }
      } catch (error) {
        console.error('❌ Failed to load cart from localStorage:', error);
        state.cartData = null;
      }
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCartData,
  updateCartData,
  clearCart,
  loadCartFromStorage,
  setCartLoading,
  setCartError,
} = cartSlice.actions;

export default cartSlice.reducer;
