import React from 'react'

function ProductTitle({ name, slug }: { name: string, slug: string }) {
  return (
    <h3 className="product-title font-semibold text-sm lg:text-base">
            <a href={`/productDetails/${slug}`} className="line-clamp-2">
              {name}
            </a>
          </h3>
  )
}

export default ProductTitle
