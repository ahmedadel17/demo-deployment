'use client'
import React from 'react'
import OrderSummary from '../components/checkout/orderSummary'
import { useTranslations } from 'next-intl';  

const CheckoutLayout = ({children}: {children: React.ReactNode}) => {
  const t = useTranslations();
  return (
    <div className="products-layout">
    <section className="te-section dark:bg-gray-900">
 <div className="container">
   {/* Page Title */}
   <div className="mb-8">
     <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('Checkout')}</h1>
     <p className="text-gray-600 dark:text-gray-400 mt-2">{t('Complete your purchase')}</p>
   </div>

   {/* Checkout Content */}
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     {/* Left Column - Forms */}
     <div className="lg:col-span-2 space-y-8">
        

     {children}

         

     </div>

     {/* Right Column - Order Summary */}
     <OrderSummary />
   </div>
 </div>
</section>
</div>
  )
}

export default CheckoutLayout
