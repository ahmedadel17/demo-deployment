import React from 'react'
import Image from 'next/image'
function ProductItem({item}: {item: any}) {
  return (
    <div className="space-y-4" key={item.id}>
            <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Image width={100} height={100} src={item.image} alt="Product" className="w-16 h-16 objectCover rounded-md"/>
                <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.variation}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.qty}</p>
                </div>
                <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                        <span className="icon-riyal-symbol"></span>
                        <span>{item.price}</span>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default ProductItem
