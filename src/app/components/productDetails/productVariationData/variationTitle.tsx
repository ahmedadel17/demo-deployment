'use client';
import React from 'react'
import { useAppSelector } from '@/app/store/hooks'
function VariationTitle() {
  const { variationData, selectedSizeId, selectedColorId, isLoadingVariation } = useAppSelector((state) => state.product);
console.log('variationData', variationData);
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{variationData?.data?.name}</h2>
    </div>
  )
}

export default VariationTitle
