'use client';
import React, { useState, useEffect } from 'react'

function HeaderDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on component mount
  useEffect(() => {
    // Check the current theme state from the DOM (set by ThemeScript)
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);
    setIsLoading(false);
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Apply dark mode to the document
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
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
      className="te-navbar-icon-button" 
      aria-label="Toggle Dark Mode"
      onClick={toggleDarkMode}
    >

        {/* Sun Icon - shown in light mode */}
        <div className={`absolute w-6 h-6 text-amber-500 transition-all duration-300 ${isDark ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
            <svg fill="currentColor" viewBox="0 0 24 24" className="-translate-x-0.25 w-full h-full">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
            </svg>
        </div>

        {/* Moon Icon - shown in dark mode */}
        <div className={`absolute w-6 h-6 text-slate-300 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'} scale-75`}>
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"></path>
            </svg>
        </div>

    </button>

    <span id="dark-mode-description" className="sr-only">
        Toggle between light and dark themes </span>
</div>
  )
}

export default HeaderDarkMode
