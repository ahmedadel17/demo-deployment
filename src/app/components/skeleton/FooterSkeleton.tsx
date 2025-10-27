import React from 'react';
import SkeletonShimmer from './SkeletonShimmer';

const FooterSkeleton: React.FC = () => {
  return (
    <SkeletonShimmer className="bg-gray-900 dark:bg-gray-800">
      <div className="bg-gray-800 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info column */}
            <div className="space-y-4">
              <div className="h-8 w-32 bg-gray-600 dark:bg-gray-500 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-full"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-3/4"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-1/2"></div>
              </div>
            </div>
            
            {/* Quick links column */}
            <div className="space-y-4">
              <div className="h-6 w-24 bg-gray-600 dark:bg-gray-500 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-20"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-24"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-18"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-22"></div>
              </div>
            </div>
            
            {/* Customer service column */}
            <div className="space-y-4">
              <div className="h-6 w-28 bg-gray-600 dark:bg-gray-500 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-24"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-20"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-26"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-16"></div>
              </div>
            </div>
            
            {/* Newsletter column */}
            <div className="space-y-4">
              <div className="h-6 w-20 bg-gray-600 dark:bg-gray-500 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-full"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-3/4"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-10 bg-gray-600 dark:bg-gray-500 rounded flex-1"></div>
                <div className="h-10 w-20 bg-gray-600 dark:bg-gray-500 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-600">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-16"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-20"></div>
                <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-18"></div>
              </div>
              <div className="h-4 bg-gray-600 dark:bg-gray-500 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonShimmer>
  );
};

export default FooterSkeleton;
