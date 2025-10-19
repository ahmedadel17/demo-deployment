"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type SubCategory = {
  name: string;
  slug: string;
  count: number;
};

type Category = {
  name: string;
  count: number;
  slug: string;
  sub?: SubCategory[];
};

const categories: Category[] = [
  {
    name: "Men",
    count: 45,
    slug: "men",
    sub: [
      { name: "T-Shirts", slug: "t-shirts", count: 12 },
      { name: "Jeans", slug: "jeans", count: 18 },
      { name: "Shirts", slug: "shirts", count: 15 },
    ],
  },
  {
    name: "Women",
    count: 31,
    slug: "women",
    sub: [
      { name: "T-Shirts", slug: "t-shirts", count: 6 },
      { name: "Jeans", slug: "jeans", count: 88 },
      { name: "Shirts", slug: "shirts", count: 120 },
    ],
  },
  {
    name: "Kids",
    count: 69,
    slug: "kid",
    sub: [
      { name: "T-Shirts", slug: "t-shirts", count: 45 },
      { name: "Jeans", slug: "jeans", count: 21 },
      { name: "Shirts", slug: "shirts", count: 10 },
    ],
  },
  {
    name: "Accessories",
    count: 23,
    slug: "accessories",
    sub: [
      { name: "Bags", slug: "bags", count: 8 },
      { name: "Belts", slug: "belts", count: 9 },
      { name: "Hats", slug: "hats", count: 6 },
    ],
  },
  {
    name: "Sports",
    count: 22,
    slug: "sports",
  },
];

const CategoryWidget: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (slug: string) => {
    setExpanded((prev) => (prev === slug ? null : slug));
  };

  const navigateToCategory = (slug: string) => {
    router.push(`/products?category=${slug}`);
  };

  return (
    <div className="category-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h3>
      </div>

      <div className="space-y-1">
        {categories.map((cat) => {
          const isExpanded = expanded === cat.slug;
          const isActive = currentCategory === cat.slug;

          return (
            <div key={cat.slug} className="category-group">
              <div
                className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer ${
                  isActive ? "bg-gray-50 dark:bg-gray-700" : ""
                }`}
                onClick={() => toggleExpand(cat.slug)}
              >
                <div
                  className="flex items-center gap-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToCategory(cat.slug);
                  }}
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                    {cat.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {cat.count}
                  </span>
                  {cat.sub && (
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {cat.sub && (
                <div
                  className={`pl-6 space-y-1 overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-h-96" : "max-h-0"
                  }`}
                >
                  {cat.sub.map((sub) => {
                    const isSubActive = currentCategory === sub.slug;
                    return (
                      <div
                        key={sub.slug}
                        onClick={() => navigateToCategory(sub.slug)}
                        className={`flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer ${
                          isSubActive ? "bg-gray-50 dark:bg-gray-700" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                            {sub.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {sub.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryWidget;
