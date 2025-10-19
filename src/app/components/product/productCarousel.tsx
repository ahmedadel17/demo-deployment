import React from "react";
export interface Product {
  id: number;
  image: string;
  hover?: string;
  title: string;
  price: string;
  old_price?: string | null;
  colors?: string[];
  sizes?: string[];
  category: string;
  badges?: {
    type: string;
    text: string;
  }[];
}

interface ProductCarouselProps {
  sectionHeading?: string;
  products: Product[];
  selectedCategory?: string | null;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  sectionHeading = "Related Products",
  products,
  selectedCategory,
}) => {
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const limit = selectedCategory ? 8 : 10;
  const visibleProducts = filteredProducts.slice(0, limit);

  return (
    <div className="te-carousel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white">
          {sectionHeading}
        </h2>

        <div className="embla-control flex gap-1 rtl:flex-row-reverse">
          <button className="embla-prev bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
            ←
          </button>
          <button className="embla-next bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
            →
          </button>
        </div>
      </div>

      <div className="embla overflow-hidden relative">
        <div className="embla__container flex gap-6 lg:gap-6 py-1">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="embla__slide flex-shrink-0 py-1 
                [flex:0_0_calc(50%-0.75rem)] 
                md:[flex:0_0_calc(33.333%-0.75rem)] 
                lg:[flex:0_0_calc(25%-1.2rem)] 
                xl:[flex:0_0_calc(20%-1.5rem)]"
            >
              <div className="border rounded-lg p-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-gray-800 dark:text-white text-sm">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {product.price} EGP
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
