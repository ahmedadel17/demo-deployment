import { Handbag } from 'lucide-react'

interface FooterButtonsProps {
  onAddToCart: () => void;
  isAddingToCart: boolean;
  canAddToCart: boolean;
  isLoadingVariation?: boolean;
}

function FooterButtons({ onAddToCart, isAddingToCart, canAddToCart, isLoadingVariation = false }: FooterButtonsProps) {
  return (
    <div className="product-footer mt-auto flex gap-2 items-stretch">
        <button 
          onClick={onAddToCart}
          disabled={!canAddToCart || isAddingToCart || isLoadingVariation}
          className={`flex-1 rounded-md py-2 transition flex items-center justify-center gap-2 ${
            canAddToCart 
              ? 'bg-primary-600 text-white hover:bg-primary-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } ${(isAddingToCart || isLoadingVariation) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isAddingToCart ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          ) : isLoadingVariation ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
          ) : (
            <Handbag className="w-5 h-5" />
          )}
          <span className="text-sm font-medium lg:block hidden">
            {isAddingToCart ? 'Adding...' : isLoadingVariation ? 'Loading...' : 'Add to Cart'}
          </span>
        </button>
        <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </button>
      </div>
  )
}

export default FooterButtons
