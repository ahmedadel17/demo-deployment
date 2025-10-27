'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import PriceFilterWidget from './priceWidget'
import CategoryWidget from './categoryWidget'
import VariableWidget from './variableWidget'
import getRequest from '../../../../../helpers/get'
import { useLocale } from 'next-intl'
import { useAuth } from '@/app/hooks/useAuth'
import { transformCategories, createDefaultCategoryStructure, ApiCategory, Category } from '../../../utils/categoryMapper'
function FilterSidebar() {
  const locale = useLocale()
  const {token} = useAuth()
  const searchParams = useSearchParams()
  const [formState, setFormState] = useState<{data?: {price_range?: {min: number, max: number}, attributes?: Array<{id: number, name: string, type: 'multi' | 'color', values: Array<{id: number, value: string, color?: string}>}>}}>()
  const [categories, setCategories] = useState<Category[]>([])
  
  // Function to fetch only filter data (price range, attributes, etc.)
  const fetchFilterData = useCallback(async(selectedCategories?: string[]) => {
    try {
      // Build query parameters for filter data
      const queryParams = new URLSearchParams()
      if (selectedCategories && selectedCategories.length > 0) {
        selectedCategories.forEach(catId => {
          queryParams.append('categories[]', catId)
        })
      }
      
      const filterResponse = await getRequest(`/catalog/filter-data?${queryParams.toString()}`, {}, token, locale)
      setFormState(filterResponse)
      console.log('Filter data updated with categories:', { selectedCategories, response: filterResponse })
    } catch (error) {
      console.error('Error fetching filter data:', error)
    }
  }, [token, locale])

  const fetchData = useCallback(async() => {
    try {
      // Fetch initial filter data without categories
      await fetchFilterData()
      
      // Fetch categories
      const categoriesResponse = await getRequest('/catalog/categories', {}, token, locale)
      console.log('Categories data:', categoriesResponse)
      
      // Transform categories into hierarchical structure
      if (categoriesResponse?.data && Array.isArray(categoriesResponse.data)) {
        const apiCategories: ApiCategory[] = categoriesResponse.data
        const transformedCategories = transformCategories(apiCategories)
        
        // If no hierarchical structure found, create default structure
        const finalCategories = transformedCategories.length > 0 
          ? transformedCategories 
          : createDefaultCategoryStructure(apiCategories)
          
        setCategories(finalCategories)
        console.log('Transformed categories:', finalCategories)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [token, locale, fetchFilterData])
  
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Watch for category changes and refetch filter data
  useEffect(() => {
    // Get selected categories from URL
    const selectedCategories: string[] = []
    const searchParamsString = searchParams.toString()
    
    // Parse categories[] parameters from the URL string
    if (searchParamsString) {
      const urlParams = new URLSearchParams(searchParamsString)
      const categoriesArray = urlParams.getAll('categories[]')
      selectedCategories.push(...categoriesArray)
    }

    // Refetch filter data when categories change
    if (selectedCategories.length > 0) {
      fetchFilterData(selectedCategories)
    } else {
      // If no categories selected, fetch default filter data
      fetchFilterData()
    }
  }, [searchParams, fetchFilterData])
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
