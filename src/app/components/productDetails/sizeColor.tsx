'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
interface SizeColorProps {
  variations: Array<{
    id: number;
    name: string;
    values: Array<{
      id: number;
      value: string;
      color?: string;
    }>;
  }>;
  onSelectionChange?: (selectedSizeId: number | null, selectedColorId: number | null) => void;
}

function SizeColor({ variations, onSelectionChange }: SizeColorProps) {
  const t = useTranslations();
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

  const handleSizeSelect = (sizeId: number, _sizeValue: string) => {
    // Toggle selection - if already selected, deselect it
    const newSizeId = selectedSizeId === sizeId ? null : sizeId;
    setSelectedSizeId(newSizeId);
    onSelectionChange?.(newSizeId, selectedColorId);
    console.log('Size selection:', newSizeId ? `Selected Size ID: ${sizeId}` : 'Deselected size');
  };

  const handleColorSelect = (colorId: number, _colorValue: string) => {
    // Toggle selection - if already selected, deselect it
    const newColorId = selectedColorId === colorId ? null : colorId;
    setSelectedColorId(newColorId);
    onSelectionChange?.(selectedSizeId, newColorId);
    console.log('Color selection:', newColorId ? `Selected Color ID: ${colorId}` : 'Deselected color');
  };
  // Handle different data structures

  return (
    <>
      <div className="product-size mt-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t('Size')}</h4>
        <div className="grid grid-cols-4 gap-2">
          { (variations[0] as any)?.[0]?.values?.map((size: {
            id: number;
            value: string;
          }) => (
            <button 
              key={size.id} 
              className={`size-option ${selectedSizeId === size.id ? 'active' : ''}`}
              onClick={() => handleSizeSelect(size.id, size.value)}
              data-size-id={size.id}
              data-size={size.value} 
              aria-label={`${selectedSizeId === size.id ? 'Deselect' : 'Select'} size ${size.value}`}
            >
              {size.value}
            </button>
          ))}
        </div>
      </div>

      {/* <!-- Color Selection --> */}
      <div className="product-color mt-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t("Color")}</h4>
        <div className="flex flex-wrap gap-3">
        {(variations[0] as any)?.[1]?.values?.map((color: {
            id: number;
            value: string;
            color?: string;
        }) => (
            <button 
              key={color.id} 
              className={`color-option relative transition-all duration-200 ${
                selectedColorId === color.id 
                  ? 'ring-4 ring-primary-500 ring-offset-2 shadow-lg scale-110' 
                  : 'hover:scale-105 shadow-md'
              }`}
              style={{ backgroundColor: color.color }} 
              onClick={() => handleColorSelect(color.id, color.color || color.value)}
              data-color-id={color.id}
              data-color={color.color || color.value} 
              title={`${selectedColorId === color.id ? 'Deselect' : 'Select'} color ${color.color || color.value}`} 
              aria-label={`${selectedColorId === color.id ? 'Deselect' : 'Select'} color ${color.color || color.value}`}
            >
              <span className="sr-only">{color.color || color.value}</span>
              {selectedColorId === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default SizeColor
