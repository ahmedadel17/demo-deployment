'use client';
import { Product } from "@/app/dummyData/products";

// Extend the Product type to include missing properties
interface ExtendedProduct extends Product {
  price_after_discount?: string;
  variations?: any[];
}
import ProductVariations from "./productVariations"
import { useState } from "react";
import ProductPrice from "./productPrice";

function ProductInfo({ product }: { product: ExtendedProduct }) {
    const [hasVariationSelected, setHasVariationSelected] = useState(false);

    const handleVariationSelected = (hasVariation: boolean) => {
      setHasVariationSelected(hasVariation);
    };  
    // console.log('product', product);
  return (
    <div>
         {!hasVariationSelected && (
            <ProductPrice old_price={product?.old_price} price_after_discount={product?.price_after_discount} price={product?.price} />
          )}
       <div className="mt-auto">
          <ProductVariations 
            product={product}
            variations={product?.variations}
            onVariationSelected={handleVariationSelected}
          />
        </div>
    </div>
  )
}

export default ProductInfo
