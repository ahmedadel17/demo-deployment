// Navigation Arrow Components
interface NavigationArrowProps {
    onClick: () => void;
    direction: 'prev' | 'next';
  }
  
  function NavigationArrow({ onClick, direction }: NavigationArrowProps) {
    const isPrev = direction === 'prev';
    const arrowClass = isPrev ? 'embla__prev' : 'embla__next';
    const positionClass = isPrev ? 'left-4' : 'right-4';
    
    return (
      <button
        onClick={onClick}
        className={`${arrowClass} absolute ${positionClass} top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors`}
      >
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isPrev ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          )}
        </svg>
      </button>
    );
  }

  export default NavigationArrow;