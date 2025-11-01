import React from 'react'

function ProductTabs() {
  return (
    <>
      {/* <!-- Tab Navigation --> */}
<div className="product-tabs">

    <div className="border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
        <nav className="flex space-x-8 min-w-max">
            <button className="tab-button py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 border-primary-600 text-primary-600" data-tab="description">
                Description
            </button>
            <button className="tab-button py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300" data-tab="reviews">
                Reviews (89)
            </button>
            <button className="tab-button py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300" data-tab="shipping">
                Shipping & Returns
            </button>
        </nav>
    </div>


    {/* <!-- Tab Content --> */}
    <div className="tab-content">
        {/* <!-- Description Tab --> */}
        <div id="description" className="tab-panel">

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Product Details</h3>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                    Experience ultimate comfort with our Mercer 7 Inch Chino Shorts. Made from 100% organic cotton with a soft, breathable fabric thats perfect for everyday wear. Features a classNameic fit and durable construction that maintains its shape wash after wash.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Features</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 me-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                                100% Organic Cotton
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 me-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                                7-inch inseam for perfect length
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 me-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                                classNameic chino styling
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 text-green-500 me-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                </svg>
                                Machine washable
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technical Specifications</h4>
                        <dl className="space-y-2">
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Fabric Weight:</dt>
                                <dd className="font-medium">280 GSM</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Thread Count:</dt>
                                <dd className="font-medium">220 TPI</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Shrinkage:</dt>
                                <dd className="font-medium">
                                     3% after wash</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Color Fastness:</dt>
                                <dd className="font-medium">Grade 4-5</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">UV Protection:</dt>
                                <dd className="font-medium">UPF 15+</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Breathability:</dt>
                                <dd className="font-medium">High (850+ CFM)</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Moisture Management:</dt>
                                <dd className="font-medium">Quick-dry finish</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Stretch Recovery:</dt>
                                <dd className="font-medium">95% retention</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

        </div>

        {/* <!-- Reviews Tab --> */}
        <div id="reviews" className="tab-panel hidden">
            {/* <!-- Review Summary --> */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Customer Reviews</h3>
                    <button className="te-btn te-btn-primary">
                        Write a Review
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center mb-4">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white me-2">4.2</span>
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="flex space-x-1">
                                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        <svg className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Based on 89 reviews</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">5★</span>
                                <div className="flex-1 mx-2">
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "45%" }}></div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">40</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">4★</span>
                                <div className="flex-1 mx-2">
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "30%" }}></div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">27</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">3★</span>
                                <div className="flex-1 mx-2">
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "15%" }}></div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">13</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">2★</span>
                                <div className="flex-1 mx-2">
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "7%" }}></div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">6</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">1★</span>
                                <div className="flex-1 mx-2">
                                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "3%" }}></div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Individual Reviews --> */}
            <div className="space-y-6">
                {/* <!-- Review 1 --> */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                                M
                            </div>
                            <div className="ml-3">
                                <h4 className="font-medium text-gray-900 dark:text-white">Mike Johnson</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Verified Purchase</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center mb-1">
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
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">2 days ago</p>
                        </div>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Perfect fit and great quality!</h5>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        These shorts are exactly what I was looking for. The 7-inch inseam is perfect for my height, and the organic cotton feels incredibly soft. The fit is true to size and very comfortable for all-day wear. Highly recommend!
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="mr-4">Size: L</span>
                        <span className="mr-4">Color: Blue</span>
                        <button className="text-primary-600 hover:text-primary-700">Helpful (12)</button>
                    </div>
                </div>

                {/* <!-- Review 2 --> */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                                S
                            </div>
                            <div className="ml-3">
                                <h4 className="font-medium text-gray-900 dark:text-white">Sarah Chen</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Verified Purchase</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center mb-1">
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
                                    <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">5 days ago</p>
                        </div>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Great shorts but sizing runs small</h5>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Love the quality and comfort of these shorts. The organic cotton is really nice and they wash well. Only issue is the sizing runs a bit small - I usually wear medium but had to exchange for large. Otherwise, very happy with the purchase!
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="mr-4">Size: L</span>
                        <span className="mr-4">Color: Black</span>
                        <button className="text-primary-600 hover:text-primary-700">Helpful (8)</button>
                    </div>
                </div>

                {/* <!-- Review 3 --> */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                J
                            </div>
                            <div className="ml-3">
                                <h4 className="font-medium text-gray-900 dark:text-white">James Wilson</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Verified Purchase</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center mb-1">
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
                                    <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">1 week ago</p>
                        </div>
                    </div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Good quality but could be better</h5>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The material is nice and the construction seems solid. However, I found the pockets to be a bit shallow and the waistband could use more stretch. For the price, they are decent but not exceptional.
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="mr-4">Size: M</span>
                        <span className="mr-4">Color: Green</span>
                        <button className="text-primary-600 hover:text-primary-700">Helpful (4)</button>
                    </div>
                </div>
            </div>

            {/* <!-- Load More Reviews Button --> */}
            <div className="text-center mt-8">
                <button className="te-btn te-btn-default">
                    Load More Reviews
                </button>
            </div>
        </div>

        {/* <!-- Shipping & Returns Tab --> */}
        <div id="shipping" className="tab-panel hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Information</h3>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Free Standard Shipping</h4>
                                <p className="text-sm">5-7 business days on orders over $75</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Express Shipping</h4>
                                <p className="text-sm">2-3 business days for $12.99</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Same Day Delivery</h4>
                                <p className="text-sm">Available in select cities for $24.99</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Returns & Exchanges</h3>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">30-Day Return Policy</h4>
                                <p className="text-sm">Free returns within 30 days of purchase</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Easy Exchanges</h4>
                                <p className="text-sm">Size exchanges processed within 2 business days</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Quality Guarantee</h4>
                                <p className="text-sm">100% satisfaction guaranteed or your money back</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</div>
    </>
  )
}

export default ProductTabs
