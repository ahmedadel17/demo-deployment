import React from 'react';
import SkeletonShimmer from './SkeletonShimmer';

const MarqueeSkeleton: React.FC = () => {
  return (
    <SkeletonShimmer className="bg-primary-500">
      <div className="bg-primary-400 h-8 w-full">
        <div className="flex items-center justify-center h-full">
          <div className="h-4 bg-primary-300 rounded w-48"></div>
        </div>
      </div>
    </SkeletonShimmer>
  );
};

export default MarqueeSkeleton;
