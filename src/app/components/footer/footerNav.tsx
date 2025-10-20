'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BoxIcon } from 'lucide-react'
import { useAppSelector } from '@/app/store/hooks'
import { useAuth } from '@/app/hooks/useAuth'

function FooterNav() {
  const pathname = usePathname()
  const { cartData } = useAppSelector((state) => state.cart)
  const { isAuthenticated } = useAuth()
  
  // Get total items in cart from cart_count or calculate from products
  const totalItems = cartData?.cart_count || cartData?.products?.reduce((total, item) => total + (item.qty || 0), 0) || 0

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5 mb-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      )
    },
    ...(isAuthenticated ? [{
      href: '/cart',
      label: 'Cart',
      icon: (
        <div className="relative">
          <svg className="w-5 h-5 mb-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
            <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </div>
      )
    }] : []),
    {
      href: '/products',
      label: 'products',
      icon: (
         <BoxIcon className="w-5 h-5 mb-2" />
      )
    },
    ...(isAuthenticated ? [{
      href: '/profile',
      label: 'Profile',
      icon: (
        <svg className="w-5 h-5 mb-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M20 21a8 8 0 0 0-16 0"></path>
        </svg>
      )
    }] : [{
      href: '/auth/login',
      label: 'Login',
      icon: (
        <svg className="w-5 h-5 mb-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10,17 15,12 10,7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
      )
    }])
  ]

  return (
    <div 
      className="fixed block lg:hidden bottom-0 left-0 right-0 z-50 w-full bg-white border-t dark:border-gray-800 shadow-lg" 
      style={{ 
        backgroundColor: '#ffffff',
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        height: '64px',
        zIndex: 9999,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
        transform: 'translateY(0)'
      }}
    >
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium  dark:bg-gray-900">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group   ${
                isActive ? 'bg-blue-50' : ''
              }`}
              style={{
                color: isActive ? '#2563eb' : '#6b7280'
              }}
            >
              <div 
                className="flex items-center justify-center"
                style={{
                  color: isActive ? '#2563eb' : '#6b7280'
                }}
              >
                {item.icon}
              </div>
              <span 
                className="text-sm"
                style={{
                  color: isActive ? '#2563eb' : '#6b7280'
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default FooterNav
