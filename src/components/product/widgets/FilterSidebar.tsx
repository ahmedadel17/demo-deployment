'use client'
import React, { useEffect, useState, useRef } from 'react'
import PriceFilterWidget from './priceWidget'
import CategoryWidget from './categoryWidget'
import VariableWidget from './variableWidget'
import getRequest from '../../../../helpers/get'
import { useLocale } from 'next-intl'
import { useAuth } from '@/app/hooks/useAuth'
import { transformCategories, createDefaultCategoryStructure, ApiCategory, Category } from '../../../app/utils/categoryMapper'
function FilterSidebar() {
  const locale = useLocale()
  const {token} = useAuth()
  const [formState, setFormState] = useState<{data?: {price_range?: {min: number, max: number}, attributes?: Array<{id: number, name: string, type: 'multi' | 'color', values: Array<{id: number, value: string, color?: string}>}>, categories?: Array<{id: number, name: string, slug: string, count: number, image: string}>}}>()
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    // Only fetch once on initial page load, never again
    if (hasFetched.current) return
    hasFetched.current = true
    
    // Fetch only once on initial mount
    ;(async () => {
      try {
        setError(null)
        // Fetch initial filter data (without categories) once
        const filterResponse = await getRequest(`/catalog/filter-data?`, {}, token, locale)
        setFormState(filterResponse)
        console.log('filterResponse', filterResponse)
        
      
      } catch (error) {
        console.error('Error fetching filter data:', error)
        const errorMessage = error instanceof Error ? error.message : 'Network Error: Something went wrong. Please try again.'
        setError(errorMessage)
      }
    })()
    // Empty dependency array ensures this only runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
//  console.log('formState', formState)
  return (
    <div className="lg:col-span-1 hidden xl:block">
      <div className="sticky top-8 space-y-6">
        {error ? (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                  Unable to load filters
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  {error}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <PriceFilterWidget min={formState?.data?.price_range?.min} max={formState?.data?.price_range?.max} />
            <CategoryWidget categories={formState?.data?.categories || []} />
            <VariableWidget attributes={formState?.data?.attributes || []} />
          </>
        )}
      </div>
    </div>
  )
}

export default FilterSidebar
