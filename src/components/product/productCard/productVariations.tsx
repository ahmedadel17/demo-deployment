'use client'

import React, { useState } from 'react'

type VariationValue = {
  id: number
  value: string
  color?: string
}

type Variation = {
  id: number
  name: string
  values: VariationValue[]
}

type ProductVariationsProps = {
  variations?: Variation[]
  onColorSelect?: (color: string, colorId: number) => void
  onSizeSelect?: (size: string, sizeId: number) => void
  selectedColor?: string | null
  selectedSize?: string | null
}

function ProductVariations({ 
  variations = [], 
  onColorSelect,
  onSizeSelect,
  selectedColor: externalSelectedColor,
  selectedSize: externalSelectedSize
}: ProductVariationsProps) {
  // Internal state if not controlled externally
  const [internalState, setInternalState] = useState({
    selectedColor: null as string | null,
    selectedSize: null as string | null,
  })

  // Use external state if provided, otherwise use internal state
  const selectedColor = externalSelectedColor !== undefined ? externalSelectedColor : internalState.selectedColor
  const selectedSize = externalSelectedSize !== undefined ? externalSelectedSize : internalState.selectedSize

  // Find color and size variations (colors are typically at index 1, sizes at index 0)
  const colorVariation = variations.find(v => v.name?.toLowerCase().includes('color') || variations.indexOf(v) === 1)
  const sizeVariation = variations.find(v => v.name?.toLowerCase().includes('size') || variations.indexOf(v) === 0)

  // Use found variations or fallback to array indices
  const colors = colorVariation || variations[1]
  const sizes = sizeVariation || variations[0]

  const handleColorSelect = (color: string, colorId: number) => {
    if (externalSelectedColor === undefined) {
      setInternalState(prev => ({ ...prev, selectedColor: color }))
    }
    onColorSelect?.(color, colorId)
  }

  const handleSizeSelect = (size: string, sizeId: number) => {
    if (externalSelectedSize === undefined) {
      setInternalState(prev => ({ ...prev, selectedSize: size }))
    }
    onSizeSelect?.(size, sizeId)
  }

  return (
    <div className="product-options space-y-4 mt-4">
      {/* Colors */}
      {colors?.values && colors.values.length > 0 && (
        <div className="product-colors">
          <div className="flex flex-wrap gap-1 items-center">
            {colors.values.slice(0, 4).map((color: VariationValue, i: number) => {
              const colorValue = color.color || color.value
              const isSelected = selectedColor === color.color || selectedColor === color.value || selectedColor === colorValue
              return (
                <button
                  key={color.id || i}
                  className={`color-option ${isSelected ? 'active' : ''}`}
                  style={{ backgroundColor: color.color }}
                  title={colorValue}
                  aria-label={`Select color ${colorValue}`}
                  onClick={() => handleColorSelect(colorValue, color.id)}
                >
                  <span className="sr-only">{colorValue}</span>
                </button>
              )
            })}
            {colors.values.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                +{colors.values.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes?.values && sizes.values.length > 0 && (
        <div className="product-sizes">
          <div className="flex flex-wrap gap-1 items-center">
            {sizes.values.slice(0, 4).map((size: VariationValue, i: number) => (
              <button
                key={size.id || i}
                className={`size-option ${selectedSize === size.value ? 'active' : ''}`}
                aria-label={`Select size ${size.value}`}
                onClick={() => handleSizeSelect(size.value, size.id)}
              >
                {size.value}
              </button>
            ))}
            {sizes.values.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                +{sizes.values.length - 4}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductVariations
