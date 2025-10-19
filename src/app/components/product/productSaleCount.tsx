import React from 'react'

function ProductSaleCount() {
  return (
    <>
    {/* Sale Product Count */}
<div className="sale-product-count bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="icon-riyal-symbol text-white"></span>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">Sale Items</h3>
                <p className="text-sm text-red-600 dark:text-red-400">Limited time offers</p>
            </div>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">15</div>
            <div className="text-sm text-red-600 dark:text-red-400">Products</div>
        </div>
    </div>
</div>

{/* New Product Count */}
<div className="new-product-count bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">New Arrivals</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Fresh products just in</p>
            </div>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">8</div>
            <div className="text-sm text-green-600 dark:text-green-400">Products</div>
        </div>
    </div>
</div>

{/* Bestseller Product Count */}
<div className="bestseller-product-count bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Best Sellers</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Most popular items</p>
            </div>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">23</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Products</div>
        </div>
    </div>
</div>

{/* Limited Product Count */}
<div className="limited-product-count bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Limited Edition</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">Exclusive items</p>
            </div>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">5</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Products</div>
        </div>
    </div>
</div>

{/* Hot Product Count */}
<div className="hot-product-count bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                </svg>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">Hot Items</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">Trending now</p>
            </div>
        </div>
        <div className="text-right">
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">12</div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Products</div>
        </div>
    </div>
</div>

{/* Combined Product Count Dashboard */}
<div className="product-count-dashboard bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Product Overview</h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* <!-- Total Products --> */}
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
            </div>
            <div className="text-lg font-bold text-gray-700 dark:text-gray-300">63</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
        </div>

        {/* <!-- Sale Products --> */}
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="icon-riyal-symbol text-xs text-white"></span>
            </div>
            <div className="text-lg font-bold text-red-700 dark:text-red-300">15</div>
            <div className="text-xs text-red-600 dark:text-red-400">Sale</div>
        </div>

        {/* <!-- New Products --> */}
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">8</div>
            <div className="text-xs text-green-600 dark:text-green-400">New</div>
        </div>

        {/* <!-- Bestseller Products --> */}
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
            </div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">23</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Bestseller</div>
        </div>

        {/* <!-- Limited Products --> */}
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            </div>
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">5</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">Limited</div>
        </div>

        {/* <!-- Hot Products --> */}
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                </svg>
            </div>
            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">12</div>
            <div className="text-xs text-orange-600 dark:text-orange-400">Hot</div>
        </div>
    </div>
</div>
    </>

  )
}

export default ProductSaleCount
