import React from 'react'

function HeaderSearch() {
  return (
<div className="hidden lg:block w-96">
    <div className="relative">

        <svg className="absolute start-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
        </svg>

        <input type="text" id="navbar-search-ecommerce" name="product_search" className="ps-10 pe-12 text-sm rounded-lg" placeholder="Search products..." autoComplete="off" aria-label="Search products"/>

        <button className="hs-btn absolute end-1 top-1/2 transform -translate-y-1/2 p-2 bg-primary-200 hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300 text-white rounded-lg  transition-colors duration-200" aria-label="Search">
            <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21 21-4.34-4.34"></path>
                <circle cx="11" cy="11" r="8"></circle>
            </svg>
        </button>

    </div>
</div>
  )
}

export default HeaderSearch
