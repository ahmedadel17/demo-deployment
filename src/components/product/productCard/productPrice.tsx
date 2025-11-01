import React from 'react'

function ProductPrice({ min_price, price_after_discount }: { min_price: number, price_after_discount: number }) {
  return (
    <div className="product-price flex items-center gap-1">
            {min_price && (
              <p className="text-gray-500 line-through text-sm flex items-center gap-1">
                <span className="icon-riyal-symbol"></span>
                {min_price}
              </p>
            )}
            <p className="text-sm lg:text-base font-semibold text-secondary-600 flex items-center gap-1">
              <span className="icon-riyal-symbol"></span>
              {price_after_discount}
            </p>
          </div>
  )
}

export default ProductPrice
