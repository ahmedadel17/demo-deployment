'use client';
import React from 'react'
import { useCart } from '@/app/hooks/useCart'
import PromoCode from './cartSummary/promoCode';
import SummaryDetails from './cartSummary/summaryDetails'
import CheckoutButton from './cartSummary/checkoutButton'
import SecurityNotice from './cartSummary/securityNotice'
import FreeShippingNotice from './cartSummary/freeShippingNotice'
import WalletBallanceToggler from './cartSummary/walletBalanceToggler';
import { useTranslations } from 'next-intl';
function CartSummary() {
  const t = useTranslations();
  return (
    <>
       <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("Order Summary")}
          </h2>

          <WalletBallanceToggler />
          {/* Promo Code */}
         <PromoCode />

          {/* Summary Details */}
          <SummaryDetails />

          {/* Checkout Buttons */}
         <CheckoutButton />

          {/* <a
            href="/paypal"
            className="w-full py-3 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors font-medium mb-4 text-center block"
          >
            {t("PayPal Express Checkout")}
          </a> */}

          {/* Security Notice */}
         <SecurityNotice />

          {/* Free Shipping Notice */}
          <FreeShippingNotice />
        </div>
      </div>
    </>
  )
}

export default CartSummary
