import React from 'react'

function ProductSaleCountDown() {
  return (
    <>
      {/* <!-- Sale Countdown Timer --> */}
<div className="sale-countdown bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="icon-riyal-symbol text-white"></span>
            </div>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">Flash Sale Ends In</h3>
        </div>
    </div>
    <div className="flex items-center gap-2 text-center">
        <div className="bg-red-500 text-white rounded-lg p-2 min-w-[50px]">
            <div className="text-lg font-bold" id="sale-days">02</div>
            <div className="text-xs">Days</div>
        </div>
        <div className="text-red-500 font-bold">:</div>
        <div className="bg-red-500 text-white rounded-lg p-2 min-w-[50px]">
            <div className="text-lg font-bold" id="sale-hours">14</div>
            <div className="text-xs">Hours</div>
        </div>
        <div className="text-red-500 font-bold">:</div>
        <div className="bg-red-500 text-white rounded-lg p-2 min-w-[50px]">
            <div className="text-lg font-bold" id="sale-minutes">23</div>
            <div className="text-xs">Mins</div>
        </div>
        <div className="text-red-500 font-bold">:</div>
        <div className="bg-red-500 text-white rounded-lg p-2 min-w-[50px]">
            <div className="text-lg font-bold" id="sale-seconds">45</div>
            <div className="text-xs">Secs</div>
        </div>
    </div>
</div>

{/* <!-- Limited Time Offer Countdown --> */}
<div className="limited-countdown bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Limited Offer Expires</h3>
        </div>
    </div>
    <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-purple-500 text-white rounded-lg p-3">
            <div className="text-xl font-bold" id="limited-days">07</div>
            <div className="text-xs mt-1">Days</div>
        </div>
        <div className="bg-purple-500 text-white rounded-lg p-3">
            <div className="text-xl font-bold" id="limited-hours">08</div>
            <div className="text-xs mt-1">Hours</div>
        </div>
        <div className="bg-purple-500 text-white rounded-lg p-3">
            <div className="text-xl font-bold" id="limited-minutes">35</div>
            <div className="text-xs mt-1">Minutes</div>
        </div>
        <div className="bg-purple-500 text-white rounded-lg p-3">
            <div className="text-xl font-bold" id="limited-seconds">22</div>
            <div className="text-xs mt-1">Seconds</div>
        </div>
    </div>
</div>

{/* <!-- Hot Deal Countdown - Compact Version --> */}
<div className="hot-countdown bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mb-6">
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                </svg>
            </div>
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Hot Deal:</span>
        </div>
        <div className="flex items-center gap-1 text-orange-700 dark:text-orange-300">
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold" id="hot-hours">12</span>
            <span className="text-xs">:</span>
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold" id="hot-minutes">34</span>
            <span className="text-xs">:</span>
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold" id="hot-seconds">56</span>
        </div>
    </div>
</div>

{/* <!-- New Product Launch Countdown --> */}
<div className="launch-countdown bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
    <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Product Launch</h3>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400">Coming Soon</p>
    </div>
    <div className="flex justify-center gap-4">
        <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-lg font-bold" id="launch-days">15</span>
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Days</div>
        </div>
        <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-lg font-bold" id="launch-hours">06</span>
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Hours</div>
        </div>
        <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-lg font-bold" id="launch-minutes">42</span>
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Minutes</div>
        </div>
    </div>
</div>

{/* <!-- Product Card with Countdown (For individual products) --> */}
<div className="product-card-countdown bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
    <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">Special Offer</h4>
        <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full text-xs font-medium">50% OFF</span>
    </div>
    <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">Offer ends in:</div>
        <div className="flex items-center gap-1">
            <div className="bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded text-xs font-mono" id="card-days">2d</div>
            <div className="bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded text-xs font-mono" id="card-hours">14h</div>
            <div className="bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded text-xs font-mono" id="card-minutes">23m</div>
        </div>
    </div>
</div>

{/* <!-- Inline Product Countdown (For product listings) --> */}
<div className="inline-countdown flex items-center gap-2 text-sm">
    <span className="text-red-600 dark:text-red-400 font-medium">Sale ends:</span>
    <div className="flex items-center gap-1">
        <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold" id="inline-hours">8</span>
        <span className="text-red-500">:</span>
        <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold" id="inline-minutes">42</span>
        <span className="text-red-500">:</span>
        <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold" id="inline-seconds">15</span>
    </div>
</div>
    </>
  )
}

export default ProductSaleCountDown
