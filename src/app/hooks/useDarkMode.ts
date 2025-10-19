'use client';

import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to temporarily disable transitions
    const disableTransitions = () => {
      document.documentElement.classList.add('no-transition');
      setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
      }, 50);
    };

    // Check current state - only after component mounts
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Mark as ready to prevent any remaining flash
    document.documentElement.classList.add('light');

    // Ensure correct class is applied
    if (shouldBeDark) {
      disableTransitions();
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    setIsLoading(false);

    // System preference change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        disableTransitions();
        if (e.matches) {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
          setIsDark(true);
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
          setIsDark(false);
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleDarkMode = () => {
    const willBeDark = !isDark;

    // Disable transitions before theme change
    document.documentElement.classList.add('no-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 50);

    if (willBeDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  };

  return { isDark, toggleDarkMode, isLoading };
}
