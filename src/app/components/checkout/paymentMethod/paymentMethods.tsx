'use client'
import React, { useState, useCallback } from 'react';
import Image from 'next/image';

import { useLocale } from 'next-intl';
import { useCart } from '@/app/hooks/useCart';
import { useAuth } from '@/app/hooks/useAuth';
import { useOrder } from '@/app/hooks/useOrder';
import postRequest from '../../../../../helpers/post';
import HyperPayPayment from './hyperpay';
import { useTranslations } from 'next-intl';
interface PaymentMethodsProps {
  allowedPaymentMethods?: string[];
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  allowedPaymentMethods = []
}) => {
  const { order, updatePaymentMethod } = useOrder();
const { cartData } = useCart();
const {token}= useAuth()
  const [showPaymentOptions, setShowPaymentOptions] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const t = useTranslations();
  // Check if browser is Safari
  const isSafari = () => {
    if (typeof window === 'undefined') return false;
    const userAgent = window.navigator.userAgent;
    return /Safari/.test(userAgent) && !/Chrome/.test(userAgent) && !/Chromium/.test(userAgent);
  };

  const handleTamaraPayment = async () => {
    try {
      setIsProcessingPayment(true);
      const response = await postRequest('/payment/tamara/prepare-checkout', {
        order_id: cartData?.id,
        success_url: window.location.origin + `/checkoutConfirmation?orderId=${cartData?.id}`,
        cancel_url: window.location.origin + `/checkoutConfirmation?orderId=${cartData?.id}`,
      }, {}, token, 'en');
      
      console.log('Tamara response:', response);
      
      if (response.data.status) {
        // Redirect to Tamara checkout
        if (response.data.data.checkout_url || response.data.checkoutUrl) {
          window.location.href = response.data.data.checkout_url || response.data.checkoutUrl;
        }
      } else {
        setIsProcessingPayment(false);
        setShowPaymentOptions(true);
      }
    } catch (error) {
      console.error('Tamara payment error:', error);
      setIsProcessingPayment(false);
      setShowPaymentOptions(true);
    }
  };

  const handleTabbyPayment = async () => {
    try {
      setIsProcessingPayment(true);
      const response = await postRequest('/payment/tabby/prepare-checkout', {
        order_id: cartData?.id,
        success_url: window.location.origin + `/checkoutConfirmation?orderId=${cartData?.id}`,
        cancel_url: window.location.origin + `/checkoutConfirmation?orderId=${cartData?.id}`,
      }, {}, token, 'en');
      
      console.log('Tabby response:', response);
      
      if (response.data.status) {
        // Redirect to Tabby checkout
        if (response.data.data.checkout_url || response.data.checkoutUrl) {
          window.location.href = response.data.data.checkout_url || response.data.checkoutUrl;
        }
      } else {
        setIsProcessingPayment(false);
        setShowPaymentOptions(true);
      }
    } catch (error) {
      console.error('Tabby payment error:', error);
      setIsProcessingPayment(false);
      setShowPaymentOptions(true);
    }
  };


  const handlePaymentMethodChange = (method: string) => {
    updatePaymentMethod(method);
    
    // Handle different payment methods
    if (method === 'tamara') {
      // For Tamara, call the API directly
      setShowPaymentOptions(false);
      handleTamaraPayment();
    } else if (method === 'tabby') {
      // For Tabby, call the API directly
      setShowPaymentOptions(false);
      handleTabbyPayment();
    } else if (method !== 'cod') {
      // For HyperPay methods (including Apple Pay), hide options and show loading
      setShowPaymentOptions(false);
      setIsProcessingPayment(true);
    }
  };

  const handleBackToPaymentMethods = () => {
    setShowPaymentOptions(true);
    setIsProcessingPayment(false);
    updatePaymentMethod('');
  };

  const handlePaymentReady = useCallback(() => {
    setIsProcessingPayment(false);
  }, []);


  const allPaymentOptions = [
    {
      value: 'cod',
      label: ('Cash on Delivery'),
      description: ('Cash on Delivery'),
      icon: (
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center me-3">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
          </svg>
        </div>
      )
    },
    
    {
      value: 'visa',
      label: 'Visa',
      description: 'Credit/Debit Card',
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/visa.jpg" alt="Visa" />
        </div>
      )
    },
    {
      value: 'master',
      label: 'Mastercard',
      description: 'Credit/Debit Card',
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/mastercard.jpg" alt="Mastercard" />
        </div>
      )
    },
    {
      value: 'mada',
      label: 'Mada',
      description: 'Local Payment',
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/mada.jpg" alt="Mada" />
        </div>
      )
    },
    {
      value: 'tabby',
      label: 'Tabby',
      description: ('Pay in 4 installments'),
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/tabby.jpg" alt="Tabby" />
        </div>
      )
    },
    {
      value: 'tamara',
      label: 'Tamara',
      description: ('Buy now, pay later'),
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
          <Image width={200} height={200} className="rounded-lg" src="/assets/images/payment/tamara.jpg" alt="Tamara" />
        </div>
      )
    },
    // Apple Pay - only show in Safari
    ...(isSafari() ? [{
      value: 'applepay',
      label: 'Apple Pay',
      description: 'Pay with Apple Pay',
      icon: (
        <div className="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md bg-black">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </div>
      )
    }] : [])
  ];

  // Filter payment options based on allowed payment methods
  const paymentOptions = allowedPaymentMethods.length > 0 
    ? allPaymentOptions.filter(option => allowedPaymentMethods.includes(option.value))
    : allPaymentOptions;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 my-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {showPaymentOptions ? ('Payment Method') : ('Processing Payment')}
        </h2>
        
        {/* Back button - only show when payment options are hidden */}
        {!showPaymentOptions && (
          <button
            onClick={handleBackToPaymentMethods}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className='hidden lg:block'>{('Change Payment Method')}</span>
          </button>
        )}
      </div>

      {showPaymentOptions ? (
        // Show payment options
        paymentOptions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">{('No payment methods available')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <label key={option.value} className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value={option.value}
                  checked={order.payment_method_id === option.value}
                  className="text-primary-600"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePaymentMethodChange(e.target.value);
                  }}
                />
                <div className="ms-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {option.icon}
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        )
      ) : (
        // Show loading state and HyperPay component
        <div>
          {isProcessingPayment && (
            <div className="flex items-center justify-center p-2 mb-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 animate-spin text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  {t('Preparing payment with')} {order.payment_method_id?.toUpperCase()}...
                  </span>
              </div>
            </div>
          )}
          
          {order.payment_method_id && order.payment_method_id !== 'cod' && order.payment_method_id !== 'tamara' && order.payment_method_id !== 'tabby' && (
            <div className="mt-4">
              <HyperPayPayment 
                selectedBrand={order.payment_method_id} 
                onPaymentReady={handlePaymentReady}
              />
            </div>
          )}
          
          {/* Tamara specific loading state */}
          {order.payment_method_id === 'tamara' && isProcessingPayment && (
            <div className="flex items-center justify-center p-8">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 animate-spin text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  {t('Preparing Tamara payment')}
                </span> 
              </div>
            </div>
          )}
          
          {/* Tabby specific loading state */}
          {order.payment_method_id === 'tabby' && isProcessingPayment && (
            <div className="flex items-center justify-center p-8">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 animate-spin text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  {t('Preparing Tabby payment')}
                </span>
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;