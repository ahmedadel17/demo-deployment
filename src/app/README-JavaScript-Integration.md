# JavaScript Integration in Next.js

This document explains how the JavaScript files from your PHP project have been integrated into your Next.js application.

## Overview

The JavaScript functionality has been converted from vanilla JavaScript to React hooks and components, providing better integration with Next.js and React's lifecycle.

## Files Structure

### React Hooks (src/app/hooks/)
- `useDarkMode.ts` - Handles dark/light mode switching
- `useScrollEffects.ts` - Manages scroll-based effects (sticky header, progress bar, back-to-top)
- `useProductInteractions.ts` - Handles product interactions (cart, wishlist, compare, quick view)

### React Components (src/app/components/)
- `DarkModeToggle.tsx` - Dark mode toggle button component
- `ProductInteractions.tsx` - Product interaction handlers
- `ScrollEffects.tsx` - Scroll-based UI effects
- `ScriptLoader.tsx` - Loads remaining vanilla JavaScript files

### JavaScript Files (public/js/)
- All original JavaScript files have been copied to `public/js/` for loading via Next.js Script component

## How It Works

### 1. Dark Mode
```tsx
import { useDarkMode } from '../hooks/useDarkMode';

function MyComponent() {
  const { isDark, toggleDarkMode } = useDarkMode();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

### 2. Product Interactions
```tsx
import ProductInteractions from '../components/ProductInteractions';

// In your product page
<ProductInteractions 
  productId="product-123"
  productTitle="Product Name"
  productPrice="29.99"
  productImage="/path/to/image.jpg"
/>
```

### 3. Scroll Effects
The scroll effects are automatically applied when you include `<ScrollEffects />` in your layout.

### 4. Script Loading
The `ScriptLoader` component automatically loads the necessary JavaScript files:
- Dark mode functionality
- Main script (scroll effects, smooth scrolling)
- Product buttons (cart, wishlist, compare)

## Features Included

### ✅ Converted to React Hooks
- Dark mode toggle with localStorage persistence
- Scroll-based header effects
- Progress bar for navigation
- Back-to-top button
- Product cart functionality
- Wishlist management
- Product comparison
- Quick view modals
- Notification system

### ✅ Maintained as Scripts
- Embla carousel functionality
- Marquee animations
- Navigation interactions
- Form validations

## Usage Examples

### Dark Mode Toggle
```tsx
import DarkModeToggle from '../components/DarkModeToggle';

// In your header component
<DarkModeToggle />
```

### Product Page Integration
```tsx
import ProductInteractions from '../components/ProductInteractions';

function ProductPage() {
  return (
    <>
      <ProductInteractions 
        productId="product-1"
        productTitle="Product Name"
        productPrice="99.99"
        productImage="/images/product.jpg"
      />
      {/* Your product content */}
    </>
  );
}
```

### Custom Product Interactions
```tsx
import { useProductInteractions } from '../hooks/useProductInteractions';

function MyComponent() {
  const { addToCart, toggleWishlist, compareList } = useProductInteractions();
  
  const handleAddToCart = () => {
    addToCart('product-id', buttonRef.current);
  };
  
  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

## Benefits of This Approach

1. **React Integration**: All functionality works seamlessly with React's lifecycle
2. **Type Safety**: TypeScript support for better development experience
3. **Performance**: Optimized loading with Next.js Script component
4. **Maintainability**: Clean separation of concerns with hooks and components
5. **Reusability**: Hooks can be used across multiple components
6. **State Management**: Proper React state management for interactions

## Migration Notes

- All original JavaScript functionality has been preserved
- PHP-specific code has been removed or replaced with React equivalents
- Local storage is used for persistence (wishlist, theme preferences)
- API calls can be easily integrated with your backend
- All animations and transitions are maintained

## Next Steps

1. **API Integration**: Replace localStorage with actual API calls
2. **State Management**: Consider using Redux or Zustand for complex state
3. **Testing**: Add unit tests for hooks and components
4. **Performance**: Optimize script loading based on page requirements
5. **Accessibility**: Ensure all interactions are accessible

## Troubleshooting

### Scripts Not Loading
- Ensure JavaScript files are in `public/js/` directory
- Check browser console for 404 errors
- Verify script paths in `ScriptLoader.tsx`

### Interactions Not Working
- Ensure `ProductInteractions` component is included in your page
- Check that product elements have correct data attributes
- Verify that event listeners are properly attached

### Dark Mode Issues
- Check localStorage for theme preferences
- Ensure CSS classes are properly applied
- Verify that the dark mode toggle is properly initialized





