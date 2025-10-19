"use client";
import React from 'react'
import dynamic from 'next/dynamic'
import HeaderSearch from '../headerSearch'
import HeaderNotification from '../headerNotification'
import HeaderWishList from '../headerWishlist'
import HeaderAccount from '../headerAccount'
import HeaderCart from '../headerCart'
import HeaderMobileMenu from '../headerMobileMenu'
import LanguageToggle from '../LanguageToggle'
import { useAuth } from '@/app/hooks/useAuth'

// Dynamically import HeaderDarkMode to prevent hydration issues
const HeaderDarkMode = dynamic(() => import('../headerDarkMode'), {
  loading: () => (
    <div className="flex items-center">
      <button 
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
  )
})

import HeaderDesktopMenu from '../headerDesktopMenu'
function HeaderStyle1() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <nav className="te-navbar whitespace-nowrap mx-auto shadow-sm w-full relative bg-white dark:bg-gray-800" role="navigation" aria-label="Main Navigation">

    <div className="te-navbar-container container">

        <div className="te-navbar-content flex justify-between items-center min-h-20 relative">

            {/* <!-- Logo/Brand Section --> */}
            <div className="te-navbar-brand">
                <a href="index.php" className="flex items-center gap-3 no-underline">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">T</div><span className="text-xl font-bold text-gray-600 dark:text-white">Naseem</span>
                </a>
            </div>
<HeaderSearch />

            {/* <!-- Header Actions --> */}
            <div className="header-actions flex items-center gap-1 lg:gap-6 w-auto shrink-0">

                <div className="items-center hidden lg:flex gap-2">

                    {/* <!-- Notification --> */}
                   {isAuthenticated && <HeaderNotification />}

                    {/* <!-- Wishlist --> */}
                    {isAuthenticated && <HeaderWishList />} 

                    {/* <!-- Account --> */}
                    {isAuthenticated && <HeaderAccount   />}

                    {/* <!-- Cart --> */}
                    {isAuthenticated && <HeaderCart />}

                    {/* <!-- Login Icon (when not authenticated) --> */}
                    {!isAuthenticated && (
                        <a 
                            href="/auth/login" 
                            className="te-navbar-icon-button"
                            aria-label="Login"
                            title="Login"
                        >
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                                />
                            </svg>
                        </a>
                    )}

                </div>

                {/* <!-- Language Toggle Button --> */}
                {isAuthenticated && <LanguageToggle className="" />}

                {/* <!-- Dark Mode Toggle Button --> */}
                <HeaderDarkMode />

                {/* <!-- Mobile Menu Toggle Button --> */}
                <HeaderMobileMenu />

            </div>
            {/* <!-- header-actions --> */}

        </div>
        {/* <!-- te-navbar-content --> */}

        {/* <!-- Desktop Navigation Menu --> */}
        <HeaderDesktopMenu/>

    </div>
</nav>
    </div>
  )
}

export default HeaderStyle1
