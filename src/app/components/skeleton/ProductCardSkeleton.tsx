import React from 'react';
import SkeletonShimmer from './SkeletonShimmer';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col">
      {/* Image Skeleton */}
      <SkeletonShimmer className="relative block overflow-hidden rounded-t-lg">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      </SkeletonShimmer>

      <div className="p-4 flex flex-col flex-1">
        <div className="product-body space-y-2 mb-4">
          {/* Category Skeleton */}
          <SkeletonShimmer>
            <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </SkeletonShimmer>

          {/* Title Skeleton */}
          <div className="space-y-1">
            <SkeletonShimmer>
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
            </SkeletonShimmer>
            <SkeletonShimmer>
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </SkeletonShimmer>
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center gap-2">
            <SkeletonShimmer>
              <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </SkeletonShimmer>
            <SkeletonShimmer>
              <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </SkeletonShimmer>
          </div>

          {/* Color Options Skeleton */}
          <div className="flex flex-wrap gap-1 mt-3">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>

          {/* Size Options Skeleton */}
          <div className="flex flex-wrap gap-1 mt-3">
            <div className="w-8 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-8 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-8 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-8 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Footer Buttons Skeleton */}
        <div className="product-footer mt-auto flex gap-2 items-stretch">
          <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
