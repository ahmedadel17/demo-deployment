import React from 'react';
import HomePageSkeleton from './HomePageSkeleton';
import ProductsPageSkeleton from './ProductsPageSkeleton';
import ProductCardSkeleton from './ProductCardSkeleton';

interface LoadingSkeletonProps {
  type: 'home' | 'products' | 'product-card';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type, count = 1 }) => {
  if (type === 'home') {
    return <HomePageSkeleton />;
  }
  
  if (type === 'products') {
    return <ProductsPageSkeleton />;
  }
  
  if (type === 'product-card') {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </>
    );
  }
  
  return null;
};

export default LoadingSkeleton;
