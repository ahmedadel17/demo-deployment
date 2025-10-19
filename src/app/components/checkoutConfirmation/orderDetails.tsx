import React from 'react'
import Image from 'next/image'
import OrderAttribute from './orderAttribute'
import TotalAttribute from './totalAttribute'
import { useTranslations } from 'next-intl'
import ProductItem from './productItem'

interface OrderDetailsProps {
  orderData: {
    data?: {
      order_num?: string;
      created_at?: string;
      estimated_delivery?: string;
      products?: any[];
      order_attributes?: any[];
      total_amount?: string | number;
    }
  } | null;
}

function OrderDetails({orderData}: OrderDetailsProps) {
  const t = useTranslations();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
    <div className="p-6 border-b border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t('Order Number')}</h3>
                <p className="text-gray-600 dark:text-gray-400">#ORD-                    {orderData?.data?.order_num}
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t('Order Date')}</h3>
                <p className="text-gray-600 dark:text-gray-400"> {orderData?.data?.created_at}</p>
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{t('Estimated Delivery')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{orderData?.data?.estimated_delivery}</p>
            </div>
        </div>
    </div>

    {/* <!-- Order Items --> */}
    <div className="p-6" >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('Items Ordered')}</h3>
        {orderData?.data?.products?.map((item:any)=>(    
     <ProductItem key={item.id} item={item} />
        ))}
        {/* <!-- Order Summary --> */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="flex justify-end">
                <div className="w-64 space-y-2">
                {
        orderData?.data?.order_attributes?.map((item: any, index: number) => (
            <OrderAttribute key={index} {...item} />
        ))
      }
                   
                       <TotalAttribute value={orderData?.data?.total_amount} label={t('Total')} />
                  
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default OrderDetails
