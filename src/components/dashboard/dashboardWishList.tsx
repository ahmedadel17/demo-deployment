"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from '@/app/hooks/useAuth';
import { useLocale } from 'next-intl';
import { useWishlist } from '@/app/hooks/useWishlist';
import postRequest from '../../../helpers/post';
import toast from 'react-hot-toast';

interface WishlistItem {
  id: number;
  title: string;
  image: string;
  price: string;
}

const MyWishlistPage: React.FC = () => {
  const { token } = useAuth();
  const locale = useLocale();
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
  const { 
    products: reduxWishlistProducts, 
    loadWishlist, 
    removeProduct,
    toggleProduct,
    isLoading,
    error: wishlistError,
    fetchWishlistData
  } = useWishlist();

  useEffect(() => {
    // Load wishlist from Redux store (which loads from localStorage)
    loadWishlist();

    // Fetch favorites from API
    if (token) {
      fetchWishlistData(token, locale);
    }
  }, [token, locale, loadWishlist, fetchWishlistData]);

  // Transform Redux wishlist products to match WishlistItem interface
  const wishlistItems: WishlistItem[] = reduxWishlistProducts.map(product => ({
    id: product.id,
    title: product.name,
    image: product.thumbnail || '',
    price: product.price_after_discount.toString()
  }));

  const handleRemove = async (productId: number) => {
    // Add to removing set to show loading state
    setRemovingIds(prev => new Set(prev).add(productId));
    
    try {
      // Call API to remove from favorites
      if (token) {
        const response = await postRequest(
          `/catalog/favorites/products/${productId}/toggle`,
          {},
          {},
          token,
          locale
        );
        
        if (response.data.status) {
          // Find the product to get its full data
          const product = reduxWishlistProducts.find(p => p.id === productId);
          
          if (product) {
            // Update Redux wishlist store
            toggleProduct({
              id: product.id,
              name: product.name,
              min_price: product.min_price,
              price_after_discount: product.price_after_discount,
              default_variation_id: product.default_variation_id,
              discount: product.discount,
              is_favourite: false,
              out_of_stock: product.out_of_stock,
              rate: product.rate,
              short_description: product.short_description,
              thumbnail: product.thumbnail,
              slug: product.slug,
              category: product.category,
              variations: product.variations || []
            });
          }
          
          toast.success('Product removed from favorites!');
        } else {
          toast.error('Failed to remove from favorites');
        }
      } else {
        // If not authenticated, just remove from local storage
        removeProduct(productId);
        toast.success('Product removed from wishlist!');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
      // Still remove from local storage on error
      removeProduct(productId);
    } finally {
      // Remove from removing set
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

 

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading wishlist...</span>
      </div>
    );
  }

  // Show error state
  if (wishlistError) {
    return (
      <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
        <p className="text-sm text-red-600 dark:text-red-400">{wishlistError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-xs text-red-500 hover:text-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
   <>
     <div className="lg:col-span-3 space-y-8 w-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Wishlist
                </h1>
              </div>

              <div className="p-6">
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="group relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                      >
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          disabled={removingIds.has(item.id)}
                          className={`absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors ${
                            removingIds.has(item.id) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          aria-label="Remove from wishlist"
                        >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>

                      {/* Product Image */}
                      <div className="aspect-square bg-gray-100 dark:bg-gray-600 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full objectCover"
                        />
                      </div>

                      {/* Product Info */}
                      <p className="text-md font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-xs">﷼</span> {item.price}
                      </p>

                      {/* Add to Cart */}
                      <button

className="te-btn te-btn-primary flex items-center justify-center gap-2 w-full mt-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                      >
                        <svg
                          className="icon-cart w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                          <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                        </svg>
                        <span className="hidden lg:block">Add to Cart</span>
                      </button>
                    </div>
                  ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="mb-6">
                      <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                      Save items you love by clicking the heart icon on any product. We&apos;ll keep them safe here for you.
                    </p>
                    <div>
                      <Link href="/products" className="te-btn te-btn-primary">Start Shopping</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
   </>
  );
};

export default MyWishlistPage;
