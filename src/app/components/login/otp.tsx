import React from 'react'
import Otp2 from '../../components/Otp'

function OTP() {
  return (
        <div id="otp-step" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 ">
            <div className="mb-6 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{('Verify Your Phone')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {('We sent a verification code to')} <span id="sent-to-phone" className="font-medium"></span>
                </p>
            </div>
         <Otp2/>
        </div>
  )
}

export default OTP
