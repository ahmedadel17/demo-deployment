import React from 'react'

function ProductFeatures() {
  return (
    <div>
      <div className="space-y-6">

    {/* <!-- Quantity Breaks Pricing --> */}
    <div className="quantity-breaks bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
        <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            Volume Discounts Available
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border">
                <span className="text-gray-600 dark:text-gray-400">Buy 2-4:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">5% off</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border">
                <span className="text-gray-600 dark:text-gray-400">Buy 5-9:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">10% off</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border">
                <span className="text-gray-600 dark:text-gray-400">Buy 10+:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">15% off</span>
            </div>
        </div>
    </div>

    {/* <!-- Bundle Deals --> */}
    <div className="bundle-deals bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
            </svg>
            Frequently Bought Together
        </h4>

        <div className="space-y-3">
            {/* <!-- Bundle Item 1 --> */}
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded border">
                <input type="checkbox" id="bundle1" checked/>
                <img src="https://placehold.co/40x40" alt="Belt" className="w-10 h-10 rounded objectCover"/>
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Leather Belt</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Perfect match for these shorts</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        <span className="icon-riyal-symbol text-xs mr-1"></span>45.00
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                        <span className="icon-riyal-symbol text-xs mr-1"></span>55.00
                    </p>
                </div>
            </div>

            {/* <!-- Bundle Item 2 --> */}
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded border">
                <input type="checkbox" id="bundle2" checked/>
                <img src="https://placehold.co/40x40" alt="T-shirt" className="w-10 h-10 rounded objectCover"/>
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Cotton T-Shirt</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Complete the look</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white"><span className="icon-riyal-symbol text-xs mr-1"></span>35.00</p>
                    <p className="text-xs text-gray-500 line-through"><svg className="inline-block w-2 h-2 lg:w-3 lg:h-3 text-gray-800 dark:text-white" width="13" height="15" viewBox="0 0 13 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.37833 14.7315L12.153 13.917L12.7727 12.3003L7.99858 13.1148L7.37833 14.7315Z"></path>
                            <path d="M9.09164 8.45597L12.3802 7.89488L13 6.27819L9.14046 6.9369L9.31351 1.58047L7.7836 2.80667L7.6416 7.19279L6.19205 7.4403L6.40998 0.731445L4.88006 1.95765L4.69468 7.6952L1.52292 8.23656L0.903169 9.85325L4.64587 9.21476L4.58522 11.0933L0.664042 11.7623L0.0437927 13.3785L4.3244 12.6478C4.51817 12.6148 4.6932 12.5132 4.81794 12.3619L5.90559 11.0435C6.02097 10.9039 6.08654 10.7299 6.09246 10.5489L6.14373 8.95838L7.59328 8.71087L7.49714 11.6879L12.3142 10.866L12.9339 9.24927L9.04431 9.91291L9.09164 8.45498V8.45597Z"></path>
                        </svg>42.00</p>
                </div>
            </div>

            {/* <!-- Bundle Summary --> */}
            <div className="border-t border-blue-200 dark:border-blue-700 pt-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Bundle Total:</span>
                    <div className="text-right">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400"><span className="icon-riyal-symbol text-xs mr-1"></span>245.00</span>
                        <span className="text-sm text-gray-500 line-through ml-2"><span className="icon-riyal-symbol text-xs mr-1"></span>297.00</span>
                    </div>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Save <span className="icon-riyal-symbol text-xs mr-1"></span>52.00 (17% off) when buying together!</p>
            </div>
        </div>
    </div>

    {/* <!-- Delivery Date Calculator --> */}
    <div className="delivery-calculator bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Estimated Delivery
        </h4>

        <div className="space-y-3">
            {/* <!-- ZIP Code Input --> */}
            <div className="flex gap-2">
                <input type="text" id="zipCode" placeholder="Enter ZIP code" maxLength={5}/>
                <button id="calculateDelivery" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                    Calculate
                </button>
            </div>

            {/* <!-- Delivery Options --> */}
            <div id="deliveryOptions" className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                    <div className="flex items-center gap-3">
                        <input type="radio" name="delivery" id="standard" value="standard" checked/>
                        <div>
                            {/* <label for="standard" className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Standard Delivery</label> */}
                            <p className="text-xs text-gray-500 dark:text-gray-400">5-7 business days</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">FREE</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Sep 8-10</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                    <div className="flex items-center gap-3">
                        <input type="radio" name="delivery" id="express" value="express"/>
                        <div>
                            {/* <label for="express" className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Express Delivery</label> */}
                            <p className="text-xs text-gray-500 dark:text-gray-400">2-3 business days</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white"><span className="icon-riyal-symbol text-xs mr-1"></span>9.99</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">Sep 5-6</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                    <div className="flex items-center gap-3">
                        <input type="radio" name="delivery" id="overnight" value="overnight"/>
                        <div>
                            {/* <label for="overnight" className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">Overnight Delivery</label> */}
                            <p className="text-xs text-gray-500 dark:text-gray-400">Next business day</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white"><span className="icon-riyal-symbol text-xs mr-1"></span>24.99</p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">Sep 4</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Payment Methods --> */}
    <div className="payment-methods bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Payment Options
        </h4>

        {/* <!-- Payment Icons --> */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
            <img src="https://placehold.co/40x25/1976D2/white?text=VISA" alt="Visa" className="h-6 rounded border"/>
            <img src="https://placehold.co/40x25/DC143C/white?text=MC" alt="Mastercard" className="h-6 rounded border"/>
            <img src="https://placehold.co/40x25/0070BA/white?text=PP" alt="PayPal" className="h-6 rounded border"/>
            <img src="https://placehold.co/40x25/000000/white?text=AMEX" alt="American Express" className="h-6 rounded border"/>
        </div>

        {/* <!-- Buy Now Pay Later Options --> */}
        <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                <div className="flex items-center gap-3">
                    <img src="https://placehold.co/60x20/6772E5/white?text=Klarna" alt="Klarna" className="h-5"/>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Pay in 4 installments</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400"><span className="icon-riyal-symbol text-xs mr-1"></span>50.00 every 2 weeks</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">0% APR</p>
                </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded border">
                <div className="flex items-center gap-3">
                    <img src="https://placehold.co/60x20/000000/white?text=Affirm" alt="Affirm" className="h-5"/>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Monthly payments</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">As low as <svg className="inline-block w-2 h-2 lg:w-3 lg:h-3 text-gray-800 dark:text-white" width="13" height="15" viewBox="0 0 13 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.37833 14.7315L12.153 13.917L12.7727 12.3003L7.99858 13.1148L7.37833 14.7315Z"></path>
                                <path d="M9.09164 8.45597L12.3802 7.89488L13 6.27819L9.14046 6.9369L9.31351 1.58047L7.7836 2.80667L7.6416 7.19279L6.19205 7.4403L6.40998 0.731445L4.88006 1.95765L4.69468 7.6952L1.52292 8.23656L0.903169 9.85325L4.64587 9.21476L4.58522 11.0933L0.664042 11.7623L0.0437927 13.3785L4.3244 12.6478C4.51817 12.6148 4.6932 12.5132 4.81794 12.3619L5.90559 11.0435C6.02097 10.9039 6.08654 10.7299 6.09246 10.5489L6.14373 8.95838L7.59328 8.71087L7.49714 11.6879L12.3142 10.866L12.9339 9.24927L9.04431 9.91291L9.09164 8.45498V8.45597Z"></path>
                            </svg>17/month</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">10-30% APR</p>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Stock Notifications --> */}
    <div className="stock-notifications bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-200">Low Stock Alert</h4>
        </div>

        <div className="space-y-3">
            <p className="text-sm text-orange-700 dark:text-orange-300">Only 3 items left in your selected size and color!</p>

            {/* <!-- Notify When Available --> */}
            <div className="bg-white dark:bg-gray-800 rounded p-3 border">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox"/>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Notify me when back in stock</span>
                </label>
            </div>

            {/* <!-- Email for notifications --> */}
            <div className="bg-white dark:bg-gray-800 rounded p-3 border">
                {/* <label for="stockEmail" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email for stock updates:</label> */}
                <div className="flex gap-2">
                    <input type="email" id="stockEmail" placeholder="your@email.com"/>
                    <button className="px-3 py-1 bg-orange-600 text-white text-xs font-medium rounded-md hover:bg-orange-700 transition-colors">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Pre-order Section (when out of stock) --> */}
    <div className="pre-order bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800" style={{display: "none"}}>
        <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Pre-Order Available
        </h4>

        <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 rounded p-3 border">
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">Expected restock: <strong>September 15, 2025</strong></p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Pre-order now and we&apos;ll ship as soon as it&apos;s available. You won&apos;t be charged until we ship your order.</p>
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" id="preorderAgree"/>
                {/* <label for="preorderAgree" className="text-xs text-gray-700 dark:text-gray-300">I understand this is a pre-order and shipping will be delayed</label> */}
            </div>
        </div>
    </div>

    {/* <!-- Return Policy Summary --> */}
    <div className="return-policy bg-green-50 dark:bg-green-900/20 rounded-md p-4 border border-green-200 dark:border-green-800">
        <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            30-Day Easy Returns
        </h4>

        <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-700 dark:text-green-300">Free return shipping</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-700 dark:text-green-300">No restocking fees</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-700 dark:text-green-300">Full refund guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-700 dark:text-green-300">Easy online returns</span>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded p-3 border border-green-200 dark:border-green-700">
                <p className="text-xs text-green-700 dark:text-green-300">
                    <strong>How it works:</strong> Simply initiate a return request within 30 days, print the prepaid shipping label, and send it back. Refunds are processed within 3-5 business days of receiving your return.
                </p>
                <button className="mt-2 text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 underline">
                    Read full return policy
                </button>
            </div>
        </div>
    </div>

    {/* <!-- Trust Indicators Summary --> */}
    <div className="trust-summary bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center">Why Shop With Confidence</h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-xs font-medium text-gray-900 dark:text-white">Trusted by</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">50K+ customers</p>
            </div>

            <div className="text-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-xs font-medium text-gray-900 dark:text-white">Secure</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">SSL encrypted</p>
            </div>

            <div className="text-center">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                <p className="text-xs font-medium text-gray-900 dark:text-white">Rated</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">4.9/5 stars</p>
            </div>

            <div className="text-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <p className="text-xs font-medium text-gray-900 dark:text-white">Loved</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">98% recommend</p>
            </div>
        </div>

        {/* <!-- Overall Trust Score --> */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.238.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-green-800 dark:text-green-200">Trustpilot Excellent Rating</span>
                <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-sm font-semibold text-green-800 dark:text-green-200">4.9</span>
                </div>
            </div>
        </div>
    </div>


</div>
    </div>
  )
}

export default ProductFeatures
