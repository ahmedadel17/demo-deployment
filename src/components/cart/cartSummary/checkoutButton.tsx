'use client'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl';
function CheckoutButton() {
  const t = useTranslations();
  return (
    <>
       <Link
            href="/checkout"
            className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block"
          >
            {t("Proceed to Checkout")}    
          </Link>
    </>
  )
}

export default CheckoutButton
