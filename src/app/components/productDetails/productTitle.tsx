'use client';
import { useAppSelector } from '@/app/store/hooks';
import React from 'react'
import VariationTitle from './productVariationData/variationTitle'
function ProductTitle({ name, rate, rate1, rate2, rate3, rate4, rate5,out_of_stock }: { name: string, rate: number, rate1: number, rate2: number, rate3: number, rate4: number, rate5: number,out_of_stock: boolean }) {
  const { variationData } = useAppSelector((state) => state.product);
  console.log('variationData', variationData);
  return (
    <>
    <h1 className="product-title text-3xl font-bold text-gray-900 dark:text-white mb-2">{name}</h1>
    <VariationTitle />
    <div className="product-rate flex items-center space-x-4">
        <div className="flex items-center">
            <div className="product-rating flex space-x-1">
               {rate1 > 0 && <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>}
                {rate2 > 0 && <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>}
                {rate3 > 0 && <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>}
                {rate4 > 0 && <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>}
                {rate5 > 0 && <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 rtl:ml-0 rtl:mr-2">{rate} (89 reviews)</span>
        </div>
        {variationData && <span className={`product-stock text-sm ${out_of_stock ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{(variationData?.data as any)?.out_of_stock ? 'Out of Stock' : 'In Stock'}</span>}
        {!variationData && <span className={`product-stock text-sm ${out_of_stock ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{out_of_stock ? 'Out of Stock' : 'In Stock'}</span>}
    </div>
</>
  )
}

export default ProductTitle
