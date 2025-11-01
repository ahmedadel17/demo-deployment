import React from 'react';
import SkeletonShimmer from './SkeletonShimmer';

const HeaderTopBarSkeleton: React.FC = () => {
  return (
    <SkeletonShimmer className="bg-gray-100 dark:bg-gray-800">
      <div className="bg-gray-200 dark:bg-gray-700 h-8 w-full">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
        </div>
      </div>
    </SkeletonShimmer>
  );
};

export default HeaderTopBarSkeleton;

