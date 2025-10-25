'use client';
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/store/hooks'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { setCartData, setCartLoading, setCartError } from '@/app/store/slices/cartSlice'
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
interface AddToCartButtonProps {
  productId?: string;
  productTitle?: string;
  productPrice?: number;
  productImage?: string;
  hasVariations?: boolean;
  quantity: number;
  customerNote: string;
  defaultVariationId?: number;
}

function AddToCartButton({ 
  productId, 
    hasVariations = false,
  defaultVariationId,
  quantity,
  customerNote
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const t = useTranslations();
  // Get data from Redux
  const { selectedSizeId, selectedColorId, variationData } = useAppSelector((state) => state.product);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!token) {
      setError('Authentication required');
      return;
    }

    // Check if variations are required
    if (hasVariations && !defaultVariationId && (!selectedSizeId || !selectedColorId)) {
      setError('Please select both size and color before adding to cart');
      return;
    }

    // Check if variation data is available for products with variations
    if (hasVariations && !defaultVariationId && !(variationData?.data as any)?.id) {
      setError('Please wait for variation data to load');
      return;
    }

    setIsAddingToCart(true);
    setError(null);
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
      const requestData = {
        item_id: defaultVariationId? defaultVariationId : (variationData?.data as any)?.id ? (variationData?.data as any).id : productId,
        qty: quantity,
        customer_note: customerNote,
        type: 'product',
      };

      console.log('Adding to cart with data:', requestData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/add-to-cart`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Product added to cart successfully!');
      
      // Save the complete cart response to Redux
      dispatch(setCartData(response.data.data));
      
    
      
    } catch (err) {
      console.error('Error adding to cart:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push('/auth/login');
        return;
      }
      const errorMessage = 'Failed to add to cart';
      toast.error(errorMessage);
      dispatch(setCartError(errorMessage));
    } finally {
      setIsAddingToCart(false);
      dispatch(setCartLoading(false));
    }
  };

  return (
    <>
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart || (hasVariations && !defaultVariationId && (!selectedSizeId || !selectedColorId || !(variationData?.data as any)?.id))}
        className="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isAddingToCart ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            {t('Adding to Cart')}...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
              <path d="M8 11V6a4 4 0 0 1 8 0v5" />
            </svg>
            {t('Add to Cart')}
          </>
        )}
      </button>
    </>
  )
}

export default AddToCartButton
