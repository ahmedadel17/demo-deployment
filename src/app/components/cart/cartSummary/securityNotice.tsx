import React from 'react'
import { useTranslations } from 'next-intl';
function SecurityNotice() {
  const t = useTranslations();
  return (
    <>
       <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            {t("Secure checkout guaranteed")}
          </div>
    </>
  )
}

export default SecurityNotice
