import React from 'react';
import HomePageSkeleton from './HomePageSkeleton';
import ProductsPageSkeleton from './ProductsPageSkeleton';
import ProductCardSkeleton from './ProductCardSkeleton';
import HeaderTopBarSkeleton from './HeaderTopBarSkeleton';
import HeaderSkeleton from './HeaderSkeleton';
import FooterSkeleton from './FooterSkeleton';
import MarqueeSkeleton from './MarqueeSkeleton';
import PageLoading from './PageLoading';

interface LoadingSkeletonProps {
  type: 'home' | 'products' | 'product-card' | 'header-topbar' | 'header' | 'footer' | 'marquee' | 'page';
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
  
  if (type === 'header-topbar') {
    return <HeaderTopBarSkeleton />;
  }
  
  if (type === 'header') {
    return <HeaderSkeleton />;
  }
  
  if (type === 'footer') {
    return <FooterSkeleton />;
  }
  
  if (type === 'marquee') {
    return <MarqueeSkeleton />;
  }
  
  if (type === 'page') {
    return <PageLoading />;
  }
  
  return null;
};

export default LoadingSkeleton;
