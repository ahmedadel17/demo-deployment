'use client';

import { useProductInteractions } from '../hooks/useProductInteractions';
import { useEffect, useRef } from 'react';

interface ProductInteractionsProps {
  productId?: string;
  productTitle?: string;
  productPrice?: string;
  productImage?: string;
}

export default function ProductInteractions({ 
  productId, 
  productTitle, 
  productPrice, 
  productImage 
}: ProductInteractionsProps) {
  const {
    compareList,
    wishlistCount,
    wishlistItems,
    toggleCompare,
    clearCompare,
    toggleWishlist,
    isInWishlist,
    addToCart,
    openQuickView
  } = useProductInteractions();

  const addToCartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initialize add to cart buttons with proper icons
    const addToCartButtons = document.querySelectorAll('.product-add-to-cart');
    
    addToCartButtons.forEach((btn) => {
      if (!btn.hasAttribute('data-cart-initialized')) {
        // Add cart icon if it doesn't exist
        if (!btn.querySelector('.icon-cart')) {
          btn.insertAdjacentHTML('afterbegin', `
            <svg class="w-5 h-5 icon-cart" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
              <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
            </svg>
          `);
        }
        
        // Add loading icon
        if (!btn.querySelector('.icon-loading')) {
          btn.insertAdjacentHTML('afterbegin', `
            <svg class="w-5 h-5 icon-loading animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="display: none;">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
              <path class="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          `);
        }
        
        // Add success icon
        if (!btn.querySelector('.icon-added')) {
          btn.insertAdjacentHTML('afterbegin', `
            <svg class="w-5 h-5 icon-added" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="display: none;">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          `);
        }
        
        btn.setAttribute('data-cart-initialized', 'true');
        
        // Add click handler
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(productId || 'default', btn as HTMLButtonElement);
        });
      }
    });

    // Initialize wishlist buttons
    const wishlistButtons = document.querySelectorAll('.product-add-to-wishlist');
    wishlistButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productCard = btn.closest('.product-item');
        const productId = productCard?.getAttribute('data-product-id') || 'default';
        toggleWishlist(productId);
      });
    });

    // Initialize compare buttons
    const compareButtons = document.querySelectorAll('.compare-btn');
    compareButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const productCard = btn.closest('.product-item');
        const productId = productCard?.getAttribute('data-product-id') || 'default';
        const productTitle = productCard?.getAttribute('data-product-title') || 'Product';
        const productPrice = productCard?.getAttribute('data-product-price') || '0';
        const productImage = productCard?.getAttribute('data-product-image') || '';
        
        toggleCompare({
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage
        });
      });
    });

    // Initialize quick view buttons
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const productCard = btn.closest('.product-item');
        const productId = productCard?.getAttribute('data-product-id') || 'default';
        const productTitle = productCard?.getAttribute('data-product-title') || 'Product';
        const productPrice = productCard?.getAttribute('data-product-price') || '0';
        const productImage = productCard?.getAttribute('data-product-image') || '';
        
        openQuickView({
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage
        });
      });
    });

  }, [productId, addToCart, toggleWishlist, toggleCompare, openQuickView]);

  return null; // This component doesn't render anything, it just handles interactions
}






