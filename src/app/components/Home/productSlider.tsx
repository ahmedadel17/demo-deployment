'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './product/ProductCard';
import { Product } from '@/app/dummyData/products';
import { useTranslations } from 'next-intl';
import ProductCard2 from '../productCard2';
export default function ProductSlider({ products }: { products: Product[] }) {
  console.log('products',products);
  const [isRTL, setIsRTL] = useState(false);
  const t = useTranslations();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'trimSnaps',
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    direction: isRTL ? 'rtl' : 'ltr',
  }, [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // RTL Detection
  useEffect(() => {
    const checkDirection = () => {
      const htmlDir = document.documentElement.getAttribute('dir');
      setIsRTL(htmlDir === 'rtl');
    };

    // Check on mount
    checkDirection();

    // Watch for changes
    const observer = new MutationObserver(checkDirection);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });

    return () => observer.disconnect();
  }, []);

  // Reinitialize Embla when direction changes
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({
      loop: true,
      containScroll: 'trimSnaps',
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      direction: isRTL ? 'rtl' : 'ltr',
    });
  }, [emblaApi, isRTL]);



  return (
    <section className="py-16  dark:bg-gray-900">
      <div className="container">
        <div className="te-products">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('Featured Products')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('Discover our carefully curated collection of premium products')}
              </p>
            </div>

            <div className="embla-control flex gap-1">
              <button
                onClick={scrollPrev}
                className="embla-prev bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label={isRTL ? "Next" : "Previous"}
              >
                {isRTL ? (
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              <button
                onClick={scrollNext}
                className="embla-next bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label={isRTL ? "Previous" : "Next"}
              >
                {isRTL ? (
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Embla Carousel Wrapper */}
          <div 
            className="embla overflow-hidden relative" 
            ref={emblaRef}
          >
            <div className="embla__container flex gap-3 lg:gap-6 py-1">
              {products?.map((_, index) => {
                // Group products in sets of 4 for large screens
                if (index % 4 === 0) {
                  const p1 = products[index];
                  const p2 = products[index + 1];
                  const p3 = products[index + 2];
                  const p4 = products[index + 3];
                  return (
                    <div
                      key={`slide-${index}`}
                      className="embla__slide flex-shrink-0 py-1 w-full flex gap-3"
                    >
                      {p1 && (
                        <div className="basis-1/2 lg:basis-1/4">
                          <ProductCard2
                            product={p1}
                          />
                        </div>
                      )}
                      {p2 && (
                        <div className="basis-1/2 lg:basis-1/4">
                          <ProductCard2
                            product={p2}
                          />
                        </div>
                      )}
                      {p3 && (
                        <div className="hidden lg:block lg:basis-1/4">
                          <ProductCard2
                            product={p3}
                          />
                        </div>
                      )}
                      {p4 && (
                        <div className="hidden lg:block lg:basis-1/4">
                          <ProductCard2
                            product={p4}
                          />
                        </div>
                      )}
                    </div>
                  );
                }
                return null; // Skip non-leading indices within each group of 4
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
