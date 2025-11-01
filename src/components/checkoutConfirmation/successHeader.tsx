import React from 'react'
import { useTranslations } from 'next-intl';
function SuccessHeader() {
  const t = useTranslations();
  return (
      <div className="text-center mb-8">
    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
    </div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('Order Confirmed')}!</h1>
    <p className="text-lg text-gray-600 dark:text-gray-400">{t('Thank you for your purchase')}</p>
</div>
  )
}

export default SuccessHeader
