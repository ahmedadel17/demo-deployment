# Network Detection Implementation

This implementation provides comprehensive network connectivity detection for your Next.js application.

## Features

- ✅ Real-time online/offline detection
- ✅ Connection quality monitoring (4G, 3G, etc.)
- ✅ Server reachability testing
- ✅ Redux state management integration
- ✅ Visual notification system
- ✅ Customizable notification behavior
- ✅ TypeScript support

## Components Created

### 1. `useNetworkStatus` Hook (`src/app/hooks/useNetworkStatus.ts`)

A custom hook that provides:
- Online/offline status
- Connection type and speed information
- Network change event handling

```typescript
const { isOnline, isOffline, connectionType, effectiveType, downlink, rtt } = useNetworkStatus();
```

### 2. `useNetworkPing` Hook (`src/app/hooks/useNetworkStatus.ts`)

A utility hook for periodic connectivity checks:
- Tests server reachability
- Configurable ping interval
- Automatic retry mechanism

```typescript
const { isReachable, lastCheck } = useNetworkPing('/api/health', 30000);
```

### 3. `NetworkStatus` Component (`src/app/components/NetworkStatus.tsx`)

A visual notification component that displays:
- Connection status with icons
- Detailed connection information
- Auto-hide functionality
- Customizable positioning

```tsx
<NetworkStatus 
  showDetails={true} 
  position="top" 
  autoHide={true} 
  hideDelay={5000} 
/>
```

### 4. `NetworkManager` Component (`src/app/components/NetworkManager.tsx`)

A background component that:
- Syncs network status with Redux store
- Runs automatically without UI
- Manages state updates

### 5. Redux Integration (`src/app/store/slices/networkSlice.ts`)

Network state management with:
- Online/offline status
- Connection details
- Reachability status
- Last check timestamp
- Notification visibility control

## Usage Examples

### Basic Usage in Components

```tsx
import { useAppSelector } from '../store/hooks';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

function MyComponent() {
  // Using Redux state
  const networkState = useAppSelector((state) => state.network);
  
  // Using hook directly
  const { isOnline, isOffline } = useNetworkStatus();
  
  return (
    <div>
      {networkState.isOffline && (
        <div className="offline-message">
          You are offline. Some features may not be available.
        </div>
      )}
    </div>
  );
}
```

### Conditional Rendering

```tsx
function ProductList() {
  const { isOnline } = useNetworkStatus();
  
  return (
    <div>
      {isOnline ? (
        <OnlineProductList />
      ) : (
        <OfflineProductList />
      )}
    </div>
  );
}
```

### API Calls with Network Awareness

```tsx
async function fetchData() {
  const { isOnline } = useNetworkStatus();
  
  if (!isOnline) {
    throw new Error('No internet connection');
  }
  
  try {
    const response = await fetch('/api/data');
    return response.json();
  } catch (error) {
    // Handle network errors
    console.error('Network error:', error);
  }
}
```

## Configuration Options

### NetworkStatus Component Props

- `showDetails`: Show detailed connection information
- `position`: Notification position ('top' | 'bottom')
- `autoHide`: Automatically hide notifications
- `hideDelay`: Delay before hiding (milliseconds)

### useNetworkPing Hook Options

- `url`: Endpoint to ping (default: '/api/health')
- `interval`: Ping interval in milliseconds (default: 30000)

## Integration

The network detection is automatically integrated into your main layout (`src/app/layout.tsx`):

```tsx
<ReduxProvider>
  <NetworkManager />
  <NetworkStatus showDetails={true} autoHide={true} hideDelay={5000} />
  {/* Rest of your app */}
</ReduxProvider>
```

## Redux State Structure

```typescript
interface NetworkState {
  isOnline: boolean;
  isOffline: boolean;
  connectionType?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  isReachable: boolean;
  lastCheck?: string;
  showNotification: boolean;
}
```

## Browser Support

- ✅ Modern browsers with Network Information API
- ✅ Fallback to basic online/offline detection
- ✅ Progressive enhancement approach

## Testing Network Detection

1. **Disconnect your internet** - You should see an offline notification
2. **Reconnect your internet** - You should see an online notification
3. **Check browser dev tools** - Network tab shows connection details
4. **Mobile testing** - Test on mobile devices for different connection types

## Customization

You can customize the network detection by:

1. **Modifying notification styles** in `NetworkStatus.tsx`
2. **Changing ping endpoint** in `useNetworkPing` calls
3. **Adjusting ping intervals** for different sensitivity
4. **Adding custom network events** in the Redux slice

## Troubleshooting

- Ensure the `/api/health` endpoint exists or change the ping URL
- Check browser console for any network-related errors
- Verify Redux store is properly configured
- Test on different network conditions (WiFi, mobile data, etc.)

