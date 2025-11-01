'use client'

import React from 'react'

interface ProductFooterProps {
  default_variation_id?: string | number
  isAddingToCart: boolean
  isLoadingVariation: boolean
  selectedColor: string | null
  selectedSize: string | null
  handleAddToCart: () => void
  handleFavoriteToggle: () => void
  isFavorite: boolean
  isFavoriteLoading: boolean
}

function ProductFooter({ default_variation_id, isAddingToCart, isLoadingVariation, selectedColor, selectedSize, handleAddToCart, handleFavoriteToggle, isFavorite, isFavoriteLoading }: ProductFooterProps) {
  return (
    <div className="product-footer mt-auto flex gap-1 lg:gap-2 items-stretch justify-between">
          <button
            className={`product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0 ${
              default_variation_id 
                ? (isAddingToCart || isLoadingVariation)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                : (selectedColor && selectedSize && !isLoadingVariation)
                  ? ''
                  : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Add to Cart"
            onClick={handleAddToCart}
            disabled={
              default_variation_id 
                ? isAddingToCart || isLoadingVariation
                : !selectedColor || !selectedSize || isAddingToCart || isLoadingVariation
            }
          >
            {isAddingToCart ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden lg:block">Adding...</span>
              </>
            ) : isLoadingVariation ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden lg:block">Loading...</span>
              </>
            ) : (
              <>
                <svg
                  className="icon-cart w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                  <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                </svg>
                <span className="hidden lg:block">Add to Cart</span>
              </>
            )}
          </button>

          <button
            className={`product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border transition-all duration-300 ease-in-out w-10 ${
              isFavorite 
                ? 'product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-10 active'
               
                : 'product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-10 '
                } ${isFavoriteLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Add to Wishlist"
            onClick={handleFavoriteToggle}
            disabled={isFavoriteLoading}
            title={isFavoriteLoading ? "Loading..." : isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavoriteLoading ? (
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg
                className={`w-5 h-5 ${isFavorite ? 'wishlist-active' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorite ? "none" : "none"}
                stroke={isFavorite ? "currentColor" : "currentColor"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            )}
          </button>
        </div>
  )
}

export default ProductFooter
