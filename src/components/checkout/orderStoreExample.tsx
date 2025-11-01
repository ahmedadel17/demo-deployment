'use client';

import React from 'react';
import { useOrder } from '@/app/hooks/useOrder';

export default function OrderStoreExample() {
  const {
    order,
    updateShippingAddress,
    updatePaymentMethod,
    updateShippingMethod,
    updateOrderAmounts,
    updateOrderNotes,
    isOrderComplete,
    getOrderSummary,
    clearOrderData,
    resetOrderData,
  } = useOrder();

  const handleShippingAddressChange = (addressId: string) => {
    updateShippingAddress(addressId);
    // console.log('Shipping address updated:', addressId);
  };

  const handlePaymentMethodChange = (paymentMethodId: string) => {
    updatePaymentMethod(paymentMethodId);
    // console.log('Payment method updated:', paymentMethodId);
  };

  const handleShippingMethodChange = (shippingMethodId: string) => {
    updateShippingMethod(shippingMethodId, { amount_to_pay: '0' }); // Pass null for cartData in example
    // console.log('Shipping method updated:', shippingMethodId);
  };

  const handleAmountsUpdate = () => {
    updateOrderAmounts({
      subtotal: 100.00,
      shipping_cost: 15.00,
      tax_amount: 10.00,
      total_amount: 125.00,
    });
  };

  const handleNotesUpdate = (notes: string) => {
    updateOrderNotes(notes);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Order Store Example</h2>
      
      {/* Current Order State */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Order State:</h3>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <pre className="text-sm">{JSON.stringify(order, null, 2)}</pre>
        </div>
      </div>

      {/* Order Completion Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Order Status:</h3>
        <div className={`p-3 rounded ${isOrderComplete() ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {isOrderComplete() ? '✅ Order is complete' : '⚠️ Order is incomplete'}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Test Actions:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleShippingAddressChange('addr_123')}
              className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Set Shipping Address
            </button>
            
            <button
              onClick={() => handlePaymentMethodChange('pay_456')}
              className="p-3 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Set Payment Method
            </button>
            
            <button
              onClick={() => handleShippingMethodChange('ship_789')}
              className="p-3 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Set Shipping Method
            </button>
            
            <button
              onClick={handleAmountsUpdate}
              className="p-3 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Update Amounts
            </button>
            
            <button
              onClick={() => handleNotesUpdate('Special delivery instructions')}
              className="p-3 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Add Notes
            </button>
            
            <button
              onClick={resetOrderData}
              className="p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset Order
            </button>
            
            <button
              onClick={clearOrderData}
              className="p-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary:</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <pre className="text-sm">{JSON.stringify(getOrderSummary(), null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}





