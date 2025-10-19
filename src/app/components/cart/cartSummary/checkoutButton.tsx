import Link from 'next/link'
import React from 'react'

function CheckoutButton() {
 
  return (
    <>
       <Link
            href="/checkout"
            className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block"
          >
            Proceed to Checkout
          </Link>
    </>
  )
}

export default CheckoutButton
