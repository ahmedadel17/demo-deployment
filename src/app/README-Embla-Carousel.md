# Embla Carousel Integration for Product Gallery

This document explains how the Embla carousel has been integrated into the product gallery for enhanced image viewing functionality.

## Overview

The product gallery now uses Embla Carousel with React integration, providing:
- Smooth image transitions
- Thumbnail navigation
- Autoplay functionality
- Touch/swipe support
- Zoom functionality
- Play/pause controls

## Components

### 1. ProductGalleryCarousel.tsx
The main React component that integrates Embla Carousel with the product gallery.

**Features:**
- Main image carousel with autoplay
- Thumbnail carousel for navigation
- Zoom functionality with mouse interaction
- Navigation buttons (prev/next)
- Play/pause button
- Responsive design
- Dark mode support

### 2. CSS Integration
The `embla-carousel.css` file provides all necessary styles for:
- Carousel layout and transitions
- Thumbnail styling
- Navigation buttons
- Dark mode support
- Responsive design
- Accessibility features

## Usage

### Basic Usage
```tsx
import ProductGalleryCarousel from '../components/product/ProductGalleryCarousel';

<ProductGalleryCarousel 
  images={[
    "/assets/images/product-6.jpg",
    "/assets/images/product-6-1.jpg",
    "/assets/images/product-6-2.jpg",
    "/assets/images/product-6-3.jpg",
    "/assets/images/product-6-4.jpg"
  ]} 
  discount="20% OFF" 
/>
```

### Props
- `images: string[]` - Array of image URLs
- `discount?: string` - Optional discount badge text

## Features

### 1. Autoplay
- Automatically cycles through images every 3 seconds
- Pauses on mouse hover
- Stops on user interaction
- Can be controlled with play/pause button

### 2. Navigation
- **Thumbnail Navigation**: Click thumbnails to jump to specific images
- **Arrow Navigation**: Use prev/next buttons
- **Touch/Swipe**: Swipe on mobile devices
- **Keyboard**: Arrow keys for navigation

### 3. Zoom Functionality
- Click on image to zoom in/out
- Mouse movement controls zoom position
- Lens effect shows zoom area
- Smooth transitions

### 4. Responsive Design
- Adapts to different screen sizes
- Touch-friendly on mobile
- Optimized thumbnail sizes
- Responsive navigation buttons

### 5. Accessibility
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- ARIA labels

## Technical Implementation

### Dependencies
```json
{
  "embla-carousel": "^8.6.0",
  "embla-carousel-react": "^8.6.0"
}
```

### Key Hooks Used
- `useEmblaCarousel` - Main carousel functionality
- `useCallback` - Optimized event handlers
- `useState` - Component state management
- `useEffect` - Lifecycle management

### Event Handlers
- `onSelect` - Syncs main carousel with thumbnails
- `onThumbClick` - Handles thumbnail navigation
- `scrollPrev/Next` - Navigation controls
- `handleZoomToggle` - Zoom functionality

## Customization

### Autoplay Settings
```tsx
Autoplay({ 
  delay: 3000,              // 3 seconds between slides
  stopOnInteraction: true,  // Stop on user interaction
  stopOnMouseEnter: true,   // Pause on hover
  playOnInit: true,         // Start immediately
  stopOnFocusIn: true       // Stop on focus
})
```

### Carousel Options
```tsx
{
  loop: true,           // Infinite loop
  duration: 20,         // Transition duration
  direction: 'ltr'      // Direction
}
```

### Thumbnail Options
```tsx
{
  containScroll: 'keepSnaps',
  dragFree: true
}
```

## Styling

### CSS Classes
- `.embla` - Main carousel container
- `.embla__container` - Slide container
- `.embla__slide` - Individual slides
- `.embla-thumbs` - Thumbnail carousel
- `.embla-thumbs__slide` - Thumbnail slides
- `.embla__prev/next` - Navigation buttons
- `.embla__play-pause` - Play/pause button

### Customization
You can customize the appearance by modifying the CSS classes in `embla-carousel.css`:

```css
/* Custom navigation button styles */
.embla__prev,
.embla__next {
  background: your-custom-color;
  border-radius: your-custom-radius;
}

/* Custom thumbnail styles */
.embla-thumbs__slide__img {
  width: your-custom-size;
  border-radius: your-custom-radius;
}
```

## Performance

### Optimizations
- Lazy loading for images
- Efficient event handling with `useCallback`
- Minimal re-renders
- Smooth animations with CSS transitions

### Best Practices
- Use appropriate image sizes
- Optimize images for web
- Consider lazy loading for large galleries
- Test on different devices

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch device support
- Keyboard navigation

## Troubleshooting

### Common Issues

1. **Carousel not initializing**
   - Check if Embla scripts are loaded
   - Verify React hooks are properly imported
   - Ensure images are loaded

2. **Thumbnails not syncing**
   - Check `onSelect` callback
   - Verify thumbnail click handlers
   - Ensure both carousels are initialized

3. **Autoplay not working**
   - Check Autoplay plugin import
   - Verify autoplay options
   - Check for JavaScript errors

4. **Zoom not working**
   - Check mouse event handlers
   - Verify zoom container setup
   - Check CSS transform properties

### Debug Tips
- Use browser dev tools to inspect carousel state
- Check console for JavaScript errors
- Verify all dependencies are loaded
- Test on different screen sizes

## Migration from Vanilla JS

The new React component replaces the vanilla JavaScript implementation with:
- Better React integration
- Improved performance
- Enhanced accessibility
- Modern development practices
- Type safety with TypeScript

## Future Enhancements

Potential improvements:
- Fullscreen mode
- Image preloading
- Lazy loading
- Advanced zoom controls
- Image filters
- Social sharing
- Analytics integration





