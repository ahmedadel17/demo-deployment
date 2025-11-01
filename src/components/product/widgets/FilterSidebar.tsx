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
  const [formState, setFormState] = useState<{data?: {price_range?: {min: number, max: number}, attributes?: Array<{id: number, name: string, type: 'multi' | 'color', values: Array<{id: number, value: string, color?: string}>}>}}>()
  const [categories, setCategories] = useState<Category[]>([])
  
  const hasFetched = useRef(false)

  useEffect(() => {
    // Only fetch once on initial page load, never again
    if (hasFetched.current) return
    hasFetched.current = true
    
    // Fetch only once on initial mount
    ;(async () => {
      try {
        // Fetch initial filter data (without categories) once
        const filterResponse = await getRequest(`/catalog/filter-data?`, {}, token, locale)
        setFormState(filterResponse)
        
        // Fetch categories once
        const categoriesResponse = await getRequest('/catalog/categories', {}, token, locale)
        if (categoriesResponse?.data && Array.isArray(categoriesResponse.data)) {
          const apiCategories: ApiCategory[] = categoriesResponse.data
          const transformedCategories = transformCategories(apiCategories)
          const finalCategories = transformedCategories.length > 0 
            ? transformedCategories 
            : createDefaultCategoryStructure(apiCategories)
          setCategories(finalCategories)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })()
    // Empty dependency array ensures this only runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
//  console.log('formState', formState)
  return (
    <div className="lg:col-span-1 hidden xl:block">
      <div className="sticky top-8 space-y-6">
        <PriceFilterWidget min={formState?.data?.price_range?.min} max={formState?.data?.price_range?.max} />
        <CategoryWidget categories={categories} />
        <VariableWidget attributes={formState?.data?.attributes || []} />
      </div>
    </div>
  )
}

export default FilterSidebar
