'use client';
import { Product } from "@/app/dummyData/products";
import ProductVariations from "./productVariations"
import { useState } from "react";
import ProductPrice from "./productPrice";

function ProductInfo({ product }: { product: Product }) {
    const [hasVariationSelected, setHasVariationSelected] = useState(false);

    const handleVariationSelected = (hasVariation: boolean) => {
      setHasVariationSelected(hasVariation);
    };  
    console.log('product', product);
  return (
    <div>
         {!hasVariationSelected && (
            <ProductPrice old_price={product?.price_after_discount} price_after_discount={product?.price_after_discount} price={product?.price_after_discount} />
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
