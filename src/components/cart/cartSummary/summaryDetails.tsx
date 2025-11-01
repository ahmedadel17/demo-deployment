'use client';
import React from 'react'
import { useCart } from '@/app/hooks/useCart'

function SummaryDetails() {
  const { 
    totalItems, 
    subTotal, 
    vatAmount, 
    amountToPay,
    orderAttributes 
  } = useCart();

  return (
    <>
      <div className="space-y-3 mb-6 mt-4">
        {/* Order Attributes from API */}
        {orderAttributes.map((attr, index) => (
          <div key={index} className="flex justify-between mt-4">
            <span className="text-gray-600 dark:text-gray-400" style={{ color: attr.color }}>
              {attr.label}
            </span>
            <span className="text-gray-900 dark:text-white" style={{ color: attr.color }}>
              {attr.show_currency ? `SAR ${attr.value}` : attr.value}
            </span>
          </div>
        ))}

        {/* Fallback to basic structure if no order attributes */}
        {orderAttributes.length === 0 && (
          <>
            <div className="flex justify-between mt-4">
              <span className="text-gray-600 dark:text-gray-400">
                Subtotal ({totalItems} items)
              </span>
              <span className="text-gray-900 dark:text-white">
                SAR {subTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="text-green-600 dark:text-green-400">Free</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                VAT
              </span>
              <span className="text-gray-900 dark:text-white">
                SAR {vatAmount.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  SAR {amountToPay.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SummaryDetails
