'use client'

import React, {useMemo, useState, useEffect, useCallback} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  min?: number
  max?: number
  step?: number
  quickRanges?: Array<{min: number; max: number; label?: string}>
  onApplyAction?: (range: {min: number; max: number}) => void
}

export default function PriceWidget({
  min = 0,
  max = 1000,
  step = 10,
  quickRanges,
  onApplyAction
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Initialize values from URL parameters or use API price range as default
  const urlMin = searchParams.get('min_price')
  const urlMax = searchParams.get('max_price')
  
  // If URL has price parameters, use them; otherwise use the API price range as default
  const initialMin = urlMin ? parseInt(urlMin) : min
  const initialMax = urlMax ? parseInt(urlMax) : max
  
  const [minVal, setMinVal] = useState<number>(initialMin)
  const [maxVal, setMaxVal] = useState<number>(initialMax)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)


  const trackStyle = useMemo(() => {
    // Use a wider range for percentage calculation to accommodate values beyond API range
    const sliderMin = 0
    const sliderMax = Math.max(max * 2, 2000)
    const percent = (v: number) => ((v - sliderMin) / (sliderMax - sliderMin)) * 100
    const left = percent(Math.min(minVal, maxVal))
    const width = Math.abs(percent(maxVal) - percent(minVal))
    return {left: `${left}%`, width: `${width}%`}
  }, [minVal, maxVal, max])

  const ranges = quickRanges ?? [
    {min: 0, max: 50, label: 'Under 50'},
    {min: 50, max: 100},
    {min: 100, max: 250},
    {min: 250, max: 500},
    {min: 500, max: 1000, label: '500+'}
  ]

  const applyQuick = (r: {min: number; max: number}, idx: number) => {
    setMinVal(r.min)
    setMaxVal(r.max)
    setActiveIdx(idx)
    // Update URL immediately when selecting quick range
    updateUrlParams(r.min, r.max)
  }

  const clear = () => {
    setMinVal(min)
    setMaxVal(max)
    setActiveIdx(null)
    // Update URL immediately when clearing
    updateUrlParams(min, max)
  }

  const apply = () => {
    onApplyAction?.({min: minVal, max: maxVal})
  }

  // Function to update URL parameters
  const updateUrlParams = useCallback((newMin: number, newMax: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Always set price parameters when user changes them
    params.set('min_price', newMin.toString())
    params.set('max_price', newMax.toString())
    
    router.push(`?${params.toString()}`)
  }, [searchParams, router])

  // Update slider values when API data changes (when min/max props change)
  useEffect(() => {
    // Only update if there are no URL parameters (to preserve user's current selection)
    const urlMin = searchParams.get('min_price')
    const urlMax = searchParams.get('max_price')
    
    if (!urlMin && !urlMax) {
      setMinVal(min)
      setMaxVal(max)
    }
  }, [min, max, searchParams])

  // Update URL when values change (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateUrlParams(minVal, maxVal)
    }, 500) // 500ms debounce

    return () => clearTimeout(timeoutId)
  }, [minVal, maxVal, updateUrlParams])

  // Derived example count (placeholder)
  const resultsCount = useMemo(() => {
    const span = Math.max(1, maxVal - minVal)
    return Math.max(10, Math.floor(200 * (span / (max - min))))
  }, [minVal, maxVal, min, max])

  return (
    <div className="price-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter by Price</h3>
        <button onClick={clear} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 font-medium transition-colors">Clear</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Price Range</span>
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
              max={Math.max(max * 2, 2000)}
              step={step}
              value={minVal}
              onChange={(e) => {
                const v = Number(e.target.value)
                setMinVal(Math.min(v, maxVal - step))
                setActiveIdx(null)
              }}
              className="range-input range-input-min absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
            />
            <input
              type="range"
              min={0}
              max={Math.max(max * 2, 2000)}
              step={step}
              value={maxVal}
              onChange={(e) => {
                const v = Number(e.target.value)
                setMaxVal(Math.max(v, minVal + step))
                setActiveIdx(null)
              }}
              className="range-input range-input-max absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Min</label>
            <input
              type="number"
              min={0}
              max={Math.max(max * 2, 2000)}
              value={minVal}
              onChange={(e) => { setMinVal(Number(e.target.value) || 0); setActiveIdx(null) }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Max</label>
            <input
              type="number"
              min={0}
              max={Math.max(max * 2, 2000)}
              value={maxVal}
              onChange={(e) => { setMaxVal(Number(e.target.value) || 0); setActiveIdx(null) }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Select</h4>
        <div className="grid grid-cols-2 gap-2">
          {ranges.map((r, idx) => (
            <button
              key={`${r.min}-${r.max}`}
              onClick={() => applyQuick(r, idx)}
              className={`price-quick-btn px-3 py-2 text-sm border rounded-md transition-colors ${activeIdx === idx ? 'bg-primary-500 border-primary-500 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white'}`}
            >
              {r.label ?? (<><span className="icon-riyal-symbol text-xs me-1" />{r.min} - <span className="icon-riyal-symbol text-xs me-1" />{r.max}</>)}
            </button>
          ))}
        </div>
      </div>

      <button onClick={apply} className="w-full te-btn te-btn-default">Apply Filter</button>

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">Showing {resultsCount} products</span>
      </div>
    </div>
  )
}


