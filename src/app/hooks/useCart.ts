import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { useCallback } from 'react';
import { 
  setCartData, 
  updateCartData, 
  clearCart, 
  loadCartFromStorage,
  setCartLoading, 
  setCartError 
} from '@/app/store/slices/cartSlice';
import axios from 'axios';

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  // Memoize the loadCartFromStorage function to prevent infinite loops
  const loadCartFromStorageCallback = useCallback(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  // Fetch cart data from API
  const fetchCartData = useCallback(async (token?: string) => {
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
      const authToken = token || localStorage.getItem('authToken');
      
      if (!authToken) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/my-cart`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      // console.log('🛒 Cart data fetched from API:', response.data);

      if (response.data.status && response.data.data) {
        dispatch(setCartData(response.data.data));
        // console.log('🛒 Cart data fetched from API:', response.data.data);
      } else {
        throw new Error('Invalid cart data received from API');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cart data';
      // console.error('❌ Failed to fetch cart data:', error);
      dispatch(setCartError(errorMessage));
      
      // If API fails, try to load from localStorage as fallback
      dispatch(loadCartFromStorage());
    } finally {
      dispatch(setCartLoading(false));
    }
  }, [dispatch]);

  return {
    // State
    cartData: cart.cartData,
    products: cart.cartData?.products || [],
    totalItems: cart.cartData?.cart_count || 0,
    totalPrice: cart.cartData ? parseFloat(cart.cartData.total_amount) : 0,
    subTotal: cart.cartData ? parseFloat(cart.cartData.sub_total) : 0,
    vatAmount: cart.cartData ? parseFloat(cart.cartData.vat_amount) : 0,
    amountToPay: cart.cartData ? parseFloat(cart.cartData.amount_to_pay) : 0,
    shippingMethods: cart.cartData?.shipping_methods || [],
    orderAttributes: cart.cartData?.order_attributes || [],
    allowedPaymentMethods: cart.cartData?.allowed_payment_methods || [],
    isLoading: cart.isLoading,
    error: cart.error,

    // Actions
    setCartData: (data: any) => dispatch(setCartData(data)),
    updateCartData: (data: any) => dispatch(updateCartData(data)),
    clearCart: () => dispatch(clearCart()),
    loadCartFromStorage: loadCartFromStorageCallback,
    fetchCartData,
    setLoading: (loading: boolean) => dispatch(setCartLoading(loading)),
    setError: (error: string | null) => dispatch(setCartError(error)),
  };
}
