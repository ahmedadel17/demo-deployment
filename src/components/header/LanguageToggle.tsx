'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentLocale = useLocale();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = async (locale: string) => {
    if (locale === currentLocale) return;
    
    setIsLoading(true);
    setIsOpen(false);

    try {
      // Preserve current theme
      const currentTheme = localStorage.getItem('theme') || 'light';
      
      // Set the locale cookie
      document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Ensure theme is preserved in localStorage
      localStorage.setItem('theme', currentTheme);
      
      // Reload the page to apply the new locale
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-toggle-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative language-toggle-container ${className}`}>
      <button
        onClick={toggleDropdown}
        disabled={isLoading}
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
          transition-colors duration-200 text-sm font-medium
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
          ${currentLocale === 'ar' ? 'rtl' : 'ltr'}
        `}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
            <span className="text-gray-500">Switching...</span>
          </div>
        ) : (
          <>
            <span className="text-lg">{currentLanguage.flag}</span>
            <span className="hidden sm:inline">{currentLanguage.name}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && !isLoading && (
        <div className={`absolute top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 ${currentLocale === 'ar' ? 'right-0' : 'left-0'}`}>
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700
                  transition-colors duration-150 text-sm
                  ${language.code === currentLocale 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {language.code === currentLocale && (
                  <svg className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
