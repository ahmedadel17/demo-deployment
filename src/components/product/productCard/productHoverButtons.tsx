'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks'
import { toggleCompareProduct, CompareProduct } from '../../../app/store/slices/compareSlice'
import { toast } from 'react-hot-toast'

interface ProductHoverButtonsProps {
  onQuickViewClick?: () => void
  product?: CompareProduct
  // Legacy props for backward compatibility
  productId?: number | string
  productTitle?: string
  productPrice?: string
  productImage?: string
}

function ProductHoverButtons({ 
  onQuickViewClick, 
  product,
  productId, 
  productTitle, 
  productPrice, 
  productImage 
}: ProductHoverButtonsProps) {
  const dispatch = useAppDispatch()
  const compareProducts = useAppSelector(state => state.compare.products)
  
  // Use product object if provided, otherwise fall back to individual props
  const currentProductId = product?.id || productId
  const inCompare = currentProductId ? compareProducts.some(p => String(p.id) === String(currentProductId)) : false

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // If full product object is provided, use it
    if (product) {
      const isCurrentlyInCompare = compareProducts.some(p => String(p.id) === String(product.id))
      
      if (isCurrentlyInCompare) {
        toast.success('Removed from compare')
      } else {
        if (compareProducts.length >= 4) {
          toast.error('You can only compare up to 4 products at a time.')
          return
        }
        toast.success('Added to compare')
      }

      dispatch(toggleCompareProduct(product))
      return
    }

    // Fallback to individual props (legacy support)
    if (!productId || !productTitle || !productPrice || !productImage) {
      console.warn('Missing product data for compare')
      return
    }

    const isCurrentlyInCompare = compareProducts.some(p => String(p.id) === String(productId))
    
    if (isCurrentlyInCompare) {
      toast.success('Removed from compare')
    } else {
      if (compareProducts.length >= 4) {
        toast.error('You can only compare up to 4 products at a time.')
        return
      }
      toast.success('Added to compare')
    }

    dispatch(toggleCompareProduct({
      id: productId,
      title: productTitle,
      price: productPrice,
      image: productImage,
      name: productTitle,
      thumbnail: productImage
    }))
  }

  return (
    <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 gap-1">
      {/* Compare Button */}
      <button
        className={`compare-btn w-8 h-8 lg:w-10 lg:h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
          inCompare 
            ? 'bg-primary-300 text-white' 
            : 'bg-white text-gray-700 hover:bg-primary-300 hover:text-white'
        }`}
        title={inCompare ? "Remove from Compare" : "Add to Compare"}
        onClick={handleCompareClick}
        data-product-id={currentProductId}
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

