'use client';

import React, { useState, useEffect } from 'react';
import { Handbag } from 'lucide-react';
import { useCart } from '@/app/hooks/useCart';
import { useAuth } from '@/app/hooks/useAuth';
import { setCartData } from '@/app/store/slices/cartSlice';
import { useAppDispatch } from '@/app/store/hooks';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: string;
  old_price?: string | null | undefined;
  price_after_discount?: string | undefined;
  default_variation_id?: string | number;
}

interface ProductVariationsProps {
  product: Product;
  variations: any[] | undefined;
  onVariationSelected?: (hasVariation: boolean) => void;
}

function ProductVariations({ 
  product,
  variations,
  onVariationSelected
}: ProductVariationsProps) {
  // Consolidated state for better performance
  const [state, setState] = useState({
    selectedColor: null as string | null,
    selectedSize: null as string | null,
    selectedColorId: null as number | null,
    selectedSizeId: null as number | null,
    variationId: null as number | null,
    isAddingToCart: false,
    isLoadingVariation: false,
    selectedVariation: null as any
  });
  console.log('product', product);
  console.log('variations', variations);
  const { loadCartFromStorage } = useCart();
  const { token, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();

  // Notify parent when variation is selected
  useEffect(() => {
    onVariationSelected?.(state.selectedVariation !== null);
  }, [state.selectedVariation, onVariationSelected]);


  // Fetch variation ID when both color and size are selected
  const fetchVariationId = async (colorId: number, sizeId: number) => {
    setState(prev => ({ ...prev, isLoadingVariation: true }));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products/get-variation-by-attribute`,
        {
          product_id: product.id,
          attributes: {
            1: sizeId,
            2: colorId,
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status && response.data.data?.id) {
        setState(prev => ({
          ...prev,
          variationId: response.data.data.id,
          selectedVariation: response.data.data,
          isLoadingVariation: false
        }));
      } else {
        console.error('Failed to get variation ID:', response.data);
        setState(prev => ({
          ...prev,
          variationId: null,
          selectedVariation: null,
          isLoadingVariation: false
        }));
      }
    } catch (error) {
      console.error('Error fetching variation ID:', error);
      setState(prev => ({
        ...prev,
        variationId: null,
        selectedVariation: null,
        isLoadingVariation: false
      }));
    }
  };

  // Handle color selection
  const handleColorSelect = (color: string, colorId: number) => {
    setState(prev => ({ ...prev, selectedColor: color, selectedColorId: colorId }));
    if (state.selectedSizeId) {
      fetchVariationId(colorId, state.selectedSizeId);
    }
  };

  // Handle size selection
  const handleSizeSelect = (size: string, sizeId: number) => {
    setState(prev => ({ ...prev, selectedSize: size, selectedSizeId: sizeId }));
    if (state.selectedColorId) {
      fetchVariationId(state.selectedColorId, sizeId);
    }
  };

  const handleAddToCart = async () => {
    // Check authentication first
    if (!isAuthenticated) {
      toast.error('Please login first to add items to cart');
      return;
    }

    if (!token) {
      toast.error('Authentication required. Please login again.');
      return;
    }

    // If product has default_variation_id, skip color/size validation
    if (!product?.default_variation_id) {
      if (!state.selectedColor || !state.selectedSize) {
        alert('Please select both color and size');
        return;
      }

      if (!state.selectedColorId || !state.selectedSizeId) {
        alert('Please wait while we process your selection');
        return;
      }
    }

    setState(prev => ({ ...prev, isAddingToCart: true }));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/add-to-cart`,
        {
          item_id: product?.default_variation_id || state.variationId || product.id,
          qty: 1,
          customer_note: '',
          type: 'product',
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        // Update cart store directly with the response data
        console.log('Add to cart response:', response.data);
        
        if (response.data.data) {
          // Update cart store with the new cart data from response
          dispatch(setCartData(response.data.data));
          console.log('Cart store updated with:', response.data.data);
        } else {
          // Fallback: reload cart from storage if no data in response
          await loadCartFromStorage();
        }
        toast.success('Product added to cart successfully!');
        
      } else {
        console.error('Add to cart failed:', response.data);
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to cart');
    } finally {
      setState(prev => ({ ...prev, isAddingToCart: false }));
    }
  };
  return (
    <>
      {/* Selected Variation Title */}
      {state.selectedVariation && (
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {state.selectedVariation.name || `${state.selectedColor} - ${state.selectedSize}`}
          </h4>
        </div>
      )}

      {/* Selected Variation Price */}
      {state.selectedVariation && (state.selectedVariation.price_after_discount || state.selectedVariation.price_befor_discount) && (
        <div className="mt-2">
          <div className="flex items-center gap-2">
            {state.selectedVariation.price_after_discount && (
              <span className="text-lg font-semibold text-primary-600">
                <span className="icon-riyal-symbol text-xs"></span>
                {state.selectedVariation.price_after_discount}
              </span>
            )}
            {state.selectedVariation.price_befor_discount && (
              <span className="text-sm text-gray-500 line-through">
                <span className="icon-riyal-symbol text-xs"></span>
                {state.selectedVariation.price_befor_discount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Colors */}
      {variations?.[1]?.values && variations?.[1]?.values.length > 0 && (
        <div className="product-colors mt-3 flex flex-wrap gap-1">
          {variations?.[1]?.values.slice(0, 4).map((color: any, i: number) => (
            <button
              key={i}
              onClick={() => handleColorSelect(color.color, color.id)}
              style={{ backgroundColor: color.color }}
              className={`w-4 h-4 rounded-full border-2 transition-all hover:scale-110 ${
                state.selectedColor === color.color 
                  ? 'border-gray-800 ring-2 ring-gray-400' 
                  : 'border-gray-300'
              }`}
              title={`Select ${color.color}`}
            />
          ))}
          {variations[1].values.length > 4 && (
            <span className="text-xs text-gray-500 ml-1">
              +{variations[1].values.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Sizes */}
      {variations?.[0]?.values && variations?.[0]?.values.length > 0 && (
        <div className="product-sizes mt-3 flex flex-wrap gap-1">
          {variations?.[0]?.values.slice(0, 4).map((size: any, i: number) => (
            <button
              key={i}
              onClick={() => handleSizeSelect(size.value, size.id)}
              className={`px-2 py-1 border rounded text-xs transition-colors ${
                state.selectedSize === size.value
                  ? 'border-primary-600 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'border-gray-300 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={`Select ${size.value}`}
            >
              {size.value}
            </button>
          ))}
          {variations?.[0]?.values.length > 4 && (
            <span className="text-xs text-gray-500 ml-1">
              +{variations?.[0]?.values.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="product-footer mt-4 flex gap-2 items-stretch">
        <button 
          onClick={handleAddToCart}
          disabled={
            product?.default_variation_id 
              ? state.isAddingToCart || state.isLoadingVariation
              : !state.selectedColor || !state.selectedSize || state.isAddingToCart || state.isLoadingVariation
          }
          className={`flex-1 rounded-md py-2 transition flex items-center justify-center gap-2 ${
            product?.default_variation_id 
              ? (state.isAddingToCart || state.isLoadingVariation)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
              : (state.selectedColor && state.selectedSize && !state.isLoadingVariation)
                ? 'bg-primary-600 text-white hover:bg-primary-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } ${(state.isAddingToCart || state.isLoadingVariation) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {state.isAddingToCart ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : state.isLoadingVariation ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
          ) : (
            <Handbag className="w-5 h-5" />
          )}
          <span className="text-sm font-medium lg:block hidden">
            {state.isAddingToCart ? 'Adding...' : state.isLoadingVariation ? 'Loading...' : 'Add to Cart'}
          </span>
        </button>
        <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default ProductVariations
