import React from 'react'

function ProductMeta() {
  return (
    <>
        <div className="product-meta text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <p><span className="font-medium text-gray-900 dark:text-white">SKU:</span> CHN-SHORTS-MRCR-BLUE-M</p>
                    <p>
                        <span className="font-medium text-gray-900 dark:text-white">Category:</span>
                        <a href="/category/clothing" className="text-primary-600 dark:text-primary-200 hover:underline">Clothing</a>
                    </p>
                    <p>
                        <span className="font-medium text-gray-900 dark:text-white">Tags:</span>
                        <a href="/tag/shorts" className="text-primary-600 dark:text-primary-200 hover:underline">Shorts</a>,
                        <a href="/tag/chino" className="text-primary-600 dark:text-primary-200 hover:underline">Chino</a>,
                        <a href="/tag/casual" className="text-primary-600 dark:text-primary-200 hover:underline">Casual</a>,
                        <a href="/tag/men" className="text-primary-600 dark:text-primary-200 hover:underline">Men</a>
                    </p>
                </div>
    </>
  )
}

export default ProductMeta
