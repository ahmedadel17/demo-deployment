'use client'
import React, { useState } from 'react'
import DropDownSubMenu from './MobileMenuSubmenu/DropDownSubMenu';
import Link from 'next/link';

function HeaderMobileMenu({ menuData }: { menuData: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
//   console.log('mobile menu 📱',menuData);
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleSubmenu = (submenuName: string) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submenuName)) {
        newSet.delete(submenuName);
      } else {
        newSet.add(submenuName);
      }
      return newSet;
    });
  };

  return (
    <>
      <button 
        className="te-navbar-toggle te-navbar-icon-button lg:hidden relative z-[10000]" 
        aria-label="Toggle mobile menu" 
        aria-expanded={isMenuOpen} 
        aria-controls="mobile-navigation"
        onClick={toggleMenu}
      >
       {!isMenuOpen && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>}
       {isMenuOpen && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> }
      </button>


      {/* <!-- Mobile Navigation Menu --> */}
      <div className={`te-navbar-nav-mobile z-[9999] ${isMenuOpen ? 'te-navbar-nav-mobile-show' : ''}`} id="mobile-navigation" aria-label="Mobile Navigation">
        <div className="flex flex-col">
            {menuData?.items?.map((item: any,index: number) => (
                item?.is_mega_menu?
                <DropDownSubMenu key={index} label={item.label} items={item?.mega_menu_children_columns} />
                :
                <Link key={index} href={item?.url} className="te-navbar-link-mobile">{item?.label}</Link>
            ))}
        </div>
      </div>
    </>
  )
}

export default HeaderMobileMenu
