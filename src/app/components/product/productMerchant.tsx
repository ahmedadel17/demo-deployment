import React from 'react'

function ProductMerchant() {
  return (
// <!-- Enhanced Merchant Details -->
<div className="product-merchant bg-white dark:bg-gray-800/50 rounded-md p-4 border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Merchant Details</h3>

    <div className="space-y-4">
        {/* <!-- Merchant Info --> */}
        <div className="flex items-start gap-4">
            <div className="w-8 h-8 flex-shrink-0 mt-1">
                <img src="https://placehold.co/32x32"
                    alt="The Style Hub Logo"
                    className="w-full h-full rounded-full objectCover border-2 border-gray-200 dark:border-gray-600"/>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <a href="/merchant/the-style-hub" className="text-lg font-semibold text-primary-600 dark:text-primary-200 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">
                        The Style Hub
                    </a>
                    {/* <!-- Verified Badge --> */}
                    <div className="flex items-center" title="Verified Merchant">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.238.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* <!-- Rating & Reviews --> */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                        <div className="flex space-x-1">
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.8 (2,847 reviews)</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    A curated collection of modern, stylish apparel for every occasion. Specializing in premium quality clothing with a focus on comfort and contemporary design.
                </p>

                {/* <!-- Merchant Stats --> */}
                <div className="grid grid-cols-3 gap-4 text-center bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">2.8K+</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Products</div>
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">98%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Positive Rating</div>
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">5</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Years Active</div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Service Features --> */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>24/7 Support</span>
                </div>
            </div>
        </div>

        {/* <!-- Action Buttons --> */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="flex gap-3">
                <a href="/merchant/the-style-hub" className="w-1/2 te-btn te-btn-primary">
                    Visit Store
                </a>
                <button className="w-1/2 te-btn te-btn-default">
                    Follow Store
                </button>
            </div>
        </div>

        {/* <!-- Contact Options --> */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Contact Merchant:</span>
                <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Send Message">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Call">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default ProductMerchant
