'use client';
import React, { useState } from 'react';
import ProductVariations from './productVariations';
import AddToCartButton from './addTocartButton';

interface ProductDetailsWrapperProps {
  productId: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  hasVariations: boolean;
  variations: any;
  defaultVariationId?: number;
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
        variations={variations} 
        hasVariations={hasVariations}
        onDataChange={handleDataChange}
      />}
      
      <AddToCartButton 
        productId={productId}
        productTitle={productTitle}
        productPrice={productPrice}
        productImage={productImage}
        hasVariations={hasVariations}
        defaultVariationId={defaultVariationId}
        quantity={quantity}
        customerNote={customerNote}
      />
    </>
  );
}

export default ProductDetailsWrapper;



