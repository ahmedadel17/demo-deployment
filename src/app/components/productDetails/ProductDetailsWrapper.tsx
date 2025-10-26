'use client';
import React, { useState } from 'react';
import ProductVariations from './productVariations';
import AddToCartButton from './addTocartButton';

interface Variation {
  id: number;
  name: string;
  price: number;
  discount: number;
  is_favourite: boolean;
}

interface VariationData {
  data?: {
    gallery?: (string | { url?: string; original_url?: string })[];
    discount?: string;
    is_favourite?: boolean;
  };
}

interface ProductDetailsWrapperProps {
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  hasVariations: boolean;
  variations: Variation[];
  defaultVariationId?: number | null;
}

function ProductDetailsWrapper({ 
  productId, 
  productTitle, 
  productPrice, 
  productImage, 
  hasVariations, 
  variations ,
  defaultVariationId
}: ProductDetailsWrapperProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');

  const handleDataChange = (newQuantity: number, newCustomerNote: string) => {
    setQuantity(newQuantity);
    setCustomerNote(newCustomerNote);
  };

  return (
    <>
     {hasVariations && <ProductVariations 
        productId={productId} 
        variations={variations as Variation[] & { id: number; name: string; values: { id: number; value: string }[] }} 
        hasVariations={hasVariations}
        onDataChange={handleDataChange}
      />}
      
      <AddToCartButton 
        productId={productId}
        productTitle={productTitle}
        productPrice={productPrice}
        productImage={productImage}
        hasVariations={hasVariations}
        defaultVariationId={defaultVariationId as number | undefined}
        quantity={quantity}
        customerNote={customerNote}
      />
    </>
  );
}

export default ProductDetailsWrapper;



