'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';

type VariationValue = {
  id: number;
  value: string;
  color?: string;
};

type Attribute = {
  attribute_id: number;
  attribute_name: string;
  attribute_type: string;
  values: VariationValue[];
};

interface ProductVariationsProps {
  variations?: Attribute[];
  onSelectionChange?: (selections: Record<number, number>) => void;
  onVariationFetch?: (attributes: Record<number, number>) => void;
  onDataChange?: (quantity: number, customerNote: string) => void;
  initialSelections?: Record<number, number>;
  variationData?: any; // For displaying stock count
}

function ProductVariations({
  variations = [],
  onSelectionChange,
  onVariationFetch,
  onDataChange,
  initialSelections,
  variationData
}: ProductVariationsProps) {
  const t = useTranslations();
  // State to track selected values for each attribute
  const [selections, setSelections] = useState<Record<number, number>>(initialSelections || {});
  const lastFetchedSelections = useRef<string>('');
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');

  // Notify parent component when quantity or customer note changes
  useEffect(() => {
    onDataChange?.(quantity, customerNote);
  }, [quantity, customerNote, onDataChange]);

  // Sort variations: color first, then others
  const sortedVariations = useMemo(() => {
    const colorAttrs = variations.filter(v =>
      v.attribute_name?.toLowerCase().includes('color') ||
      v.attribute_type === 'color'
    );
    const otherAttrs = variations.filter(v =>
      !v.attribute_name?.toLowerCase().includes('color') &&
      v.attribute_type !== 'color'
    );
    return [...colorAttrs, ...otherAttrs];
  }, [variations]);

  // Update selections when initialSelections prop changes
  useEffect(() => {
    if (initialSelections) {
      setSelections(initialSelections);
      lastFetchedSelections.current = ''; // Reset fetch tracking when selections reset
    }
  }, [initialSelections]);

  // Reset fetch tracking when variations change
  useEffect(() => {
    lastFetchedSelections.current = '';
  }, [variations]);

  // Check if all variations are selected and fetch variation data
  useEffect(() => {
    if (sortedVariations.length > 0 && onVariationFetch) {
      const allSelected = sortedVariations.every(attr =>
        selections[attr.attribute_id] !== undefined && selections[attr.attribute_id] !== null
      );

      if (allSelected && Object.keys(selections).length === sortedVariations.length) {
        // Create a unique key for the current selections to prevent duplicate calls
        const selectionsKey = JSON.stringify(selections);

        // Only fetch if this is a new selection combination
        if (selectionsKey !== lastFetchedSelections.current) {
          lastFetchedSelections.current = selectionsKey;
          // All variations selected, fetch variation data
          onVariationFetch(selections);
        }
      } else {
        // If not all selected, clear the fetch tracking
        lastFetchedSelections.current = '';
      }
    }
  }, [selections, sortedVariations, onVariationFetch]);

  // Handle value selection for any attribute
  const handleSelect = (attributeId: number, valueId: number) => {
    const newSelections = {
      ...selections,
      [attributeId]: valueId
    };
    setSelections(newSelections);
    onSelectionChange?.(newSelections);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  // Render attribute based on type
  const renderAttribute = (attribute: Attribute) => {
    const selectedValueId = selections[attribute.attribute_id];
    const isColorAttribute = attribute.attribute_name?.toLowerCase().includes('color') ||
      attribute.attribute_type === 'color';

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
                const isSelected = selectedValueId === value.id;
                const colorValue = value.color || value.value;
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
                );
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
                const isSelected = selectedValueId === value.id;
                return (
                  <button
                    key={value.id}
                    type="button"
                    className={`size-option px-4 py-2 rounded-md border transition-all text-sm font-medium ${
                      isSelected
                        ? 'bg-primary-500 text-white border-primary-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                    aria-label={`Select ${attribute.attribute_name}: ${value.value}`}
                    onClick={() => handleSelect(attribute.attribute_id, value.id)}
                  >
                    {value.value}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // Default fallback for other attribute types
    return (
      <div key={attribute.attribute_id} className="product-attribute mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {attribute.attribute_name}
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
    );
  };

  if (!variations || variations.length === 0) {
    return null;
  }

  return (
    <>
      <div className="product-variations">
        {/* Quantity Selection */}
        <div className="product-quantity mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('Quantity')}</h3>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center rtl:flex-row-reverse border border-gray-300 dark:border-gray-600 rounded-md">
              {/* Decrease Button */}
              <button
                id="decreaseQty"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
              </button>

              {/* Quantity Input */}
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                min="1"
                max="10"
                className="w-16 !rounded-none border-0 focus:outline-none"
              />

              {/* Increase Button */}
              <button
                id="increaseQty"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('Only')} {(variationData as { stock?: number })?.stock || 5} {t('left in stock')}
            </span>
          </div>
        </div>

        {/* Product Variations */}
        <div className="product-options space-y-3">
          {sortedVariations.map((attribute) => renderAttribute(attribute))}
        </div>

        {/* Customer Note */}
        <div className="space-y-2 mt-6">
          <label htmlFor="customer_note" className="block text-sm font-medium text-gray-900 dark:text-white">
            {t('Do you have another comment')}
          </label>
          <textarea
            id="customer_note"
            name="customer_note"
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            rows={3}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500"
            placeholder={t('Enter your comment here')}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default ProductVariations;