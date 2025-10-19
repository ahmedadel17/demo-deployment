'use client';
import { useAppSelector } from '@/app/store/hooks';
import React from 'react'

function VariationPrice() {
  const { variationData, selectedSizeId, selectedColorId, isLoadingVariation } = useAppSelector((state) => state.product);
  return (
    <>
    <div className="product-price flex items-baseline gap-2">
    <span className="text-3xl font-bold text-secondary-600">
        <span className="icon-riyal-symbol"></span>
        <span>{(variationData?.data as any)?.price_after_discount}</span>
    </span>
    {(variationData?.data as any)?.price_befor_discount && <span  className="text-lg text-gray-500 dark:text-gray-400 line-through">
        <span className="icon-riyal-symbol"></span>
        <span>{(variationData?.data as any)?.price_befor_discount}</span>
    </span>}
</div>
</>
  )
}

export default VariationPrice
