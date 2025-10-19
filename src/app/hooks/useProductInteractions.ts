'use client';

import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

export function useProductInteractions() {
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  // Initialize wishlist count
  useEffect(() => {
    // In a real app, you'd fetch from your API
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const items = JSON.parse(savedWishlist);
      setWishlistItems(items);
      setWishlistCount(items.length);
    }
  }, []);

  // Compare functionality
  const toggleCompare = useCallback((product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else if (prev.length < 4) {
        return [...prev, product];
      } else {
        showNotification('You can only compare up to 4 products at a time.', 'warning');
        return prev;
      }
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  // Wishlist functionality
  const toggleWishlist = useCallback((productId: string) => {
    setWishlistItems(prev => {
      const exists = prev.includes(productId);
      let newItems;
      
      if (exists) {
        newItems = prev.filter(id => id !== productId);
        showNotification('Removed from wishlist!', 'info');
      } else {
        newItems = [...prev, productId];
        showNotification('Added to wishlist!', 'success');
      }
      
      localStorage.setItem('wishlist', JSON.stringify(newItems));
      setWishlistCount(newItems.length);
      return newItems;
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.includes(productId);
  }, [wishlistItems]);

  // Add to cart functionality
  const addToCart = useCallback((productId: string, button: HTMLButtonElement) => {
    // Prevent double-clicks
    if (button.disabled || button.classList.contains('tewido-disabled')) {
      return;
    }

    const iconCart = button.querySelector('.icon-cart');
    const iconLoading = button.querySelector('.icon-loading');
    const iconAdded = button.querySelector('.icon-added');
    const textSpan = button.querySelector('span');

    if (!textSpan) return;

    const origText = textSpan.textContent?.trim() || 'Add to cart';

    // STEP 1: Show loading state
    textSpan.textContent = 'Adding...';
    if (iconCart) (iconCart as HTMLElement).style.display = 'none';
    if (iconLoading) (iconLoading as HTMLElement).style.display = 'inline-block';
    if (iconAdded) (iconAdded as HTMLElement).style.display = 'none';

    button.classList.add('btn-clicked', 'tewido-disabled');
    button.setAttribute('aria-disabled', 'true');

    // STEP 2: After 800ms, show "added" state
    setTimeout(() => {
      if (!document.contains(button)) return;

      textSpan.textContent = 'Added';
      if (iconLoading) (iconLoading as HTMLElement).style.display = 'none';
      if (iconAdded) (iconAdded as HTMLElement).style.display = 'inline-block';
      button.classList.add('product-added');
    }, 800);

    // STEP 3: After another 1200ms, reset to original state
    setTimeout(() => {
      if (!document.contains(button)) return;

      textSpan.textContent = origText;
      if (iconAdded) (iconAdded as HTMLElement).style.display = 'none';
      if (iconCart) (iconCart as HTMLElement).style.display = 'inline-block';

      button.classList.remove('btn-clicked', 'tewido-disabled', 'product-added');
      button.removeAttribute('aria-disabled');
    }, 2000);

    showNotification('Product added to cart!', 'success');
  }, []);

  // Quick view functionality
  const openQuickView = useCallback((product: Product) => {
    // Remove existing modal
    const existingModal = document.querySelector('.quickViewModal');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quickViewModal animate-fade-in fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';

    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center p-4 border-b sticky top-0 bg-white dark:bg-gray-800">
          <h2 class="quickViewTitle text-xl font-semibold">${product.title}</h2>
          <button class="closeQuickView text-gray-400 hover:text-gray-600 text-3xl leading-none w-8 h-8 flex items-center justify-center" type="button">&times;</button>
        </div>
        <div class="quickViewContent p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="product-image">
              <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-cover rounded-lg">
            </div>
            <div class="product-details">
              <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
              <p class="text-2xl font-bold text-blue-600 mb-4">$${product.price}</p>
              <div class="space-y-4">
                <button class="w-full te-btn te-btn-primary" onclick="alert('Added to cart!')">
                  Add to Cart
                </button>
                <a href="/productDetails" class="w-full te-btn te-btn-default block text-center">
                  View Full Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Setup close functionality
    const closeBtn = modal.querySelector('.closeQuickView');
    const closeModal = () => {
      document.body.style.overflow = 'auto';
      modal.remove();
    };

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close with Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }, []);

  return {
    compareList,
    wishlistCount,
    wishlistItems,
    toggleCompare,
    clearCompare,
    toggleWishlist,
    isInWishlist,
    addToCart,
    openQuickView
  };
}

// Notification system
function showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.toast-notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `toast-notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out translate-x-full`;

  // Set colors based on type
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white'
  };

  notification.className += ' ' + (typeClasses[type] || typeClasses.info);

  notification.innerHTML = `
    <div class="flex items-center justify-between min-w-[200px]">
      <span>${message}</span>
      <button class="close-notification ml-3 text-lg font-bold opacity-70 hover:opacity-100" type="button">&times;</button>
    </div>
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector('.close-notification');
  const removeNotification = () => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  };

  closeBtn?.addEventListener('click', removeNotification);

  // Auto close after 3 seconds
  setTimeout(removeNotification, 3000);
}




