import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
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
} from '@/app/store/slices/orderSlice';

export const useOrder = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);

  const updateShippingAddress = (addressId: string) => {
    dispatch(setShippingAddressId(addressId));
    dispatch(setOrderStatus('shippingAddress'));
  };

 

  const updateShippingMethod = (shippingMethodSlug: string, cartData?: { total_amount?: string }) => {
    dispatch(setShippingMethodSlug(shippingMethodSlug));
    
    // Check if total amount is zero
    const amount_to_pay = parseFloat(cartData?.amount_to_pay );
    console.log(cartData)
    if (amount_to_pay == 0) {
      // If amount is zero, set status to confirm order
      dispatch(setOrderStatus('PlaceOrder'));
    } else {
      // If amount is not zero, continue with normal flow
      dispatch(setOrderStatus('shippingMethod'));
    }
  };
  const updatePaymentMethod = (paymentMethodId: string) => {
    dispatch(setPaymentMethodId(paymentMethodId));
    if(paymentMethodId == 'cod'){
    dispatch(setOrderStatus('PlaceOrder'));}
    else{
    dispatch(setOrderStatus('Payment'));
  }
  };

  const updateOrderId = (orderId: string) => {
    dispatch(setOrderId(orderId));
  };

  const updateOrderStatus = (status: 'shippingAddress' | 'ShippingMethod' | 'Payment' | 'PlaceOrder' | 'delivered' | 'cancelled') => {
    dispatch(setOrderStatus(status));
  };

  const updateOrderAmounts = (amounts: {
    total_amount?: number;
    subtotal?: number;
    shipping_cost?: number;
    tax_amount?: number;
    discount_amount?: number;
  }) => {
    dispatch(setOrderAmounts(amounts));
  };

  const updateOrderNotes = (notes: string) => {
    dispatch(setOrderNotes(notes));
  };

  const updateOrderData = (orderData: Partial<typeof order>) => {
    dispatch(setOrderData(orderData));
  };

  const clearOrderData = () => {
    dispatch(clearOrder());
  };

  const resetOrderData = () => {
    dispatch(resetOrder());
  };

  // Computed properties
  const isOrderComplete = () => {
    return !!(
      order.shipping_address_id &&
      order.payment_method_id &&
      order.shipping_method_slug
    );
  };

  const getOrderSummary = () => {
    return {
      shipping_address_id: order.shipping_address_id,
      payment_method_id: order.payment_method_id,
      shipping_method_slug: order.shipping_method_slug,
      order_id: order.order_id,
      status: order.status,
      total_amount: order.total_amount,
      subtotal: order.subtotal,
      shipping_cost: order.shipping_cost,
      tax_amount: order.tax_amount,
      discount_amount: order.discount_amount,
      notes: order.notes,
      created_at: order.created_at,
      updated_at: order.updated_at,
    };
  };

  return {
    // State
    order,
    
    // Actions
    updateShippingAddress,
    updatePaymentMethod,
    updateShippingMethod,
    updateOrderId,
    updateOrderStatus,
    updateOrderAmounts,
    updateOrderNotes,
    updateOrderData,
    clearOrderData,
    resetOrderData,
    // Computed
    isOrderComplete,
    getOrderSummary,
  };
};

