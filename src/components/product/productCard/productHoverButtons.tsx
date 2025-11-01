'use client'

import React from 'react'

interface ProductHoverButtonsProps {
  onCompareClick?: () => void
  onQuickViewClick?: () => void
  productId?: number | string
}

function ProductHoverButtons({ onCompareClick, onQuickViewClick, productId }: ProductHoverButtonsProps) {
  return (
    <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 gap-1">
      {/* Compare Button */}
      <button
        className="compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center"
        title="Add to Compare"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onCompareClick?.()
        }}
        data-product-id={productId}
      >
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <path d="M11 18H8a2 2 0 0 1-2-2V9" />
        </svg>
      </button>

      {/* Quick View Button */}
      <button
        className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
        title="Quick View"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onQuickViewClick?.()
        }}
      >
        <svg
          className="w-4 h-4 lg:w-5 lg:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
            9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
            0-8.268-2.943-9.542-7z"
          />
        </svg>
      </button>
    </div>
  )
}

export default ProductHoverButtons

