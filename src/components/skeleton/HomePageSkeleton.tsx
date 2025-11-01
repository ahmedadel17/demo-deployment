import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

const HomePageSkeleton: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Breadcrumb Skeleton */}
      <div className="container mx-auto px-4 py-4">
        <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Hero Slider Skeleton */}
      <div className="relative">
        <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        {/* Slider Navigation Skeleton */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Featured Products Section Skeleton */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="te-products">
            {/* Section Header Skeleton */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-4 w-80 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>

              {/* Navigation Controls Skeleton */}
              <div className="flex gap-1">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Products Carousel Skeleton */}
            <div className="overflow-hidden">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-full">
                    <ProductCardSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-300 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>
          
          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageSkeleton;

