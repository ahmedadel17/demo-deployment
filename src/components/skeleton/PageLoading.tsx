import React from 'react';
import SkeletonShimmer from './SkeletonShimmer';

interface PageLoadingProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

const PageLoading: React.FC<PageLoadingProps> = ({ 
  showHeader = true, 
  showFooter = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && (
        <>
          <div className="h-8 bg-primary-500"></div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700"></div>
        </>
      )}
      
      <div className="flex-1 p-4">
        <SkeletonShimmer className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </SkeletonShimmer>
      </div>
      
      {showFooter && (
        <div className="h-32 bg-gray-900 dark:bg-gray-800"></div>
      )}
    </div>
  );
};

export default PageLoading;

