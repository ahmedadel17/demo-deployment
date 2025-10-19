'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRTL } from '@/app/hooks/useRTL';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
}

function ProductPagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage,
  onPageChange 
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isRTL } = useRTL();

  // Debug logging
  console.log('ProductPagination props:', {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    shouldShow: totalPages > 1 && totalItems > 0
  });

  // Calculate display values
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first 3 pages, ellipsis, last page
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, last 3 pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    if (onPageChange) {
      onPageChange(page);
    } else {
      // Update URL with new page parameter
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Don't render if there are no items
  if (totalItems === 0) {
    return null;
  }

  // Show pagination if there are multiple pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-wrapper">
      <div className="te-table-pagination flex justify-between items-center flex-wrap gap-4 max-md:justify-center max-md:text-center">
        <div className="te-pagination-info flex items-center max-md:order-2 max-md:w-full max-md:justify-center">
          <span className="te-pagination-info-text text-sm text-gray-600 dark:text-gray-400">
            Showing
            <span className="te-pagination-info-number font-semibold text-gray-900 dark:text-gray-100 mx-1">
              {startItem}
            </span>
            to 
            <span className="te-pagination-info-number font-semibold text-gray-900 dark:text-gray-100 mx-1">
              {endItem}
            </span>
            of 
            <span className="te-pagination-info-number font-semibold text-gray-900 dark:text-gray-100 mx-1">
              {totalItems}
            </span>
            result{totalItems !== 1 ? 's' : ''}
          </span>
        </div>

        <nav className="te-pagination te-pagination-responsive flex justify-center items-center">
          <ul className="te-pagination-list flex items-center gap-1 list-none m-0 p-0">
            {/* Previous Button */}
            <li>
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`te-pagination-nav flex items-center justify-center gap-2 min-w-10 h-10 px-2 py-2 text-sm font-medium border rounded-md transition-all duration-200 ${
                  currentPage === 1
                    ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-600 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500'
                }`}
                aria-label="Previous page"
              >
                <svg className={`w-4 h-4 ${isRTL ? 'rtl:rotate-180' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span className="te-pagination-nav-text inline max-sm:hidden">Previous</span>
              </button>
            </li>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <li key={index} className="te-pagination-mobile-hide hidden sm:block">
                {page === '...' ? (
                  <span className="te-pagination-ellipsis flex items-center justify-center min-w-10 h-10 px-2 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`te-pagination-link flex items-center justify-center min-w-10 h-10 px-2 py-3 text-sm font-medium border rounded-md transition-all duration-200 ${
                      page === currentPage
                        ? 'text-white bg-primary-500 border-primary-500'
                        : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500'
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}

            {/* Mobile Current Page Display */}
            <li className="te-pagination-mobile-show hidden max-sm:block">
              <span className="te-pagination-current flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md">
                {currentPage} / {totalPages}
              </span>
            </li>

            {/* Next Button */}
            <li>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`te-pagination-nav flex items-center justify-center gap-2 min-w-10 h-10 px-2 py-2 text-sm font-medium border rounded-md transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-600 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500'
                }`}
                aria-label="Next page"
              >
                <span className="te-pagination-nav-text inline max-sm:hidden">Next</span>
                <svg className={`w-4 h-4 ${isRTL ? 'rtl:rotate-180' : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProductPagination
