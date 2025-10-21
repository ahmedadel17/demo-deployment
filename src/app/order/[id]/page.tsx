'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import getRequest from '../../../../helpers/get'
import { useAuth } from '@/app/hooks/useAuth'
import { useLocale } from 'next-intl'
import OrderDetails from '@/app/components/checkoutConfirmation/orderDetails'
import SuccessHeader from '@/app/components/checkoutConfirmation/successHeader'

function OrderDetailsPage() {
  const { token } = useAuth()
  const locale = useLocale()
  const { id } = useParams()
  
  // Consolidated state with loading
  const [state, setState] = useState({
    orderData: null as {data?: unknown} | null,
    isLoading: true,
    error: null as string | null
  })

  const getOrderData = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await getRequest(`/order/orders/${id}`, { 'Content-Type': 'application/json' }, token, locale)
      console.log('orderData', response.data)
      setState(prev => ({ 
        ...prev, 
        orderData: response,
        isLoading: false,
        error: null
      }))
    } catch (error) {
      console.error('Error fetching order data:', error)
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to load order details'
      }))
    }
  }, [id, token, locale])

  useEffect(() => {
    getOrderData()
  }, [getOrderData])
  // Loading state
  if (state.isLoading) {
    return (
      <div className='container mx-auto mt-6 mb-4'>
        <SuccessHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (state.error) {
    return (
      <div className='container mx-auto mt-6 mb-4'>
        <SuccessHeader />
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 dark:text-red-400 mb-4">{state.error}</p>
            <button 
              onClick={getOrderData}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto mt-6 mb-4'>
      <SuccessHeader />
      <OrderDetails orderData={state.orderData as {data?: unknown} | null} />
    </div>
  )
}

export default OrderDetailsPage
