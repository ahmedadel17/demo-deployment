import React from 'react'

function ProductDescription({ short_description, description }: { short_description: string, description: string }) {
  return (
    <>
    <div className="product-desc">
    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
       {short_description}
    </p>
    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
       {description}
    </p>
</div>
</>
  )
}

export default ProductDescription
