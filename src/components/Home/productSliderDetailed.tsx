"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  old_price?: number;
  image?: string;
  thumbnail?: string;
  slug?: string;
  category?: string;
  is_favourite?: boolean;
  variations?: { id: number; name: string; values: { id: number; value: string }[] }[];
  badges?: { type: string; text: string }[];
  colors?: string[];
  sizes?: string[];
  [key: string]: unknown;
}

interface ProductSliderDetailedProps {
  products: Product[];
  title?: string;
}

function ProductSliderDetailed({ products, title = "Best Seller" }: ProductSliderDetailedProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 1 },
      '(min-width: 768px)': { slidesToScroll: 1 },
    }
  });
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: { canScrollPrev: () => boolean; canScrollNext: () => boolean }) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="te-section-small">
      <div className="container">
        <div className="te-carousel">
          <div className="flex items-center justify-between mb-4">
            <h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            
            <div className="embla-control flex gap-1 rtl:flex-row-reverse">
              <button 
                className="embla-prev bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              
              <button 
                className="embla-next bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Embla Carousel Wrapper */}
          <div className="embla overflow-hidden relative" ref={emblaRef}>
            <div className="embla__container flex gap-6 lg:gap-6 py-1">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="embla__slide flex-shrink-0 py-1 [flex:0_0_calc(50%-0.75rem)] md:[flex:0_0_calc(33.333%-0.75rem)] lg:[flex:0_0_calc(25%-1.2rem)]"
                >
                  <div 
                    className="product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col" 
                    data-product-id={product.id} 
                    data-product-title={product.title} 
                    data-product-price={product.price} 
                    data-product-image={product.thumbnail || product.image}
                  >
                    {product.thumbnail || product.image ? (
                      <a href={`/productDetails/${product.slug || product.id}`} className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group">
                        {/* Product Badges */}
                        {product.badges && product.badges.length > 0 && (
                          <div className="product-badges absolute top-2 start-2 z-10 flex flex-col gap-1">
                            {product.badges.map((badge, index) => (
                              <span 
                                key={index}
                                className={`product-badge px-2 py-1 text-xs font-semibold rounded-full ${
                                  badge.type === 'SALE' ? 'bg-red-500/20 text-red-500' :
                                  badge.type === 'BEST SELLER' ? 'bg-blue-500/20 text-blue-500' :
                                  badge.type === 'HOT' ? 'bg-orange-500/20 text-orange-500' :
                                  badge.type === 'NEW' ? 'bg-green-500/20 text-green-500' :
                                  badge.type === 'LIMITED' ? 'bg-purple-500/20 text-purple-500' :
                                  'bg-gray-500/20 text-gray-500'
                                }`}
                              >
                                {badge.text}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Hover Buttons - Center of Image */}
                        <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 gap-1">
                          {/* Compare Button */}
                          <button 
                            className="compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center [&.active]:bg-primary-300 [&.active]:text-white" 
                            data-product-id={product.id} 
                            title="Add to Compare"
                          >
                            <svg className="w-4 h-4 lg:w-5 lg:h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="18" cy="18" r="3"></circle>
                              <circle cx="6" cy="6" r="3"></circle>
                              <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                              <path d="M11 18H8a2 2 0 0 1-2-2V9"></path>
                            </svg>
                          </button>

                          {/* Quick View Button */}
                          <button 
                            className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center" 
                            title="Quick View"
                          >
                            <svg className="w-4 h-4 lg:w-5 lg:h-5" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          </button>
                        </div>

                        {/* Thumbnail Main Image */}
                        <img 
                          src={product.thumbnail || product.image} 
                          alt={product.title} 
                          fetchPriority="high" 
                          decoding="async" 
                          width="300" 
                          height="320" 
                          className="w-full h-full object-cover transition-all duration-500 ease-in-out transform"
                        />

                        {/* Thumbnail Flip Image - if available */}
                        {product.variations && product.variations.length > 0 && (
                          <img 
                            src={product.variations[0]?.values?.[0]?.value || product.thumbnail || product.image} 
                            alt={`${product.title} hover image`} 
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                          />
                        )}
                      </a>
                    ) : (
                      <div className="product-thumbnail-placeholder bg-gray-200 dark:bg-gray-700 h-full object-cover rounded-lg lg:rounded-t-lg lg:rounded-b-none flex items-center justify-center text-gray-400 dark:text-gray-400 text-xs text-center">
                        <div className="text-center">
                          <svg className="w-8 h-8 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M16 5h6"></path>
                            <path d="M19 2v6"></path>
                            <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path>
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                            <circle cx="9" cy="9" r="2"></circle>
                          </svg>
                          <div className="mt-2">Image Not Set</div>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 lg:mt-0 lg:p-3 flex flex-col flex-1">
                      <div className="product-body space-y-2 mb-5">
                        {/* Category */}
                        <p className="product-category text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                          {product.category || 'General'}
                        </p>

                        <h3 className="product-title font-semibold text-sm lg:text-base">
                          <a href={`/productDetails/${product.slug || product.id}`} className="line-clamp-2">
                            {product.title}
                          </a>
                        </h3>

                        <div className="product-price flex items-center gap-1">
                          {product.old_price && product.old_price > product.price && (
                            <p className="text-gray-500 dark:text-gray-300 line-through text-sm flex items-center gap-1">
                              <span className="icon-riyal-symbol"></span>
                              {product.old_price.toFixed(2)}
                            </p>
                          )}
                          <p className="text-sm lg:text-base font-semibold text-secondary-600 flex items-center gap-1">
                            <span className="icon-riyal-symbol"></span>
                            {product.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Colors & Sizes */}
                        {(product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0) ? (
                          <div className="product-options space-y-4 !mt-4">
                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                              <div className="product-colors">
                                <div className="flex flex-wrap gap-1">
                                  {product.colors.slice(0, 3).map((color, index) => (
                                    <button 
                                      key={index}
                                      className="color-option w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors" 
                                      style={{ backgroundColor: color }} 
                                      data-color={color} 
                                      title={color} 
                                      aria-label={`Select color ${color}`}
                                    >
                                      <span className="sr-only">{color}</span>
                                    </button>
                                  ))}
                                  {product.colors.length > 3 && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">+{product.colors.length - 3}</span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                              <div className="product-sizes">
                                <div className="flex flex-wrap gap-1 items-end">
                                  {product.sizes.slice(0, 4).map((size, index) => (
                                    <button 
                                      key={index}
                                      className="size-option px-2 py-1 text-xs border border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded" 
                                      data-size={size} 
                                      aria-label={`Select size ${size}`}
                                    >
                                      {size}
                                    </button>
                                  ))}
                                  {product.sizes.length > 4 && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">+{product.sizes.length - 4}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>

                      <div className="product-footer mt-auto flex gap-1 lg:gap-2 items-stretch justify-between">
                        {/* Add to Cart */}
                        <button className="product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0" aria-label="Add to Cart">
                          <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                            <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                          </svg>
                          <span className="hidden lg:block">Add to Cart</span>
                        </button>

                        {/* Add to Wishlist */}
                        <button 
                          className={`product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-10 ${product.is_favourite ? 'active' : ''}`} 
                          aria-label="Add to Wishlist"
                        >
                          <svg 
                            className={`w-5 h-5 ${product.is_favourite ? 'wishlist-active' : ''}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill={product.is_favourite ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            strokeWidth="1.6" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductSliderDetailed;
