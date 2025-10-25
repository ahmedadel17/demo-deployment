'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// -----------------------------
// Types
// -----------------------------
type Badge = { type: string; text: string };

type Product = {
  id: string | number;
  title: string;
  price: number | string;
  old_price?: number | string;
  image?: string;
  hover?: string;
  category?: string;
  badges?: Badge[];
  colors?: string[];
  sizes?: string[];
};

// -----------------------------
// Dummy products data (replace with API or import)
// -----------------------------
const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Classic Leather Jacket',
    price: 249,
    old_price: 299,
    image: '/images/products/jacket-1.jpg',
    hover: '/images/products/jacket-1b.jpg',
    category: 'Jackets',
    badges: [ { type: 'sale', text: 'Sale' }, { type: 'bestseller', text: 'Bestseller' } ],
    colors: ['#111827', '#374151', '#ef4444', '#f59e0b'],
    sizes: ['S','M','L','XL']
  },
  {
    id: 2,
    title: 'Minimal Sneakers',
    price: 119,
    image: '/images/products/sneakers-1.jpg',
    category: 'Shoes',
    badges: [ { type: 'new', text: 'New' } ],
    colors: ['#ffffff', '#000000'],
    sizes: ['38','39','40','41','42']
  },
  {
    id: 3,
    title: 'Vintage Sunglasses',
    price: 49,
    image: '/images/products/sunglasses.jpg',
    category: 'Accessories'
  }
];

// -----------------------------
// Helpers - localStorage wishlist
// -----------------------------
const WISHLIST_KEY = 'wishlist';

function readWishlistFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch (e) {
    console.warn('Failed to read wishlist from localStorage', e);
    return [];
  }
}

function writeWishlistToStorage(ids: string[]) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch (e) {
    console.warn('Failed to write wishlist to localStorage', e);
  }
}

// -----------------------------
// Component
// -----------------------------
export default function WishlistPage() {
  const [products] = useState<Product[]>(DUMMY_PRODUCTS); // replace with fetch if needed
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // hydrate wishlist from localStorage on client
    const ids = readWishlistFromStorage();
    setWishlistIds(ids);

    // Set initial checked map to false
    const map: Record<string, boolean> = {};
    ids.forEach(id => (map[id] = false));
    setCheckedIds(map);
  }, []);

  // derived list of products that are in wishlist
  const wishlistProducts = useMemo(() => {
    const setIds = new Set(wishlistIds.map(String));
    return products;
  }, [products, wishlistIds]);

  // update localStorage whenever wishlistIds change
  useEffect(() => {
    writeWishlistToStorage(wishlistIds);
  }, [wishlistIds]);

  // checkbox handlers
  function toggleCheck(id: string | number) {
    const key = String(id);
    setCheckedIds(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function setAllChecked(value: boolean) {
    const map: Record<string, boolean> = {};
    wishlistProducts.forEach(p => (map[String(p.id)] = value));
    setCheckedIds(map);
  }

  function getSelectedIds(): string[] {
    return Object.entries(checkedIds).filter(([_, v]) => v).map(([k]) => k);
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
    setWishlistIds(prev => prev.filter(id => !ids.includes(String(id))));

    // cleanup checked map
    setCheckedIds(prev => {
      const copy = { ...prev };
      ids.forEach(id => delete copy[id]);
      return copy;
    });
  }

  function clearWishlist() {
    if (!confirm('Are you sure you want to clear your entire wishlist?')) return;
    setWishlistIds([]);
    setCheckedIds({});
  }

  function removeSingle(id: string | number) {
    if (!confirm('Remove this item from your wishlist?')) return;
    removeFromWishlist([String(id)]);
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

      {products.length > 0 ? (
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
              <article
                key={product.id}
                className="wishlist-item product-item w-full h-full bg-white dark:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col relative"
                data-product-id={product.id}
                data-product-title={product.title}
                data-product-price={product.price}
                data-product-image={product.image}
              >
                {/* Checkbox */}
                <div className="absolute top-3 start-3 z-10">
                  <input
                    type="checkbox"
                    className="wishlist-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    checked={!!checkedIds[String(product.id)]}
                    onChange={() => toggleCheck(product.id)}
                    aria-label={`Select ${product.title}`}
                  />
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeSingle(product.id)}
                  className="remove-from-wishlist absolute top-3 end-3 z-10 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                  title="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Thumbnail */}
                <Link href={`/single?id=${product.id}`} className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group">
                  {product.image ? (
                    <div className="relative w-full h-56">
                      <Image src={product.image} alt={product.title} fill className="objectCover transition-all duration-500" sizes="(max-width: 768px) 100vw, 25vw" />
                    </div>
                  ) : (
                    <div className="product-thumbnail-placeholder bg-gray-200 dark:bg-gray-700 h-56 flex items-center justify-center text-gray-400 text-xs text-center">
                      <div>
                        <svg className="w-8 h-8 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
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
                </Link>

                <div className="mt-3 lg:mt-0 lg:p-3 flex flex-col flex-1">
                  <div className="product-body space-y-2 mb-5">
                    {product.category && (
                      <p className="product-category text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{product.category}</p>
                    )}

                    <h3 className="product-title font-semibold text-sm lg:text-base">
                      <Link href={`/single?id=${product.id}`} className="line-clamp-2">{product.title}</Link>
                    </h3>

                    <div className="product-price flex items-center gap-1">
                      {product.old_price && (
                        <p className="text-gray-500 dark:text-gray-300 line-through text-sm flex items-center gap-1">
                          <span className="icon-riyal-symbol">ر</span>
                          {product.old_price}
                        </p>
                      )}
                      <p className="text-sm lg:text-base font-semibold text-secondary-600 flex items-center gap-1">
                        <span className="icon-riyal-symbol">ر</span>
                        {product.price}
                      </p>
                    </div>

                    {/* colors & sizes preview */}
                    {(product.colors?.length || product.sizes?.length) && (
                      <div className="product-options space-y-4 !mt-4">
                        {product.colors && (
                          <div className="product-colors">
                            <div className="flex flex-wrap gap-1">
                              {product.colors.slice(0,4).map(color => (
                                <button key={color} className="color-option w-6 h-6 rounded-full border" style={{ backgroundColor: color }} title={color} aria-label={`Color ${color}`} />
                              ))}
                              {product.colors.length > 4 && <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">+{product.colors.length - 4}</span>}
                            </div>
                          </div>
                        )}

                        {product.sizes && (
                          <div className="product-sizes">
                            <div className="flex flex-wrap gap-1 items-end">
                              {product.sizes.slice(0,4).map(size => (
                                <button key={size} className="size-option px-2 py-1 border rounded text-xs" aria-label={`Size ${size}`}>{size}</button>
                              ))}
                              {product.sizes.length > 4 && <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">+{product.sizes.length - 4}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  <div className="product-footer mt-auto flex">
                    <button
                      onClick={() => {
                        // simulate add to cart UI
                        alert('Added to cart');
                      }}
                      className="product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0"
                      aria-label="Add to Cart"
                    >
                      <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                        <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </article>
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
            Save items you love by clicking the heart icon on any product. We'll keep them safe here for you.
          </p>
          <div>
            <Link href="/products" className="te-btn te-btn-primary">Start Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
