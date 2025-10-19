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

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  // Memoize the loadCartFromStorage function to prevent infinite loops
  const loadCartFromStorageCallback = useCallback(() => {
    dispatch(loadCartFromStorage());
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
    setLoading: (loading: boolean) => dispatch(setCartLoading(loading)),
    setError: (error: string | null) => dispatch(setCartError(error)),
  };
}
