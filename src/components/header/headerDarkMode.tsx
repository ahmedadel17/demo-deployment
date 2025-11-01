'use client';
import React, { useState, useEffect } from 'react'

function HeaderDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let shouldBeDark = false;
        if (storedTheme === 'dark') {
          shouldBeDark = true;
        } else if (storedTheme === 'light') {
          shouldBeDark = false;
        } else {
          // No theme set, use system preference
          shouldBeDark = prefersDark;
        }
        
        setIsDark(shouldBeDark);
        
        // Apply theme to document
        if (shouldBeDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
          document.body.classList.add('dark');
          document.body.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
          document.body.classList.add('light');
          document.body.classList.remove('dark');
        }
      } catch (error) {
        console.error('Error initializing theme:', error);
        // Fallback to light mode
        setIsDark(false);
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    };

    initializeTheme();
    setIsLoading(false);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const shouldBeDark = e.matches;
        setIsDark(shouldBeDark);
        
        if (shouldBeDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
          document.body.classList.add('dark');
          document.body.classList.remove('light');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.classList.remove('dark');
          document.body.classList.add('light');
          document.body.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    
    // Disable transitions temporarily to prevent flash
    document.documentElement.classList.add('no-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 50);
    
    setIsDark(newIsDark);
    
    // Apply theme to document
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Show loading state to prevent hydration mismatch
  if (isLoading) {
    return (
      <div className="flex items-center">
        <button 
          id="darkModeToggle" 
          className="te-navbar-icon-button" 
          aria-label="Toggle Dark Mode"
          disabled
        >
          <div className="w-6 h-6 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
            </svg>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <button 
        id="darkModeToggle" 
        className="te-navbar-icon-button relative" 
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        onClick={toggleDarkMode}
      >
        {/* Sun Icon - shown in light mode */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isDark ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-amber-500">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
          </svg>
        </div>

        {/* Moon Icon - shown in dark mode */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`}>
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-slate-300">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"></path>
          </svg>
        </div>
      </button>

      <span id="dark-mode-description" className="sr-only">
        Toggle between light and dark themes
      </span>
    </div>
  )
}

export default HeaderDarkMode
