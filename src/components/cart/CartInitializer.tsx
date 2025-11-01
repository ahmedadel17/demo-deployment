'use client';
import { useEffect, useRef } from 'react';
import { useCart } from '@/app/hooks/useCart';

function CartInitializer() {
  const { loadCartFromStorage } = useCart();
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only load once when the app starts
    if (!hasLoaded.current) {
      loadCartFromStorage();
      hasLoaded.current = true;
    }
  }, [loadCartFromStorage]);

  return null; // This component doesn't render anything
}

export default CartInitializer;
