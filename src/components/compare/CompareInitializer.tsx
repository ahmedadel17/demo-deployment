'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../app/store/hooks';
import { loadCompareFromStorage } from '../../app/store/slices/compareSlice';

function CompareInitializer() {
  const dispatch = useAppDispatch();
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only load once when the app starts
    if (!hasLoaded.current) {
      dispatch(loadCompareFromStorage());
      hasLoaded.current = true;
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
}

export default CompareInitializer;

