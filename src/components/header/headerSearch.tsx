'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
function HeaderSearch() {
    const t = useTranslations();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to products page with search query
            const searchUrl = `/products?keyword=${encodeURIComponent(searchQuery.trim())}`;
            // console.log('Navigating to:', searchUrl);
            router.push(searchUrl);
        } else {
            // Navigate to products page without search to reset filtration
            // console.log('Resetting search - navigating to products page');
            router.push('/products');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

  return (
<div className="hidden lg:block w-96">
    <form onSubmit={handleSearch} className="relative">
        <svg className="absolute start-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
        </svg>

        <input 
            type="text" 
            id="navbar-search-ecommerce" 
            name="product_search" 
            className="ps-10 pe-12 text-sm rounded-lg" 
            placeholder={t("Search products")} 
            autoComplete="off" 
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
        />

        {searchQuery && (
          <button 
            type="button"
            onClick={() => {
              setSearchQuery('');
              router.push('/products');
            }}
            className="absolute end-12 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200" 
            aria-label="Clear search"
            title="Clear search"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        )}
        <button 
            type="submit"
            className="hs-btn absolute end-1 top-1/2 transform -translate-y-1/2 p-2 bg-primary-200 hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300 text-white rounded-lg transition-colors duration-200" 
            aria-label="Search"
        >
            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
            </svg>
        </button>
    </form>
</div>
  )
}

export default HeaderSearch
