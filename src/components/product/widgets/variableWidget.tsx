'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type AttributeValue = {
  id: number
  value: string
  color?: string
}

type Attribute = {
  id: number
  name: string
  type: 'multi' | 'color'
  values: AttributeValue[]
}

type Props = {
  attributes: Attribute[]
  onApplyAction?: (filters: Record<string, AttributeValue[]>) => void
}

export default function VariableWidget({ attributes, onApplyAction }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState<Record<string, AttributeValue[]>>({})

  // Initialize selected attributes from URL parameters
  useEffect(() => {
    const urlAttributes: Record<string, AttributeValue[]> = {}
    
    // Parse attributes from URL (format: attributes[Weight]=3&attributes[Color]=20)
    const searchParamsString = searchParams.toString()
    if (searchParamsString) {
      const urlParams = new URLSearchParams(searchParamsString)
      
      // Get all attribute parameters
      for (const [key, value] of urlParams.entries()) {
        if (key.startsWith('attributes[') && key.endsWith(']')) {
          const attrId = key.slice(11, -1) // Extract attribute ID from "attributes[1]"
          const valueId = value
          
          // Find the attribute and value objects
          const attribute = attributes.find(attr => attr.id.toString() === attrId)
          if (attribute) {
            const attributeValue = attribute.values.find(val => val.id.toString() === valueId)
            if (attributeValue) {
              if (!urlAttributes[attrId]) {
                urlAttributes[attrId] = []
              }
              urlAttributes[attrId].push(attributeValue)
            }
          }
        }
      }
    }
    
    setSelected(urlAttributes)
  }, [searchParams, attributes])

  const toggleValue = (attrId: string | number, value: AttributeValue) => {
    setSelected(prev => {
      const current = prev[attrId] || []
      const exists = current.some(v => v.id === value.id)
      const next = exists ? current.filter(v => v.id !== value.id) : [...current, value]
      const newSelected = { ...prev, [attrId]: next }
      
      // Immediately update URL with new selection
      updateUrlWithAttributes(newSelected)
      
      return newSelected
    })
  }

  // Function to update URL with current attributes
  const updateUrlWithAttributes = (attributes: Record<string, AttributeValue[]>) => {
    const newParams = new URLSearchParams(searchParams.toString())
    
    // Remove existing attribute parameters
    for (const key of newParams.keys()) {
      if (key.startsWith('attributes[')) {
        newParams.delete(key)
      }
    }
    
    // Add selected attributes
    Object.entries(attributes).forEach(([attrId, values]) => {
      values.forEach(value => {
        newParams.append(`attributes[${attrId}]`, value.id.toString())
      })
    })
    
    router.push(`/products?${newParams.toString()}`)
  }

  const clearAll = () => {
    setSelected({})
    // Update URL to remove all attribute parameters
    updateUrlWithAttributes({})
  }

  const apply = () => {
    // URL is already updated by toggleValue, just call the callback
    onApplyAction?.(selected)
  }

  const resultsCount = useMemo(() => {
    const base = 124
    const selectedCount = Object.values(selected).reduce(
      (sum, list) => sum + list.length,
      0
    )
    const multiplier = selectedCount ? 0.5 + selectedCount * 0.2 : 1
    return Math.max(5, Math.floor(base * multiplier))
  }, [selected])

  return (
    <div className="variable-widget w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Product Attributes</h3>
        <button
          onClick={clearAll}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Clear
        </button>
      </div>

      {attributes && attributes.length > 0 ? (
        attributes.map(attr => (
        <div key={attr.id} className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{attr.name}</h4>

          {attr.type === 'multi' && (
            <div className="grid grid-cols-3 gap-2">
              {attr.values.map(val => {
                const isSelected = selected[attr.id]?.some(v => v.id === val.id)
                return (
                  <button
                    key={val.id}
                    onClick={() => toggleValue(attr.id, val)}
                    className={`px-3 py-2 rounded-md text-sm border transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50'
                    }`}
                  >
                    {val.value}
                  </button>
                )
              })}
            </div>
          )}

          {attr.type === 'color' && (
            <div className="flex flex-wrap gap-3">
              {attr.values.map(val => {
                const isSelected = selected[attr.id]?.some(v => v.id === val.id)
                return (
                  <button
                    key={val.id}
                    onClick={() => toggleValue(attr.id, val)}
                    className={`w-7 h-7 rounded-full border-2 ${
                      isSelected ? 'border-blue-600' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{ backgroundColor: val.color }}
                    title={val.value}
                  >
                    <span className="sr-only">{val.value}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">No attributes available</p>
        </div>
      )}

      {/* Selected section */}
      {Object.keys(selected).length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Selected:</div>
          {Object.entries(selected).map(([attrId, values]) => {
            const attribute = attributes.find(attr => attr.id.toString() === attrId)
            return (
            <div key={attrId} className="mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">{attribute?.name || attrId}:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {values.map(v => (
                  <span
                    key={v.id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100"
                  >
                    {v.value}
                    <button
                      onClick={() => toggleValue(attrId, v)}
                      className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
            )
          })}
        </div>
      )}

      <button
        onClick={apply}
        className="w-full te-btn te-btn-default"
      >
        Apply Filter
      </button>

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Showing {resultsCount} products
        </span>
      </div>
    </div>
  )
}
