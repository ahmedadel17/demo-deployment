import React from 'react';
import SkeletonShimmer from './SkeletonShimmer';

const HeaderSkeleton: React.FC = () => {
  return (
    <SkeletonShimmer className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main header content */}
          <div className="flex items-center justify-between h-16">
            {/* Logo area */}
            <div className="flex-shrink-0">
              <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            
            {/* Navigation menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-18"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-22"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-14"></div>
              </div>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-between h-16">
            <div className="h-8 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </SkeletonShimmer>
  );
};

export default HeaderSkeleton;

