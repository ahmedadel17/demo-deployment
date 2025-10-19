import React from 'react'
import { useTranslations } from 'next-intl';
function ShippingInfo({address}: {address: any}) {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('Shipping Address')}</h3>
        <div className="text-gray-600 dark:text-gray-400 space-y-2">
            <p className="font-medium text-gray-900 dark:text-white">{address?.name}</p>
            <p>{address?.street}</p>
            <p>{address?.house}</p>

            <p>{address?.address}</p>
            <p>United States</p>
        </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{address?.name}</h3>
        <div className="text-gray-600 dark:text-gray-400 space-y-2">
            <p>john.doe@example.com</p>
            <p>{address?.contact_phone}</p>
        </div>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">{t('Shipping Method')}</h4>
        <p className="text-gray-600 dark:text-gray-400">Standard Shipping (5-7 business days)</p>
    </div>
</div>
  )
}

export default ShippingInfo
