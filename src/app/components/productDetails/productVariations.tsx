'use client';
import React, { useState, useEffect } from 'react'
import SizeColor from './sizeColor'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { 
  setSelection, 
  setVariationData, 
  setVariationLoading, 
  setVariationError, 
  clearVariationError 
} from '@/app/store/slices/productSlice'
import { useTranslations } from 'next-intl';

interface ProductVariationsProps {
  variations: {
    id: number;
    name: string;
    values: {
      id: number;
      value: string;
    }[];
  };
  hasVariations: boolean;
  productId?: string;
  productTitle?: string;
  productPrice?: number;
  productImage?: string;
  onDataChange?: (quantity: number, customerNote: string) => void;
}

function ProductVariations({ variations, hasVariations, productId, onDataChange }: ProductVariationsProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = useTranslations();
  // Get product state from Redux
  const { selectedSizeId, selectedColorId, variationData, isLoadingVariation, error } = useAppSelector((state) => state.product);
  
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');
  // const [isAddingToCart, setIsAddingToCart] = useState(false); // Not needed anymore
  const [fetchTimeout, setFetchTimeout] = useState<NodeJS.Timeout | null>(null);
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
      }
    };
  }, [fetchTimeout]);

  // Notify parent component when quantity or customer note changes
  useEffect(() => {
    onDataChange?.(quantity, customerNote);
  }, [quantity, customerNote, onDataChange]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleSelectionChange = (sizeId: number | null, colorId: number | null) => {
    dispatch(setSelection({ sizeId, colorId }));
    console.log('Size selection changed:', sizeId);
    console.log('Color selection changed:', colorId);
    console.log(quantity);
    
    // Clear any existing timeout
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }
    
    // Automatically fetch variation data when both size and color are selected
    // Add a small delay to prevent rapid API calls
    if (sizeId && colorId && productId) {
      const timeout = setTimeout(() => {
        fetchVariationDataWithParams(sizeId, colorId);
      }, 500); // 500ms delay
      setFetchTimeout(timeout);
    }
  };

  const fetchVariationDataWithParams = async (sizeId: number, colorId: number) => {
    if (!productId || !sizeId || !colorId) {
      console.log('variations params:', sizeId, colorId, productId);
      dispatch(setVariationError('Please select both size and color'));
      return;
    }
    
    try {
      dispatch(setVariationLoading(true));
      dispatch(clearVariationError());
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products/get-variation-by-attribute`,
        {
          product_id: productId,
          attributes: {
            1: sizeId,
            2: colorId,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(setVariationData(response.data));
      console.log('Variation data fetched and saved to Redux:', response.data);
      
    } catch (err) {
      console.error('Error fetching variation data:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push('/auth/login');
        return;
      }
      dispatch(setVariationError('Failed to fetch variation data'));
      dispatch(setVariationData(null));
    } finally {
      dispatch(setVariationLoading(false));
    }
  };

  // Removed unused functions - they're now handled in AddToCartButton component

  return (
    <>
    <div>
    <div className="product-variations">
    <div className="product-quantity">
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{t('Quantity')}</h3>
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex items-center rtl:flex-row-reverse border border-gray-300 dark:border-gray-600 rounded-md">
            {/* <!-- Decrease Button --> */}
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

            {/* <!-- Quantity Input --> */}
            <input 
              id="quantity" 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
              min="1" 
              max="10"
              className="w-16 !rounded-none border-0 focus:outline-none"
            />

            {/* <!-- Increase Button --> */}
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
        <span className="text-sm text-gray-600 dark:text-gray-400">{t('Only')} {(variationData?.data as { stock?: number })?.stock || 5} {t('left in stock')}</span>
    </div>
</div>

{/* <!-- Size and Color Selection --> */}
{hasVariations && Array.isArray(variations) && variations.length > 0 && (
  <SizeColor 
    variations={[variations]} 
    onSelectionChange={handleSelectionChange}
  />
)}

{/* Selection Status Display */}
{/* {hasVariations && (
  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
    <div className="text-sm text-blue-800 dark:text-blue-200">
      <p><strong>{t('Current Selection')}:</strong></p>
      <p>Size: {selectedSizeId ? `Selected (ID: ${selectedSizeId})` : 'Not selected'}</p>
      <p>Color: {selectedColorId ? `Selected (ID: ${selectedColorId})` : 'Not selected'}</p>
    </div>
  </div>
)} */}

{/* Variation Data Loading */}
{/* {isLoadingVariation && (
  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3"></div>
      <div>
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Loading variation data...</p>
        <p className="text-xs text-yellow-600 dark:text-yellow-300">This happens automatically when you select both size and color</p>
      </div>
    </div>
  </div>
)} */}

{/* Variation Data Display */}
{/* {variationData && (
  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
    <div className="text-sm text-green-800 dark:text-green-200">
      <p><strong>Variation Found:</strong></p>
      <pre className="mt-2 text-xs bg-white dark:bg-gray-800 p-2 rounded overflow-auto">
        {JSON.stringify(variationData, null, 2)}
      </pre>
    </div>
  </div>
)} */}

{/* Error Display */}
{/* {error && (
  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
  </div>
)} */}

{/* Automatic Variation Loading Notice */}
{/* {hasVariations && selectedSizeId && selectedColorId && !variationData && !isLoadingVariation && (
  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
    <div className="text-sm text-blue-800 dark:text-blue-200">
      <p className="font-semibold">Variation Selection Complete!</p>
      <p className="text-xs mt-1">Fetching variation data automatically...</p>
    </div>
  </div>
)} */}



<div className="space-y-2 mt-4">
  <label htmlFor="customer_note" className="block text-sm font-medium text-gray-900 dark:text-white">{t('Do you have another comment')}</label>
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
</div>
</>
  )
}

export default ProductVariations
