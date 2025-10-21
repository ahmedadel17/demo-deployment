"use client";
import React, { useState } from "react";
import Link from "next/link";

interface WishlistItem {
  title: string;
  image: string;
  price: string;
}





const MyWishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      title: "Straight-leg jeans",
      image: "/assets/images/product-1.jpg",
      price: "65.00",
    },
    {
      title: "Cotton T-shirt",
      image: "/assets/images/product-2.jpg",
      price: "65.00",
    },
    {
      title: "Straight-leg jeans",
      image: "/assets/images/product-3.jpg",
      price: "65.00",
    },
    {
      title: "Cotton T-shirt",
      image: "/assets/images/product-4.jpg",
      price: "65.00",
    },
    {
      title: "Straight-leg jeans",
      image: "/assets/images/product-5.jpg",
      price: "65.00",
    },
    {
      title: "Cotton T-shirt",
      image: "/assets/images/product-6.jpg",
      price: "65.00",
    },
  ]);

  const handleRemove = (index: number) => {
    setWishlistItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddToCart = (index: number) => {
    alert(`Added "${wishlistItems[index].title}" to cart`);
  };

  return (
   <>
     <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Wishlist
                </h1>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item, index) => (
                    <div
                      key={index}
                      className="group relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(index)}
                        className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>

                      {/* Product Image */}
                      <div className="aspect-square bg-gray-100 dark:bg-gray-600 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full objectCover"
                        />
                      </div>

                      {/* Product Info */}
                      <p className="text-md font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-xs">﷼</span> {item.price}
                      </p>

                      {/* Add to Cart */}
                      <button
                        onClick={() => handleAddToCart(index)}
                        className="te-btn te-btn-primary flex items-center justify-center gap-2 w-full mt-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition"
                      >
                        <svg
                          className="icon-cart w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                          <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                        </svg>
                        <span className="hidden lg:block">Add to Cart</span>
                      </button>
                    </div>
                  ))}
                </div>

                {wishlistItems.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
                    Your wishlist is empty.
                  </p>
                )}
              </div>
            </div>
          </div>
   </>
  );
};

export default MyWishlistPage;
