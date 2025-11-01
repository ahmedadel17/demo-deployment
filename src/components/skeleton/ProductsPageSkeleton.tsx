import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';
import SkeletonShimmer from './SkeletonShimmer';

const ProductsPageSkeleton: React.FC = () => {
  return (
    <div className="container my-12">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6">
        <SkeletonShimmer>
          <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </SkeletonShimmer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 hidden xl:block">
          <div className="sticky top-8 space-y-6">
            {/* Price Filter Widget Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <SkeletonShimmer>
                <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
              </SkeletonShimmer>
              <div className="space-y-2">
                <SkeletonShimmer>
                  <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                </SkeletonShimmer>
                <SkeletonShimmer>
                  <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </SkeletonShimmer>
              </div>
            </div>

            {/* Category Widget Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <SkeletonShimmer>
                <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
              </SkeletonShimmer>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <SkeletonShimmer>
                      <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </SkeletonShimmer>
                    <SkeletonShimmer>
                      <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </SkeletonShimmer>
                  </div>
                ))}
              </div>
            </div>

            {/* Size/Color Filter Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <SkeletonShimmer>
                <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
              </SkeletonShimmer>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {[...Array(4)].map((_, i) => (
                    <SkeletonShimmer key={i}>
                      <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </SkeletonShimmer>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {[...Array(4)].map((_, i) => (
                    <SkeletonShimmer key={i}>
                      <div className="w-8 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </SkeletonShimmer>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="xl:col-span-3">
          <div className="space-y-6">
            {/* Header with Title and Sort Controls */}
            <div className="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
              <SkeletonShimmer>
                <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </SkeletonShimmer>
              <div className="flex gap-2">
                <SkeletonShimmer>
                  <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </SkeletonShimmer>
                <SkeletonShimmer>
                  <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </SkeletonShimmer>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="te-products">
              <div
                id="products-grid"
                className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
              >
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <SkeletonShimmer key={i}>
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </SkeletonShimmer>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPageSkeleton;
