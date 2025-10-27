# Loading States Implementation

This implementation provides comprehensive loading states for your Next.js application while maintaining server-side rendering capabilities.

## Features

- ✅ **Server Component Preservation**: Layout remains a server component
- ✅ **Skeleton Loading States**: Beautiful animated skeletons for all components
- ✅ **Suspense Integration**: Proper React Suspense boundaries
- ✅ **Data Fetching Loading**: Shows loading while fetching menu data
- ✅ **Reusable Components**: Modular skeleton components
- ✅ **Dark Mode Support**: Skeletons adapt to dark/light themes

## Components Created

### 1. Skeleton Components (`src/app/components/skeleton/`)

#### `HeaderTopBarSkeleton.tsx`
- Loading state for the top navigation bar
- Shows placeholder for links and contact info

#### `HeaderSkeleton.tsx`
- Loading state for the main header
- Includes logo, navigation menu, and action buttons
- Responsive design with mobile/desktop layouts

#### `FooterSkeleton.tsx`
- Loading state for the footer
- Shows placeholder for multiple columns
- Includes company info, links, and newsletter sections

#### `MarqueeSkeleton.tsx`
- Loading state for the announcement marquee
- Simple banner-style skeleton

#### `PageLoading.tsx`
- Complete page loading skeleton
- Optional header/footer display
- Generic content area with grid layout

### 2. Main Loading Wrapper (`src/app/components/LayoutWithLoading.tsx`)

This component handles:
- **Server-side data fetching** for menu data
- **Suspense boundaries** with proper fallbacks
- **Dynamic component loading** to avoid client-side hydration issues
- **Seamless integration** with existing layout

## How It Works

### 1. Server-Side Data Fetching
```typescript
async function MenuDataFetcher() {
  const { getLocale } = await import('next-intl/server');
  const getRequest = (await import('../../../helpers/get')).default;
  
  const locale = await getLocale();
  let menuData = null;
  
  try {
    menuData = await getRequest('/core/menus', {}, null, locale);
  } catch (error) {
    console.error('❌ Failed to fetch menus server-side:', error);
  }
  
  return menuData;
}
```

### 2. Suspense Integration
```typescript
<Suspense fallback={
  <>
    <MarqueeSkeleton />
    <HeaderTopBarSkeleton />
    <HeaderSkeleton />
    {children}
    <FooterSkeleton />
  </>
}>
  <HeaderFooterWithData>
    {children}
  </HeaderFooterWithData>
</Suspense>
```

### 3. Dynamic Component Loading
```typescript
// Import components dynamically to avoid hydration issues
const HeaderTopBar = (await import('./header/headerTopBar')).default;
const HeaderStyle1 = (await import('./header/styles/headerStyle1')).default;
const FooterStyle1 = (await import('./footer/styles/footerStyle1')).default;
const Marquee = (await import('./marquee')).default;
```

## Usage Examples

### Using Individual Skeleton Components

```tsx
import LoadingSkeleton from './components/skeleton/LoadingSkeleton';

// Show header loading
<LoadingSkeleton type="header" />

// Show footer loading
<LoadingSkeleton type="footer" />

// Show multiple product cards
<LoadingSkeleton type="product-card" count={6} />

// Show complete page loading
<LoadingSkeleton type="page" />
```

### Using Skeleton Components Directly

```tsx
import HeaderSkeleton from './components/skeleton/HeaderSkeleton';
import FooterSkeleton from './components/skeleton/FooterSkeleton';

function MyPage() {
  return (
    <>
      <HeaderSkeleton />
      <div>Your content here</div>
      <FooterSkeleton />
    </>
  );
}
```

### Custom Loading States

```tsx
import SkeletonShimmer from './components/skeleton/SkeletonShimmer';

function CustomSkeleton() {
  return (
    <SkeletonShimmer className="bg-white rounded-lg p-4">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-20 bg-gray-300 rounded"></div>
      </div>
    </SkeletonShimmer>
  );
}
```

## Layout Integration

The loading system is automatically integrated into your main layout:

```tsx
// In layout.tsx
<LayoutWithLoading>
  <main className="flex-1 pb-16 lg:pb-0">
    {children}
  </main>
</LayoutWithLoading>
```

## Benefits

### 1. **Better User Experience**
- Users see immediate feedback while data loads
- No blank screens or layout shifts
- Smooth transitions between loading and loaded states

### 2. **SEO Friendly**
- Server-side rendering maintained
- No client-side hydration issues
- Proper loading states for crawlers

### 3. **Performance**
- Reduced perceived loading time
- Better Core Web Vitals scores
- Improved user engagement

### 4. **Developer Experience**
- Reusable skeleton components
- Easy to customize and extend
- TypeScript support throughout

## Customization

### Styling Skeletons
```tsx
// Custom skeleton with different colors
<SkeletonShimmer className="bg-blue-100">
  <div className="h-4 bg-blue-300 rounded w-1/2"></div>
</SkeletonShimmer>
```

### Animation Timing
```css
/* In your CSS file */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
```

### Adding New Skeleton Types
1. Create new skeleton component in `skeleton/` folder
2. Add to `LoadingSkeleton.tsx` component
3. Use throughout your application

## Testing Loading States

1. **Slow Network**: Use browser dev tools to simulate slow 3G
2. **Network Throttling**: Enable network throttling in dev tools
3. **Component Testing**: Test individual skeleton components
4. **Integration Testing**: Test full page loading flows

## Best Practices

1. **Match Real Content**: Skeletons should match the actual content layout
2. **Consistent Spacing**: Use consistent spacing and sizing
3. **Accessibility**: Include proper ARIA labels for screen readers
4. **Performance**: Keep skeleton components lightweight
5. **Responsive**: Ensure skeletons work on all screen sizes

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**: Ensure skeletons match actual component dimensions
2. **Layout Shift**: Use consistent heights and widths
3. **Animation Performance**: Use CSS transforms for smooth animations
4. **Dark Mode**: Test skeletons in both light and dark themes

### Debug Tips

1. Use React DevTools to inspect Suspense boundaries
2. Check browser Network tab for data fetching timing
3. Test with different network conditions
4. Verify skeleton dimensions match real components
