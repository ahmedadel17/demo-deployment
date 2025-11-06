
import { Handbag } from "lucide-react";
import Link from "next/link";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductVariations from "./productVariations";
import ProductInfo from "./productInfo";
import ProductHoverButtons from "../../product/productCard/productHoverButtons";

interface Badge {
  type: string;
  text: string;
}

interface Product {
  id: number;
  title: string;
  name: string;
  thumbnail: string;
  slug: string;
  price: string;
  image?: string;
  hover?: string;
  category: string;
  old_price?: string | null;
  colors?: string[];
  sizes?: string[];
  badges?: Badge[];
  variations?: any[];
  min_price?: string;
  price_after_discount?: string;
  default_variation_id?: string | number;
  is_favourite?: boolean;
}

interface Props {
  product: Product;
  carousel?: boolean;
}

const badgeClasses: Record<string, string> = {
  new: "bg-green-500/20 text-green-500",
  sale: "bg-red-500/20 text-red-500",
  bestseller: "bg-blue-500/20 text-blue-500",
  limited: "bg-purple-500/20 text-purple-500",
  hot: "bg-orange-500/20 text-orange-500",
};

const ProductCard: React.FC<Props> = ({ product, carousel = false }) => {
  

  return (
    <div
      className={`product-card position-relative w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col ${
        carousel ? 'border border-gray-200 dark:border-gray-700' : ''
      }`}
      data-product-id={product.slug}
      data-product-title={product.name}
      data-product-price={product.price}
      data-product-image={product.thumbnail}
    >
      {/* Image */}
      {product?.thumbnail ? (
        <Link
          href={`/productDetails/${product.slug}`}
          className="product-thumbnail relative block overflow-hidden rounded-t-lg group"
        >
          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="product-badges absolute top-2 start-2 z-10 flex flex-col gap-1">
              {product.badges.map((badge, i) => (
                <span
                  key={i}
                  className={`product-badge px-2 py-1 text-xs font-semibold rounded-full ${
                    badgeClasses[badge.type] ?? "bg-gray-500 text-white"
                  }`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}

          {/* Hover Buttons */}
          <ProductHoverButtons
            product={product}
            productId={product.id}
            productTitle={product.name}
            productPrice={product.price || product.price_after_discount || product.min_price}
            productImage={product.thumbnail}
          />

          {/* Main Image */}
          <img
            src={product.thumbnail}
            alt={product.name}
            width={300}
            height={320}
            className="w-full h-48 objectCover transition-all duration-500 ease-in-out transform"
            style={{ minHeight: '192px' }}
          />

          {/* Hover Image */}
          {product.hover && (
            <img
              src={product.hover}
              alt={`${product.name} hover`}
              className="absolute inset-0 w-full h-full objectCover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </Link>
      ) : (
        <div className="product-thumbnail-placeholder bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center rounded-t-lg text-gray-400 text-xs">
          <div className="text-center">
            <svg
              className="w-8 h-8 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 5h6" />
              <path d="M19 2v6" />
              <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              <circle cx="9" cy="9" r="2" />
            </svg>
            <div className="mt-2">Image Not Set</div>
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <div className="product-body space-y-2 flex-1">
          {/* Category */}
          {product?.category && (
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              {product.category}
            </p>
          )}

          {/* Title */}
          <ProductTitle name={product?.name} slug={product?.slug} />

          {/* Price - Show initially, hide when variation is selected */}
          
        </div>
         <ProductInfo product={product} />
        {/* Product Variations with Add to Cart Logic - Always at bottom */}
       
      </div>
    </div>
  );
};

export default ProductCard;