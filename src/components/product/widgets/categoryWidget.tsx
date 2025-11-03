'use client'

import React, {useMemo, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
type SubCategory = {
  id: number
  name: string
  slug?: string
  count?: number
  image?: string
  children?: SubCategory[]
}

type Category = {
  id: number
  name: string
  slug?: string
  count?: number
  image?: string
  sub?: SubCategory[]
  children?: SubCategory[]
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Men',
    count: 45,
    slug: 'men',
    image: '/images/men.jpg',
    sub: [
      {id: 11, name: 'T-Shirts', slug: 't-shirts', count: 12, image: '/images/t-shirts.jpg'},
      {id: 12, name: 'Jeans', slug: 'jeans', count: 18, image: '/images/jeans.jpg'},
      {id: 13, name: 'Shirts', slug: 'shirts', count: 15, image: '/images/shirts.jpg'}
    ]
  },
  {
    id: 2,
    name: 'Women',
    count: 31,
    slug: 'women',
    image: '/images/women.jpg',
    sub: [
      {id: 21, name: 'T-Shirts', slug: 't-shirts', count: 6, image: '/images/t-shirts.jpg'},
      {id: 22, name: 'Jeans', slug: 'jeans', count: 88, image: '/images/jeans.jpg'},
      {id: 23, name: 'Shirts', slug: 'shirts', count: 120, image: '/images/shirts.jpg'}
    ]
  },
  {
    id: 3,
    name: 'Kids',
    count: 69,
    slug: 'kid',
    image: '/images/kids.jpg',
    sub: [
      {id: 31, name: 'T-Shirts', slug: 't-shirts', count: 45, image: '/images/t-shirts.jpg'},
      {id: 32, name: 'Jeans', slug: 'jeans', count: 21, image: '/images/jeans.jpg'},
      {id: 33, name: 'Shirts', slug: 'shirts', count: 10, image: '/images/shirts.jpg'}
    ]
  },
  {
    id: 4,
    name: 'Accessories',
    count: 23,
    slug: 'accessories',
    image: '/images/accessories.jpg',
    sub: [
      {id: 41, name: 'Bags', slug: 'bags', count: 8, image: '/images/bags.jpg'},
      {id: 42, name: 'Belts', slug: 'belts', count: 9, image: '/images/belts.jpg'},
      {id: 43, name: 'Hats', slug: 'hats', count: 6, image: '/images/hats.jpg'}
    ]
  },
  {id: 5, name: 'Sports', count: 22, slug: 'sports', image: '/images/sports.jpg'}
]

type Props = {
  categories?: Category[]
}

export default function CategoryWidget({categories}: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const t = useTranslations()
  // Get all selected categories from URL (categories[] array format)
  const selectedCategories = useMemo(() => {
    // Read categories[] array from URL
    const categoriesArray = params.getAll('categories[]')
    if (categoriesArray.length > 0) {
      return categoriesArray.map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    }
    // Fallback to comma-separated categories if exists
    const categoriesParam = params.get('categories')
    if (categoriesParam) {
      return categoriesParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    }
    return []
  }, [params])
  
  const data = useMemo(() => categories ?? DEFAULT_CATEGORIES, [categories])
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setOpen(prev => ({...prev, [key]: !prev[key]}))
  }

  const toggleCategory = (categoryId: number) => {
    const search = new URLSearchParams(params.toString())
    const currentCategories = [...selectedCategories]
    let newCategories: number[]
    
    if (currentCategories.includes(categoryId)) {
      // Remove category if already selected
      newCategories = currentCategories.filter(id => id !== categoryId)
    } else {
      // Add category if not selected
      newCategories = [...currentCategories, categoryId]
    }
    
    // Remove old categories parameters
    search.delete('categories')
    search.delete('categories[]')
    
    // Update URL with categories[] array format for API (categories[]=1&categories[]=2)
    if (newCategories.length > 0) {
      newCategories.forEach(id => {
        search.append('categories[]', id.toString())
      })
    }
    
    const finalUrl = `/products?${search.toString()}`
    // console.log('🔵 Category Widget - Category selected:', categoryId)
    // console.log('🔵 Category Widget - All selected categories:', newCategories)
    // console.log('🔵 Category Widget - Navigating to:', finalUrl)
    // console.log('🔵 Category Widget - This will trigger products page to fetch from API')
    
    // Keep current page when categories change
    router.push(finalUrl)
  }

  return (
    <div className="category-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Categories')}</h3>
          {selectedCategories.length > 0 && (
            <button
              onClick={() => {
                const search = new URLSearchParams(params.toString())
                search.delete('categories')
                search.delete('categories[]')
                const finalUrl = `/products?${search.toString()}`
                // console.log('🔵 Category Widget - Clearing all categories, navigating to:', finalUrl)
                router.push(finalUrl)
              }}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 font-medium transition-colors"
            >
              {t('Clear All')}
            </button>
          )}
        </div>
        {selectedCategories.length > 0 && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {selectedCategories.length} {t('categories')} {selectedCategories.length === 1 ? t('category') : t('categories')} {t('selected')}
          </div>
        )}
      </div>

      <div className="space-y-1">
        {data.map(cat => {
          const key = cat.slug || String(cat.id)
          const children = Array.isArray(cat.children) && cat.children.length > 0 ? cat.children : (Array.isArray(cat.sub) ? cat.sub : [])
          const hasChildren = children.length > 0
          const isActive = selectedCategories.includes(cat.id)
          const isOpen = open[key] ?? false
          return (
            <div key={key} className="category-group">
              <div
                className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer ${isActive ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                onClick={() => (hasChildren ? toggle(key) : toggleCategory(cat.id))}
              >
                <div className="flex items-center gap-3" onClick={(e) => {e.stopPropagation(); toggleCategory(cat.id)}}>
                  {cat.image && (
                    <Image 
                      src={cat.image} 
                      alt={cat.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover"
                      onError={() => {}}
                    />
                  )}
                  <span className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {typeof cat.count === 'number' && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{cat.count}</span>
                  )}
                  {hasChildren && (
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 rtl:scale-x-[-1] ${isOpen ? 'rotate-90' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>

              {hasChildren && (
                <div className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  {children.map(sub => {
                    const subKey = sub.slug || String(sub.id)
                    const subActive = selectedCategories.includes(sub.id)
                    const subHasChildren = Array.isArray(sub.children) && sub.children.length > 0
                    return (
                      <div key={subKey} className="category-group">
                        <div
                          className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer ${subActive ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                          onClick={() => (subHasChildren ? toggle(subKey) : toggleCategory(sub.id))}
                        >
                          <div className="flex items-center gap-3" onClick={(e) => {e.stopPropagation(); toggleCategory(sub.id)}}>
                            {sub.image && (
                              <Image 
                                src={sub.image} 
                                alt={sub.name}
                                width={20}
                                height={20}
                                className="w-5 h-5 rounded-full object-cover"
                                onError={() => {}}
                              />
                            )}
                            <span className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{sub.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {typeof sub.count === 'number' && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{sub.count}</span>
                            )}
                            {subHasChildren && (
                              <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 rtl:scale-x-[-1] ${open[subKey] ? 'rotate-90' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </div>
                        </div>

                        {subHasChildren && (
                          <div className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ${open[subKey] ? 'max-h-96' : 'max-h-0'}`}>
                            {sub.children!.map(child => (
                              <div key={child.slug || String(child.id)}
                                   className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                   onClick={() => toggleCategory(child.id)}>
                                <div className="flex items-center gap-3">
                                  {child.image && (
                                    <Image 
                                      src={child.image} 
                                      alt={child.name}
                                      width={18}
                                      height={18}
                                      className="w-4.5 h-4.5 rounded-full object-cover"
                                      onError={() => {}}
                                    />
                                  )}
                                  <span className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">{child.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}


