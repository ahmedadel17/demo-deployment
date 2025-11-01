// Wishlist Button Component
interface WishlistProps {
  isFavourite?: boolean;
  onToggle?: () => void;
}

function Wishlist({ isFavourite = false, onToggle }: WishlistProps) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 end-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
      aria-label={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        className={`w-5 h-5 ${isFavourite ? 'text-red-500 fill-current' : 'text-gray-700 dark:text-gray-300'}`}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={isFavourite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
    </button>
  );
}

export default Wishlist;