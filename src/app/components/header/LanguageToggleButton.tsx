'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';

interface LanguageToggleButtonProps {
  className?: string;
}

const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentLocale = useLocale();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  const nextLanguage = languages.find(lang => lang.code !== currentLocale) || languages[1];

  const handleLanguageToggle = async () => {
    const newLocale = nextLanguage.code;
    if (newLocale === currentLocale) return;
    
    setIsLoading(true);

    try {
      // Preserve current theme
      const currentTheme = localStorage.getItem('theme') || 'light';
      
      // Set the locale cookie
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Ensure theme is preserved in localStorage
      localStorage.setItem('theme', currentTheme);
      
      // Reload the page to apply the new locale
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLanguageToggle}
      disabled={isLoading}
      className={`
        te-navbar-icon-button flex items-center justify-center
        transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={`Switch to ${nextLanguage.name}`}
      aria-label={`Switch to ${nextLanguage.name}`}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
      ) : (
        <div className="flex items-center space-x-1">
          <span className="text-lg">{currentLanguage.flag}</span>
          <svg 
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default LanguageToggleButton;
