'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { clearCompare } from '../../app/store/slices/compareSlice'
import { useRouter } from 'next/navigation'

function CompareBar() {
  const dispatch = useAppDispatch()
  const compareProducts = useAppSelector(state => state.compare.products)
  const router = useRouter()

  const handleCompareNow = () => {
    if (compareProducts.length > 0) {
      router.push('/compare')
    }
  }

  const handleClearAll = () => {
    dispatch(clearCompare())
  }

  if (compareProducts.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg p-4 transform translate-y-0 transition-transform duration-300 z-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
        <span className="font-semibold">Compare Products:</span>
          <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
            {compareProducts.length} {compareProducts.length === 1 ? 'product' : 'products'} selected
          </span>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleCompareNow}
            className="bg-primary-500 text-white font-semibold px-4 py-2 rounded hover:bg-primary-600 dark:bg-primary-200 transition-colors"
          >
            Compare Now
          </button>
          <button
            onClick={handleClearAll}
            className="border border-gray-300 dark:border-gray-200 text-gray-800 dark:text-gray-100 font-semibold px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:border-gray-500 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompareBar
