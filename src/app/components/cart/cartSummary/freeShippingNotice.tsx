'use client'
import React from 'react'
import { useTranslations } from 'next-intl';  
function FreeShippingNotice() {
  const t = useTranslations();
  return (
    <>
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-green-700 dark:text-green-300">
                {t("You qualify for free shipping")}!
              </span>
            </div>
          </div>
    </>
  )
}

export default FreeShippingNotice
