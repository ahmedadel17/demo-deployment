import { Handbag } from "lucide-react";
import Link from "next/link";
import React from "react";

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
  category?: string;
  old_price?: string | null;
  colors?: string[];
  sizes?: string[];
  badges?: Badge[];
  variations?: any[];
  min_price?: string;
  price_after_discount?: string;
}

interface Props {
  product: Product;
}

const badgeClasses: Record<string, string> = {
  new: "bg-green-500/20 text-green-500",
  sale: "bg-red-500/20 text-red-500",
  bestseller: "bg-blue-500/20 text-blue-500",
  limited: "bg-purple-500/20 text-purple-500",
  hot: "bg-orange-500/20 text-orange-500",
};

const ProductItem: React.FC<Props> = ({ product }) => {
  return (
    <div
      className="product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col"
      data-product-id={product.slug}
      data-product-title={product.name}
      data-product-price={product.price}
      data-product-image={product.thumbnail}
    >
      {/* Image */}
      {product?.thumbnail ? (
        <Link
          href={`/productDetails/${product.slug}`}
          className="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group"
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
          <div className="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 z-20 gap-1">
            {/* Compare Button */}
            <button
              className="compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center"
              data-product-id={product.id}
              title="Add to Compare"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <path d="M11 18H8a2 2 0 0 1-2-2V9" />
              </svg>
            </button>

            {/* Quick View */}
            <button
              className="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
              title="Quick View"
            
            >
              <Link href={`/productDetails/${product.slug}`}>
                              <svg
                  className="w-4 h-4 lg:w-5 lg:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </button>
          </div>

          {/* Main Image */}
          <img
            src={product.thumbnail}
            alt={product.name}
            width={300}
            height={320}
            className="w-full h-full objectCover transition-all duration-500 ease-in-out transform"
          />

          {/* Hover Image */}
          {product.hover && (
            <img
              src={product.thumbnail}
              alt={`${product.name} hover`}
              className="absolute inset-0 w-full h-full objectCover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </Link>
      ) : (
        <div className="product-thumbnail-placeholder bg-gray-200 dark:bg-gray-700 h-full flex items-center justify-center rounded-lg text-gray-400 text-xs">
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

      <div className="mt-3 lg:mt-0 lg:p-3 flex flex-col flex-1">
        <div className="product-body space-y-2 mb-5">
          {/* Category */}
          {product?.category && (
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              {product.category}
            </p>
          )}

          {/* Title */}
          <h3 className="font-semibold text-sm lg:text-base line-clamp-2 dark:text-white">
            <a href={`/single/${product.id}`}>{product?.name}</a>
          </h3>

          {/* Price */}
          <div className="flex items-center gap-1">
            {product?.min_price && (
              <p className="text-gray-500 dark:text-gray-300 line-through text-sm">
                {product?.min_price}
              </p>
            )}
            <p className="text-sm lg:text-base font-semibold text-secondary-600">
              {product?.price_after_discount}
            </p>
          </div>

          {/* Colors */}
          {product?.variations?.[1]?.values && product?.variations?.[1]?.values.length > 0 && (
            <div className="product-colors mt-4 flex flex-wrap gap-1">
              {product?.variations?.[1]?.values.slice(0, 4).map((color: any, i: number) => (
                <button
                  key={i}
                  style={{ backgroundColor: color.value }}
                  className="w-5 h-5 rounded-full border"
                  title={`Select ${color.value}`}
                />
              ))}
              {product.variations[1].values.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product.variations[1].values.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Sizes */}
          {product?.variations?.[0]?.values && product?.variations?.[0]?.values.length > 0 && (
            <div className="product-sizes mt-4 flex flex-wrap gap-1">
              {product?.variations?.[0]?.values.slice(0, 4).map((size: any, i: number) => (
                <button
                  key={i}
                  className="px-2 py-1 border rounded text-xs dark:text-white"
                  title={`Select ${size.value}`}
                >
                  {size.value}
                </button>
              ))}
              {product?.variations?.[0]?.values.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">
                  +{product?.variations?.[0]?.values.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="product-footer mt-auto flex gap-2 items-stretch justify-between">
          <button className="flex-1 bg-primary-600 text-white rounded-md py-2 hover:bg-primary-700 transition flex items-center justify-center gap-2">
            <Handbag className="w-5 h-5" />
            <span className="text-sm font-medium lg:block hidden">
              Add to Cart
            </span>
          </button>
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300">
            <svg
              className="w-5 h-5"
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
      </div>
    </div>
  );
};

export default ProductItem;
