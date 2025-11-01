'use client';

import { useScrollEffects } from '../app/hooks/useScrollEffects';

export default function ScrollEffects() {
  const { headerRef, marqueeRef, progressBarRef, backToTopRef } = useScrollEffects();

  return (
    <>
      {/* Progress bar for navbar */}
      <div 
        id="navbar-progress" 
        ref={progressBarRef as React.RefObject<HTMLDivElement>}
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all duration-300"
        style={{ width: '0%' }}
      />
      
      {/* Back to top button */}
      <button
        ref={backToTopRef as React.RefObject<HTMLButtonElement>}
        className="back-to-top fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none z-40"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
}
