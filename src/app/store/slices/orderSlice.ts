import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderState {
  shipping_address_id: string | null;
  payment_method_id: string | null;
  shipping_method_slug: string | null;
  order_id: string | null;
  status: 'shippingAddress' | 'paymentMethod' | 'shippingMethod' | 'orderSummary' | 'orderConfirmation' | 'PlaceOrder' | 'Payment' | 'ShippingMethod' | 'delivered' | 'cancelled' | 'draft';
  total_amount: number | null;
  subtotal: number | null;
  shipping_cost: number | null;
  tax_amount: number | null;
  discount_amount: number | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

const initialState: OrderState = {
  shipping_address_id: null,
  payment_method_id: null,
  shipping_method_slug: null,
  order_id: null,
  status: 'shippingAddress',
  total_amount: null,
  subtotal: null,
  shipping_cost: null,
  tax_amount: null,
  discount_amount: null,
  notes: null,
  created_at: null,
  updated_at: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setShippingAddressId: (state, action: PayloadAction<string>) => {
      state.shipping_address_id = action.payload;
      state.updated_at = new Date().toISOString();
    },
    
    setPaymentMethodId: (state, action: PayloadAction<string>) => {
      state.payment_method_id = action.payload;
      state.updated_at = new Date().toISOString();
    },
    
    setShippingMethodSlug: (state, action: PayloadAction<string>) => {
      state.shipping_method_slug = action.payload;
      state.updated_at = new Date().toISOString();
    },
    
    setOrderId: (state, action: PayloadAction<string>) => {
      state.order_id = action.payload;
      state.updated_at = new Date().toISOString();
    },
    
    setOrderStatus: (state, action: PayloadAction<OrderState['status']>) => {
      state.status = action.payload;
      state.updated_at = new Date().toISOString();
    },
    
    setOrderAmounts: (state, action: PayloadAction<{
      total_amount?: number;
      subtotal?: number;
      shipping_cost?: number;
      tax_amount?: number;
      discount_amount?: number;
    }>) => {
      if (action.payload.total_amount !== undefined) {
        state.total_amount = action.payload.total_amount;
      }
      if (action.payload.subtotal !== undefined) {
        state.subtotal = action.payload.subtotal;
      }
      if (action.payload.shipping_cost !== undefined) {
        state.shipping_cost = action.payload.shipping_cost;
      }
      if (action.payload.tax_amount !== undefined) {
        state.tax_amount = action.payload.tax_amount;
      }
      if (action.payload.discount_amount !== undefined) {
        state.discount_amount = action.payload.discount_amount;
      }
      state.updated_at = new Date().toISOString();
    },
    
    setOrderNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
      state.updated_at = new Date().toISOString();
    },
    
    setOrderData: (state, action: PayloadAction<Partial<OrderState>>) => {
      Object.assign(state, action.payload);
      state.updated_at = new Date().toISOString();
    },
    
    clearOrder: (state) => {
      Object.assign(state, initialState);
    },
    
    resetOrder: (state) => {
      state.shipping_address_id = null;
      state.payment_method_id = null;
      state.shipping_method_slug = null;
      state.order_id = null;
      state.status = 'draft';
      state.updated_at = new Date().toISOString();
    }
  },
});

export const {
  setShippingAddressId,
  setPaymentMethodId,
  setShippingMethodSlug,
  setOrderId,
  setOrderStatus,
  setOrderAmounts,
  setOrderNotes,
  setOrderData,
  clearOrder,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

