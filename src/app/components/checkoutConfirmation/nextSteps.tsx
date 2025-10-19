import React from 'react'

function NextSteps() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What happens next?</h3>
    <div className="space-y-6">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">1</span>
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-white">Order Processing</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Well prepare your order within 1-2 business days</p>
            </div>
        </div>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">2</span>
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-white">Shipping Notification</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">You ll receive tracking information once your order ships</p>
            </div>
        </div>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">3</span>
            </div>
            <div>
                <p className="font-medium text-gray-900 dark:text-white">Delivery</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your order will arrive within 5-7 business days</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default NextSteps
