'use client'
import React, { useState, useEffect } from 'react'
import OrderAttribute from './orderAttribute';
import Image from 'next/image';
import { useCart } from '@/app/hooks/useCart';
import { useOrder } from '@/app/hooks/useOrder';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/hooks/useAuth';
import getRequest from '../../../../helpers/get';
import { useRouter } from 'next/navigation';
function OrderSummary() {
  const { cartData } = useCart();
  const { order, updateOrderStatus } = useOrder();
  const { token } = useAuth();
  const t = useTranslations();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only rendering after client mount
  useEffect(() => {
    setIsClient(true);
  }, []);
 const  placeOrder = async () => {
  try {
    const response = await getRequest('/payment/cash-on-delivery/' + cartData?.id, { 'Content-Type': 'application/json' }, token, 'en');
    console.log('Place order response:', response);
    
    if(response.status === 200 && response.data?.data?.id){
      // Update order status to confirmation
      updateOrderStatus('PlaceOrder');
      // Navigate to confirmation page
      router.push('/checkoutConfirmation?orderId=' + response.data.data.id);
    } else {
      console.error('Failed to place order:', response);
      alert('Failed to place order. Please try again.');
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('An error occurred while placing your order. Please try again.');
  }
}
  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{('Order Summary')}</h2>
          <div className="animate-pulse">
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{('Order Summary')}</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {isClient && cartData?.products && cartData.products.length > 0 ? cartData.products.map((item: any, index: number) => (
          <div key={item.id || `product-${index}`} className="flex items-center space-x-4 rtl:space-x-reverse">
            <Image 
              src={item.image || '/placeholder.jpg'} 
              alt={item.name || 'Product'} 
              width={100} 
              height={100} 
              className="w-16 h-16 object-cover rounded-md" 
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {typeof item.variations === 'string' ? item.variations : ''}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{('Qty')}: {item.qty}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">
                <span className="icon-riyal-symbol text-xs"></span>
                <span>{item.price}</span>
              </p>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            {('No items in cart')}
          </div>
        )}
      </div>

      {/* Order Totals */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{('Subtotal')}</span>
            <span className="text-gray-900 dark:text-white">
              <span className="icon-riyal-symbol text-xs"></span>
              <span>{(cartData as { sub_total?: string })?.sub_total || '0'}</span>
            </span>
        </div>
      {isClient && cartData?.order_attributes && cartData.order_attributes.length > 0 && cartData.order_attributes.map((item: any, index: number) => (
        <OrderAttribute key={item.id || `attribute-${index}`} {...item} />
      ))}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{('Total')}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              <span className="icon-riyal-symbol"></span>
              <span>{(cartData as { total_amount?: string })?.total_amount || '0'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Order State Debug */}
      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
        <div className="font-semibold mb-2">Order State:</div>
        <div>Address ID: {order.shipping_address_id || 'Not selected'}</div>
        <div>Shipping: {order.shipping_method_slug || 'Not selected'}</div>
        <div>Payment: {order.payment_method_id || 'Not selected'}</div>
        <div>Status: {order.status || 'Not selected'}</div>
        <div className="mt-2 font-semibold">
          Status: {order.status == 'paymentMethod' ? '✅ Complete' : '❌ Incomplete'}
        </div>
      </div>

      {/* Conditional Buttons */}
      
      {/* 1. If amount is 0.00, show Place Order button */}
     

      {/* Show buttons based on current page */}
      
      {/* 1. Checkout page - Show Go to Shipping Method button */}
      {(order.status === 'shippingAddress' ) && (
        <button
          onClick={() => {
            router.push('/checkout/shippingMethod');
            updateOrderStatus('ShippingMethod');
          }}
          disabled={!order.shipping_address_id}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Go to Shipping Method')}
        </button>
      )}
      
      {/* 2. Shipping Method page - Show Go to Payment button */}
      {order.status === 'shippingMethod' && (
        <button
          onClick={() => {
            router.push('/checkout/paymentMethod');
            updateOrderStatus('Payment');
          }}
          disabled={!order.shipping_method_slug}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Go to Payment')}
        </button>
      )}
      
      {/* 3. Payment page - Show Place Order button */}
      {order.status === 'paymentMethod' && (
        <button
          onClick={placeOrder}
          disabled={!order.shipping_address_id || !order.shipping_method_slug}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Place Order
        </button>
      )}

      {/* 2. Shipping Method page - Show Proceed to Payment button */}
      {/* {isOnShippingMethodPage() && (
        <button
          onClick={() => router.push('/checkout/payment')}
          disabled={!orderState.user_address_id || !orderState.shipping_slug}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Proceed to Payment')}
        </button>
      )} */}

      {/* 3. Payment page - Show Place Order button only for COD */}
      {/* {isOnPaymentPage() && orderState.payment_method === 'cod' && (
        <button
          onClick={handlePayment}
          className="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {t('Place Order')}
        </button>
      )} */}
     
      {/* Security Notice */}
      <div className="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <svg className="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        {('Secure SSL encrypted checkout')}
      </div>
    </div>
  </div>
  )
}

export default OrderSummary
