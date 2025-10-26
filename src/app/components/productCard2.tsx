"use client";
import React, { useState, useEffect } from "react";
import { useCart } from '@/app/hooks/useCart';
import { useAuth } from '@/app/hooks/useAuth';
import { setCartData } from '@/app/store/slices/cartSlice';
import { useAppDispatch } from '@/app/store/hooks';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import postRequest from '../../../helpers/post';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useWishlist } from '@/app/hooks/useWishlist';

interface Badge {
  type: string;
  text: string;
}

interface Product {
  id: number;
  title: string;
  name: string;
  thumbnail: string;
  slug: string;
  price: string;
  image?: string;
  hover?: string;
  category: string;
  old_price?: string | null;
  colors?: string[];
  sizes?: string[];
  badges?: Badge[];
  variations?: Variation[];
  min_price?: string;
  price_after_discount?: string;
  default_variation_id?: string | number;
  is_favourite?: boolean;
}

interface Variation {
  id: number;
  name: string;
  values: { id: number; value: string }[];
}

interface ProductItemProps {
  product: Product;
}

const badgeClasses: Record<string, string> = {
  new: "bg-green-500/20 text-green-500",
  sale: "bg-red-500/20 text-red-500",
  bestseller: "bg-blue-500/20 text-blue-500",
  limited: "bg-purple-500/20 text-purple-500",
  hot: "bg-orange-500/20 text-orange-500",
};

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  // Consolidated state for better performance (same as ProductCard)
  const [state, setState] = useState({
    selectedColor: null as string | null,
    selectedSize: null as string | null,
    selectedColorId: null as number | null,
    selectedSizeId: null as number | null,
    variationId: null as number | null,
    isAddingToCart: false,
    isLoadingVariation: false,
    selectedVariation: null as Variation | null,
    isFavorite: product?.is_favourite,
    isFavoriteLoading: false,
    variationData: null as Variation | null,
  });
  
  const { loadCartFromStorage } = useCart();
  const { token, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const locale = useLocale();   
  const t = useTranslations();
  const { toggleProduct } = useWishlist();

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
          isLoadingVariation: false,
          variationData: response.data.data,
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

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    setState(prev => ({ ...prev, isFavoriteLoading: true }));
    
    try {
      const response = await postRequest(`/catalog/favorites/products/${product.id}/toggle`, {  }, {}, token, locale);
      console.log('fav', response.data.data);
      
      if (response.data.status) {
        const newFavoriteState = !state.isFavorite;
        setState(prev => ({ ...prev, isFavorite: newFavoriteState }));
        
        // Update Redux wishlist store with complete product data
        toggleProduct({
          id: product.id,
          name: product.name,
          min_price: parseFloat(product.price) || 0,
          price_after_discount: parseFloat(product.price_after_discount || product.price) || 0,
          default_variation_id: product.default_variation_id || null,
          discount: 0,
          is_favourite: newFavoriteState,
          out_of_stock: false,
          rate: "0.00",
          short_description: product.name,
          thumbnail: product.thumbnail || '',
          slug: product.slug || '',
          category: product.category || '',
          variations: product.variations || []
        });
        
        toast.success(state.isFavorite ? 'Product removed from favorites!' : 'Product added to favorites successfully!');
      } else {
        toast.error('Failed to update favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    } finally {
      setState(prev => ({ ...prev, isFavoriteLoading: false }));
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
        toast.error('Please select both color and size');
        return;
      }

      if (!state.selectedColorId || !state.selectedSizeId) {
        toast.error('Please wait while we process your selection');
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
      toast.error('An error occurred while adding to cart');
    } finally {
      setState(prev => ({ ...prev, isAddingToCart: false }));
    }
  };

  return (
    <div
      className="product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col"
      data-product-id={product.id}
      data-product-title={product.name}
      data-product-price={product.price}
      data-product-image={product.thumbnail}
    >
      {product.thumbnail ? (
        <a
          href={`/productDetails/${product.slug}`}
          className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group"
        >
          {/* Product Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="product-badges absolute top-2 start-2 z-10 flex flex-col gap-1">
              {product.badges.map((badge, i) => (
                <span
                  key={i}
                  className={`product-badge px-2 py-1 text-xs font-semibold rounded-full ${
                    badgeClasses[badge.type] || "bg-gray-500 text-white"
                  }`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}

          {/* Hover Buttons */}
          <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 gap-1">
            {/* Compare Button */}
            <button
              className="compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center"
              title="Add to Compare"
              data-product-id={product.id}
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <path d="M11 18H8a2 2 0 0 1-2-2V9" />
              </svg>
            </button>

            {/* Quick View Button */}
            <button
              className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
              title="Quick View"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
                  9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
                  0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>

          {/* Thumbnail Images */}
          <img
            src={product.thumbnail}
            alt={product.name}
            width={300}
            height={320}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out transform"
          />
          {product.hover && (
            <img
              src={product.hover}
              alt={`${product.title} hover`}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </a>
      ) : (
        <div className="product-thumbnail-placeholder bg-gray-200 dark:bg-gray-700 h-full object-cover rounded-lg lg:rounded-t-lg lg:rounded-b-none flex items-center justify-center text-gray-400 text-xs text-center">
          <div>
            <svg
              className="w-8 h-8 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 5h6" />
              <path d="M19 2v6" />
              <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              <circle cx="9" cy="9" r="2" />
            </svg>
            <div className="mt-2">Image Not Set</div>
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="mt-3 lg:mt-0 lg:p-3 flex flex-col flex-1">
        <div className="product-body space-y-2 mb-5">
          {product.category && (
            <p className="product-category text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              {product.category}
            </p>
          )}

          <h3 className="product-title font-semibold text-sm lg:text-base">
            <a href={`/productDetails/${product.slug}`} className="line-clamp-2">
              {product.name}
            </a>
          </h3>
         {state.variationData && <h3 className="product-title font-semibold text-sm lg:text-base">
            <a href={`/productDetails/${product.slug}`} className="line-clamp-2">
              {state.variationData.name}
            </a>
          </h3>}

          {/* Price */}
          <div className="product-price flex items-center gap-1">
            {product.min_price && (
              <p className="text-gray-500 line-through text-sm flex items-center gap-1">
                <span className="icon-riyal-symbol"></span>
                {product.min_price}
              </p>
            )}
            <p className="text-sm lg:text-base font-semibold text-secondary-600 flex items-center gap-1">
              <span className="icon-riyal-symbol"></span>
              {product.price_after_discount}
            </p>
          </div>

          {/* Colors & Sizes */}
          {(product?.variations?.[1]?.values?.length) && (
            <div className="product-options space-y-4 mt-4">
              {product?.variations?.[1]?.values.length > 0 && (
                <div className="product-colors">
                  <div className="flex flex-wrap gap-1">
                    {product?.variations?.[1]?.values.slice(0, 4).map((color: any, i: number) => (
                      <button
                        key={i}
                        className={`color-option ${state.selectedColor === color.color ? 'active' : ''}`}
                        style={{ backgroundColor: color.color }}
                        title={color.color}
                        aria-label={`Select color ${color.color}`}
                        onClick={() => handleColorSelect(color.color, color.id)}
                      >
                        <span className="sr-only">{color.color}</span>
                      </button>
                    ))}
                    {product?.variations?.[1]?.values.length > 4 && (
                      <span className="text-xs text-gray-500 ml-1">
                        +{product?.variations?.[1]?.values.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {product?.variations?.[0]?.values.length > 0 && (
                <div className="product-sizes">
                  <div className="flex flex-wrap gap-1 items-end">
                    {product.variations[0].values.slice(0, 4).map((size: any, i: number) => (
                      <button
                        key={i}
                        className={`size-option ${state.selectedSize === size.value ? 'active' : ''}`}
                        aria-label={`Select size ${size.value}`}
                        onClick={() => handleSizeSelect(size.value, size.id)}
                      >
                        {size.value}
                      </button>
                    ))}
                    {product.variations[0].values.length > 4 && (
                      <span className="text-xs text-gray-500 ml-1">
                        +{product.variations[0].values.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="product-footer mt-auto flex gap-1 lg:gap-2 items-stretch justify-between">
          <button
            className={`product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0 ${
              product?.default_variation_id 
                ? (state.isAddingToCart || state.isLoadingVariation)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                : (state.selectedColor && state.selectedSize && !state.isLoadingVariation)
                  ? ''
                  : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Add to Cart"
            onClick={handleAddToCart}
            disabled={
              product?.default_variation_id 
                ? state.isAddingToCart || state.isLoadingVariation
                : !state.selectedColor || !state.selectedSize || state.isAddingToCart || state.isLoadingVariation
            }
          >
            {state.isAddingToCart ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden lg:block">Adding...</span>
              </>
            ) : state.isLoadingVariation ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden lg:block">Loading...</span>
              </>
            ) : (
              <>
                <svg
                  className="icon-cart w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                  <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                </svg>
                <span className="hidden lg:block">Add to Cart</span>
              </>
            )}
          </button>

          <button
            className={`product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border transition-all duration-300 ease-in-out w-10 ${
              state.isFavorite 
                ? 'product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-10 active'
               
                : 'product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-10 '
            } ${state.isFavoriteLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Add to Wishlist"
            onClick={handleFavoriteToggle}
            disabled={state.isFavoriteLoading}
            title={state.isFavoriteLoading ? "Loading..." : state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {state.isFavoriteLoading ? (
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg
                className={`w-5 h-5 ${state.isFavorite ? 'wishlist-active' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill={state.isFavorite ? "none" : "none"}
                stroke={state.isFavorite ? "currentColor" : "currentColor"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
