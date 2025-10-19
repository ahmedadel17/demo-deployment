import React from 'react';

interface SkeletonShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

const SkeletonShimmer: React.FC<SkeletonShimmerProps> = ({ className = '', children }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      {children}
    </div>
  );
};

export default SkeletonShimmer;

