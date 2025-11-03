'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
type Props = {
  min?: number
  max?: number
}

export default function PriceWidget({ min, max }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations()
  // Use dynamic values from parent API request, fallback to defaults only if not provided
  const minPrice = min ?? 0
  const maxPrice = max ?? 1000
  const sliderMax = Math.max(maxPrice * 2, 2000)

  // Get initial values from URL or use API defaults
  const urlMin = searchParams.get('min_price')
  const urlMax = searchParams.get('max_price')
  const initialMin = urlMin ? parseInt(urlMin) : minPrice
  const initialMax = urlMax ? parseInt(urlMax) : maxPrice

  const [minVal, setMinVal] = useState<number>(initialMin)
  const [maxVal, setMaxVal] = useState<number>(initialMax)

  // Update state when props change (when API data arrives)
  useEffect(() => {
    if (min !== undefined && max !== undefined) {
      // If URL has values, keep them; otherwise use API values
      const urlMinCheck = searchParams.get('min_price')
      const urlMaxCheck = searchParams.get('max_price')
      if (!urlMinCheck && !urlMaxCheck) {
        setMinVal(min)
        setMaxVal(max)
      }
    }
  }, [min, max, searchParams])

  // Update URL with price parameters
  const updateUrlParams = useCallback((newMin: number, newMax: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newMin !== minPrice || newMax !== maxPrice) {
      params.set('min_price', newMin.toString())
      params.set('max_price', newMax.toString())
    } else {
      // Remove price params if they match defaults
      params.delete('min_price')
      params.delete('max_price')
    }
    
    const finalUrl = `/products?${params.toString()}`
    // console.log('🔵 Price Widget - Updating URL with prices:', { min_price: newMin, max_price: newMax })
    // console.log('🔵 Price Widget - Navigating to:', finalUrl)
    
    router.replace(finalUrl, { scroll: false })
  }, [searchParams, router, minPrice, maxPrice])

  // Update URL when values change (with debounce)
  useEffect(() => {
    // Skip if values match URL params or initial load
    if (minVal === initialMin && maxVal === initialMax && urlMin && urlMax) {
      return
    }

    const timeoutId = setTimeout(() => {
      updateUrlParams(minVal, maxVal)
    }, 500) // 500ms debounce

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minVal, maxVal])

  // Sync from URL when it changes externally
  useEffect(() => {
    const urlMinValue = searchParams.get('min_price')
    const urlMaxValue = searchParams.get('max_price')
    
    if (urlMinValue && urlMaxValue) {
      const urlMinNum = parseInt(urlMinValue)
      const urlMaxNum = parseInt(urlMaxValue)
      if (urlMinNum !== minVal || urlMaxNum !== maxVal) {
        setMinVal(urlMinNum)
        setMaxVal(urlMaxNum)
      }
    } else if (!urlMinValue && !urlMaxValue && (minVal !== minPrice || maxVal !== maxPrice)) {
      // Reset to defaults if URL params removed
      setMinVal(minPrice)
      setMaxVal(maxPrice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleQuickSelect = (quickMin: number, quickMax: number) => {
    setMinVal(quickMin)
    setMaxVal(quickMax)
    // Update URL immediately for quick select
    updateUrlParams(quickMin, quickMax)
  }

  const handleClear = () => {
    setMinVal(minPrice)
    setMaxVal(maxPrice)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('min_price')
    params.delete('max_price')
    router.replace(`/products?${params.toString()}`, { scroll: false })
  }

  // Calculate quick select ranges
  const quickRanges = [
    { min: Math.floor(minPrice), max: Math.floor(minPrice + (maxPrice - minPrice) * 0.2) },
    { min: Math.floor(minPrice + (maxPrice - minPrice) * 0.2), max: Math.floor(minPrice + (maxPrice - minPrice) * 0.4) },
    { min: Math.floor(minPrice + (maxPrice - minPrice) * 0.4), max: Math.floor(minPrice + (maxPrice - minPrice) * 0.6) },
    { min: Math.floor(minPrice + (maxPrice - minPrice) * 0.6), max: Math.floor(minPrice + (maxPrice - minPrice) * 0.8) },
    { min: Math.floor(minPrice + (maxPrice - minPrice) * 0.8), max: Math.floor(maxPrice) }
  ]

  // Calculate track style for slider
  const trackPercent = (val: number) => ((val - 0) / (sliderMax - 0)) * 100
  const trackLeft = Math.min(trackPercent(minVal), trackPercent(maxVal))
  const trackWidth = Math.abs(trackPercent(maxVal) - trackPercent(minVal))
  const trackStyle = { left: `${trackLeft}%`, width: `${trackWidth}%` }

  return (
    <div className="price-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("Filter by Price")}</h3>
        {(minVal !== minPrice || maxVal !== maxPrice) && (
          <button 
            onClick={handleClear}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 font-medium transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">{t("Price Range")}</span>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
            <span><span className="icon-riyal-symbol text-xs me-1" />{minVal}</span>
            <span className="text-gray-400">-</span>
            <span><span className="icon-riyal-symbol text-xs me-1" />{maxVal}</span>
          </div>
        </div>

        <div className="relative mb-4 py-2">
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
            <div className="absolute h-full bg-primary-500 rounded-full dark:bg-primary-300" style={trackStyle} />
          </div>

          <div className="slider-container">
            <input
              type="range"
              min={0}
              max={sliderMax}
              step={10}
              value={minVal}
              onChange={(e) => {
                const v = Number(e.target.value)
                setMinVal(Math.min(v, maxVal - 10))
              }}
              className="range-input range-input-min absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
            />
            <input
              type="range"
              min={0}
              max={sliderMax}
              step={10}
              value={maxVal}
              onChange={(e) => {
                const v = Number(e.target.value)
                setMaxVal(Math.max(v, minVal + 10))
              }}
              className="range-input range-input-max absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{t("Min")}</label>
            <input
              type="number"
              min={0}
              max={sliderMax}
              value={minVal}
              onChange={(e) => {
                const v = Number(e.target.value) || 0
                setMinVal(Math.min(v, maxVal - 10))
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">{t("Max")}</label>
            <input
              type="number"
              min={0}
              max={sliderMax}
              value={maxVal}
              onChange={(e) => {
                const v = Number(e.target.value) || 0
                setMaxVal(Math.max(v, minVal + 10))
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t("Quick Select")}</h4>
        <div className="grid grid-cols-2 gap-2">
          {quickRanges.map((range, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickSelect(range.min, range.max)}
              className={`price-quick-btn px-3 py-2 text-sm border rounded-md transition-colors ${
                minVal === range.min && maxVal === range.max
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white'
              }`}
            >
              {idx === quickRanges.length - 1 ? (
                <>{range.min}+</>
              ) : (
                <>
                  <span className="icon-riyal-symbol text-xs me-1" />{range.min} - <span className="icon-riyal-symbol text-xs me-1" />{range.max}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

    

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">{t("Showing products")}</span>
      </div>
    </div>
  )
}
