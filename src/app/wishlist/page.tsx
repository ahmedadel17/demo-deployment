'use client'
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import getRequest from '../../../helpers/get';
import { useAuth } from '@/app/hooks/useAuth';
import { useLocale } from 'next-intl';
import { useWishlist } from '@/app/hooks/useWishlist';
import ProductCard from '../components/Home/product/ProductCard';





// -----------------------------
// Component
// -----------------------------
export default function WishlistPage() {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const { token } = useAuth();
  const locale = useLocale();
  const { 
    products: reduxWishlistProducts, 
    loadWishlist, 
    updateFromAPI, 
    setLoading, 
    setError,
    removeProduct,
    clearAll
  } = useWishlist();

  // Function to fetch favorites from API
  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRequest('/catalog/favorites/products', { 'Content-Type': 'application/json' }, token, locale);
      
      console.log('Favorites API Response:', response.data);
      
      // Update Redux store with API response
      if (response.data && response.data.products) {
        updateFromAPI(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to fetch wishlist items');
    } finally {
      setLoading(false);
    }
  }, [token, locale, setLoading, setError, updateFromAPI]);

  useEffect(() => {
    // Load wishlist from Redux store (which loads from localStorage)
    loadWishlist();

    // Fetch favorites from API
    if (token) {
      fetchFavorites();
    }
  }, [token, locale, loadWishlist, fetchFavorites]);

  // Transform Redux wishlist products to match ProductCard interface
  const wishlistProducts = reduxWishlistProducts.map(product => ({
    id: product.id,
    title: product.name,
    name: product.name,
    thumbnail: product.thumbnail || '',
    slug: product.slug || '',
    price: product.price_after_discount.toString(),
    image: product.thumbnail || '', // Ensure image property is always available
    category: product.category || '',
    old_price: product.discount > 0 ? product.min_price.toString() : null,
    min_price: product.min_price.toString(),
    price_after_discount: product.price_after_discount.toString(),
    is_favourite: product.is_favourite,
    variations: product.variations || []
  }));


  function setAllChecked(value: boolean) {
    const map: Record<string, boolean> = {};
    reduxWishlistProducts.forEach(p => (map[String(p.id)] = value));
    setCheckedIds(map);
  }

  function getSelectedIds(): string[] {
    return Object.entries(checkedIds).filter(([, v]) => v).map(([k]) => k);
  }

  // actions
  function addSelectedToCart() {
    const selected = getSelectedIds();
    if (selected.length === 0) return;

    // TODO: integrate with your cart system
    alert(`Added ${selected.length} item(s) to cart`);

    if (confirm('Remove these items from your wishlist?')) {
      removeFromWishlist(selected);
    }
  }

  function removeFromWishlist(ids: string[]) {
    // Remove products from Redux store
    ids.forEach(id => removeProduct(Number(id)));

    // cleanup checked map
    setCheckedIds(prev => {
      const copy = { ...prev };
      ids.forEach(id => delete copy[id]);
      return copy;
    });
  }

  function clearWishlist() {
    if (!confirm('Are you sure you want to clear your entire wishlist?')) return;
    clearAll(); // Clear Redux store
    setCheckedIds({});
  }


  // UI helpers
  const anyChecked = Object.values(checkedIds).some(Boolean);
  const allChecked = wishlistProducts.length > 0 && wishlistProducts.every(p => checkedIds[String(p.id)]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{wishlistProducts.length} items saved for later</p>
      </div>

      {wishlistProducts.length > 0 ? (
        <>
          {/* Actions */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setAllChecked(true)}
                className={`te-btn te-btn-default te-btn-sm ${allChecked ? 'hidden' : ''}`}
                aria-label="Select all">
                Select All
              </button>
              <button
                onClick={() => setAllChecked(false)}
                className={`te-btn te-btn-default te-btn-sm ${allChecked ? '' : 'hidden'}`}
                aria-label="Deselect all">
                Deselect All
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={addSelectedToCart} disabled={!anyChecked} className="te-btn te-btn-primary te-btn-sm">
                Add Selected to Cart
              </button>
              <button
                onClick={() => {
                  const selected = getSelectedIds();
                  if (selected.length === 0) return;
                  if (confirm('Remove selected items from your wishlist?')) removeFromWishlist(selected);
                }}
                disabled={!anyChecked}
                className="te-btn te-btn-danger te-btn-sm">
                Remove Selected
              </button>
              <button onClick={clearWishlist} className="te-btn te-btn-default te-btn-sm">
                Clear Wishlist
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
           <ProductCard
           key={product.id}
           product={product}
           carousel={false}
           />
            ))}
          </div>

          {/* Continue shopping */}
          <div className="mt-8 text-center">
            <Link href="/products" className="te-btn te-btn-primary">Continue Shopping</Link>
          </div>
        </>
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
  );
}
