'use client';
import { useEffect, useRef } from 'react';
import { useWishlist } from '@/app/hooks/useWishlist';

function WishlistInitializer() {
  const { loadWishlist } = useWishlist();
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only load once when the app starts
    if (!hasLoaded.current) {
      loadWishlist();
      hasLoaded.current = true;
    }
  }, [loadWishlist]);

  return null; // This component doesn't render anything
}

export default WishlistInitializer;
