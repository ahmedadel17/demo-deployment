import React from 'react'

interface ProductCategoryProps {
  category?: string
}

function ProductCategory({ category }: ProductCategoryProps) {
  if (!category) {
    return null
  }

  return (
    <p className="product-category text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
      {category}
    </p>
  )
}

export default ProductCategory

