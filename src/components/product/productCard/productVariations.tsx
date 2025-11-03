'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'

type VariationValue = {
  id: number
  value: string
  color?: string
}

type Attribute = {
  attribute_id: number
  attribute_name: string
  attribute_type: string
  values: VariationValue[]
}

type ProductVariationsProps = {
  variations?: Attribute[]
  onSelectionChange?: (selections: Record<number, number>) => void
  onVariationFetch?: (attributes: Record<number, number>) => void
  initialSelections?: Record<number, number>
}

function ProductVariations({ 
  variations = [], 
  onSelectionChange,
  onVariationFetch,
  initialSelections
}: ProductVariationsProps) {
  // State to track selected values for each attribute
  const [selections, setSelections] = useState<Record<number, number>>(initialSelections || {})
  const lastFetchedSelections = useRef<string>('')

  // Sort variations: color first, then others
  const sortedVariations = useMemo(() => {
    const colorAttrs = variations.filter(v => 
      v.attribute_name?.toLowerCase().includes('color') || 
      v.attribute_type === 'color'
    )
    const otherAttrs = variations.filter(v => 
      !v.attribute_name?.toLowerCase().includes('color') && 
      v.attribute_type !== 'color'
    )
    return [...colorAttrs, ...otherAttrs]
  }, [variations])

  // Update selections when initialSelections prop changes
  useEffect(() => {
    if (initialSelections) {
      setSelections(initialSelections)
      lastFetchedSelections.current = '' // Reset fetch tracking when selections reset
    }
  }, [initialSelections])

  // Reset fetch tracking when variations change
  useEffect(() => {
    lastFetchedSelections.current = ''
  }, [variations])

  // Check if all variations are selected and fetch variation data
  useEffect(() => {
    if (sortedVariations.length > 0 && onVariationFetch) {
      const allSelected = sortedVariations.every(attr => 
        selections[attr.attribute_id] !== undefined && selections[attr.attribute_id] !== null
      )
      
      if (allSelected && Object.keys(selections).length === sortedVariations.length) {
        // Create a unique key for the current selections to prevent duplicate calls
        const selectionsKey = JSON.stringify(selections)
        
        // Only fetch if this is a new selection combination
        if (selectionsKey !== lastFetchedSelections.current) {
          lastFetchedSelections.current = selectionsKey
          // All variations selected, fetch variation data
          onVariationFetch(selections)
        }
      } else {
        // If not all selected, clear the fetch tracking
        lastFetchedSelections.current = ''
      }
    }
  }, [selections, sortedVariations, onVariationFetch])

  // Handle value selection for any attribute
  const handleSelect = (attributeId: number, valueId: number) => {
    const newSelections = {
      ...selections,
      [attributeId]: valueId
    }
    setSelections(newSelections)
    onSelectionChange?.(newSelections)
  }

  // Render attribute based on type
  const renderAttribute = (attribute: Attribute) => {
    const selectedValueId = selections[attribute.attribute_id]
    const isColorAttribute = attribute.attribute_name?.toLowerCase().includes('color') || 
                             attribute.attribute_type === 'color'
    
    if (attribute.attribute_type === 'multi' || attribute.attribute_type === 'color') {
      return (
        <div key={attribute.attribute_id} className="product-attribute mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {attribute.attribute_name}
          </label>
          
          {isColorAttribute ? (
            // Render as color swatches (original style)
            <div className="flex flex-wrap gap-1 items-center">
              {attribute.values.slice(0, 4).map((value) => {
                const isSelected = selectedValueId === value.id
                const colorValue = value.color || value.value
                return (
                  <button
                    key={value.id}
                    type="button"
                    className={`color-option ${isSelected ? 'active' : ''}`}
                    style={{ backgroundColor: value.color }}
                    title={colorValue}
                    aria-label={`Select color ${colorValue}`}
                    onClick={() => handleSelect(attribute.attribute_id, value.id)}
                  >
                    <span className="sr-only">{colorValue}</span>
                  </button>
                )
              })}
              {attribute.values.length > 4 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  +{attribute.values.length - 4}
                </span>
              )}
            </div>
          ) : (
            // Render as size/text buttons
            <div className="flex flex-wrap gap-2">
              {attribute.values.map((value) => {
                const isSelected = selectedValueId === value.id
                return (
                  <button
                    key={value.id}
                    type="button"
                    className={`size-option ${isSelected ? 'active' : ''}`}
                    aria-label={`Select ${attribute.attribute_name}: ${value.value}`}
                    onClick={() => handleSelect(attribute.attribute_id, value.id)}
                  >
                    {value.value}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )
    }

    // Default fallback for other attribute types
    return (
      <div key={attribute.attribute_id} className="product-attribute mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {attribute.attribute_name}
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          value={selectedValueId || ''}
          onChange={(e) => handleSelect(attribute.attribute_id, Number(e.target.value))}
        >
          <option value="">Select {attribute.attribute_name}</option>
          {attribute.values.map((value) => (
            <option key={value.id} value={value.id}>
              {value.value}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (!variations || variations.length === 0) {
    return null
  }

  return (
    <div className="product-options space-y-3 mt-4">
      {sortedVariations.map((attribute) => renderAttribute(attribute))}
    </div>
  )
}

export default ProductVariations
