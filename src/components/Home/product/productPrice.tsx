import React from 'react'

function ProductPrice({ old_price, price_after_discount, price }: { old_price: string | null | undefined, price_after_discount: string | null | undefined, price: string }) {
  return (
    <div className="flex items-center gap-2">
            {old_price && (
              <p className="text-gray-500 dark:text-gray-300 line-through text-sm">
                {old_price} 
                <span className="icon-riyal-symbol text-xs"></span>
              </p>
            )}
            <p className="text-sm font-semibold text-primary-600 dark:text-white">
              {price_after_discount || price}
              <span className="icon-riyal-symbol text-xs"></span>
            </p>
          </div>
  )
}

export default ProductPrice
