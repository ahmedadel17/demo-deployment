import React from 'react'

function ProductShare() {
  return (
    <>
      {/* <!-- Enhanced Product Share --> */}
<div className="product-share bg-white dark:bg-gray-800/50 rounded-md p-4 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this product</h3>
        <button id="copyLinkBtn" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200 border border-gray-200 dark:border-gray-600" title="Copy link">
            <svg id="copyIcon" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg id="checkIcon" className="w-4 h-4 hidden text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span id="copyText">Copy Link</span>
        </button>
    </div>

    <nav aria-label="Share this product">
        {/* <!-- Social Media Platforms --> */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <a className="group flex flex-col items-center justify-center gap-2 p-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 bg-white dark:bg-gray-700 hover:border-blue-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 transform hover:scale-105"
                href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode('http://192.168.1.55/product/mercer-chino-shorts'); ?>"
                target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <svg className="w-6 h-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-xs">Facebook</span>
            </a>

            <a className="group flex flex-col items-center justify-center gap-2 p-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-sky-500 dark:hover:bg-sky-500 bg-white dark:bg-gray-700 hover:border-sky-500 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 transform hover:scale-105"
                href="https://twitter.com/intent/tweet?url=<?php echo urlencode('http://192.168.1.55/product/mercer-chino-shorts'); ?>&text=<?php echo urlencode('Check out these amazing Mercer 7 Inch Chino Shorts!'); ?>"
                target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                <svg className="w-6 h-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span className="text-xs">Twitter</span>
            </a>

            <a className="group flex flex-col items-center justify-center gap-2 p-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-green-500 dark:hover:bg-green-500 bg-white dark:bg-gray-700 hover:border-green-500 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 transform hover:scale-105"
                href="https://api.whatsapp.com/send?text=<?php echo urlencode('Check out these amazing Mercer 7 Inch Chino Shorts! http://192.168.1.55/product/mercer-chino-shorts'); ?>"
                target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
                <svg className="w-6 h-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="text-xs">WhatsApp</span>
            </a>

            <a className="group flex flex-col items-center justify-center gap-2 p-4 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-red-500 dark:hover:bg-red-500 bg-white dark:bg-gray-700 hover:border-red-500 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 transform hover:scale-105"
                href="https://pinterest.com/pin/create/button/?url=<?php echo urlencode('http://192.168.1.55/product/mercer-chino-shorts'); ?>&media=<?php echo urlencode('http://192.168.1.55/images/mercer-shorts-main.jpg'); ?>&description=<?php echo urlencode('Mercer 7 Inch Chino Shorts - Premium quality shorts perfect for everyday wear'); ?>"
                target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest">
                <svg className="w-6 h-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.754-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
                <span className="text-xs">Pinterest</span>
            </a>
        </div>

        {/* <!-- Additional Share Options --> */}
        <div className="flex flex-wrap gap-2">
            <a className="group flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200"
                href="mailto:?subject=<?php echo urlencode('Check out this product: Mercer 7 Inch Chino Shorts'); ?>&body=<?php echo urlencode('I found this amazing product and thought you might be interested: http://192.168.1.55/product/mercer-chino-shorts'); ?>"
                target="_blank" rel="noopener noreferrer" aria-label="Share via Email">
                <svg className="w-4 h-4 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email</span>
            </a>

            <a className="group flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-700 dark:hover:bg-blue-700 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200"
                href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo urlencode('http://192.168.1.55/product/mercer-chino-shorts'); ?>"
                target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <svg className="w-4 h-4 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
            </a>

            <button id="shareApiBtn" className="group flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200"
                aria-label="Share via device">
                <svg className="w-4 h-4 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>More Options</span>
            </button>
        </div>
    </nav>

    {/* <!-- QR Code Section (Optional) --> */}
    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
            <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Share via QR Code</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Scan to view this product</p>
            </div>
            <button id="toggleQR" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span>Show QR</span>
            </button>
        </div>
        <div id="qrCode" className="hidden mt-3 flex justify-center">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                {/* <!-- QR Code would be generated here --> */}
                <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">QR Code</span>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default ProductShare
