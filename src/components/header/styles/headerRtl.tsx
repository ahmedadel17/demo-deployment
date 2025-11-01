import React from 'react'
import Logo from '../logo'
import HeaderSearch from '../headerSearch'
import HeaderNotification from '../headerNotification'
import HeaderWishList from '../headerWishlist'
import HeaderAccount from '../headerAccount'
import HeaderCart from '../headerCart'
import HeaderDarkMode from '../headerDarkMode'
import HeaderMobileMenu from '../headerMobileMenu'
import HeaderDesktopMenu from '../headerDesktopMenu'
import { useAuth } from '@/app/hooks/useAuth'
import LanguageToggle from '../LanguageToggle'
import LanguageToggleButton from '../LanguageToggleButton'
function HeaderRtl( { menuData }: { menuData: any } ) {
  const { isAuthenticated } = useAuth();

  return (
    <div>
         <nav className="te-navbar flex rtl:flex-row-reverse whitespace-nowrap mx-auto shadow-sm w-full relative bg-white dark:bg-gray-800" role="navigation" aria-label="Main Navigation">

<div className="te-navbar-container container rtl:flex-row-reverse">

    <div className="te-navbar-content flex justify-between items-center min-h-20 relative  rtl:flex-row-reverse">

      

        {/* <!-- Header Actions --> */}

        <div className="header-actions flex items-center gap-1 lg:gap-6 w-auto shrink-0 rtl:flex-row">
            {/* <!-- Mobile Menu Toggle Button - First for RTL --> */}
            
            {/* <!-- Dark Mode Toggle Button --> */}
            <HeaderMobileMenu menuData={menuData} />
            <HeaderDarkMode />
            <LanguageToggleButton/>
            <div className="items-center hidden lg:flex gap-2 rtl:flex-row">
         

<div>


</div >

{isAuthenticated && <HeaderCart />}
         
{isAuthenticated && <HeaderWishList />} 
             {isAuthenticated && <HeaderAccount   />}

             {/* <!-- Notification --> */}
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
            {/* {isAuthenticated && <HeaderNotification />} */}

                {/* <!-- Wishlist --> */}

                {/* <!-- Account --> */}

                {/* <!-- Cart --> */}

                {/* <!-- Login Icon (when not authenticated) --> */}
             

            </div>
        <HeaderSearch />

            {/* <!-- Language Toggle Button --> */}
            {/* {isAuthenticated && <LanguageToggle className="" />} */}

        </div>

          {/* <!-- Logo and Search Section --> */}
       
            <Logo />

        {/* <!-- header-actions --> */}

    </div>
    {/* <!-- te-navbar-content --> */}

    {/* <!-- Desktop Navigation Menu --> */}

    <HeaderDesktopMenu menuData={menuData} />
</div>
</nav>
    </div>
  )
}

export default HeaderRtl
