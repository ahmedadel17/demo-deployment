import React from 'react';
import ProductImage from "./productCard/productImage";
import ProductDetails from "./productCard/productDetails";

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
  variations?: Variation[];
  min_price?: string;
  price_after_discount?: string;
  default_variation_id?: string | number;
  is_favourite?: boolean;
}

interface Variation {
  id: number;
  name: string;
  values: { id: number; value: string }[];
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {

  return (
    <div
      className="product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col"
      data-product-id={product.id}
      data-product-title={product.name}
      data-product-price={product.price}
      data-product-image={product.thumbnail}
    >
      <ProductImage
        thumbnail={product.thumbnail}
        hover={product.hover}
        slug={product.slug}
        name={product.name}
        title={product.title}
        badges={product.badges}
        productId={product.id}
      />

      <ProductDetails product={product} />
    </div>
  );
};

export default ProductItem;
