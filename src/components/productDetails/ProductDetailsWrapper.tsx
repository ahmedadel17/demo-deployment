'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/hooks/useAuth';
import ProductVariations from './productVariations';
import ProductPrice from './productPrice';
import AddToCartButton from './addTocartButton';
import ProductDescription from './productDescription';

type Attribute = {
  attribute_id: number;
  attribute_name: string;
  attribute_type: string;
  values: {
    id: number;
    value: string;
    color?: string;
  }[];
};

interface ProductDetailsWrapperProps {
  productId: string;
  productTitle: string;
  productPrice: number;
  productShortDescription?: string | null;
  productDescription?: string | null;
  productOldPrice?: number | null;
  productImage: string;
  hasVariations: boolean;
  variations: Attribute[];
  defaultVariationId?: number | null;
}

function ProductDetailsWrapper({ 
  productId, 
  productTitle, 
  productPrice, 
  productShortDescription,
  productDescription,
  productOldPrice,
  productImage, 
  hasVariations, 
  variations,
  defaultVariationId
}: ProductDetailsWrapperProps) {
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');
  const [variationId, setVariationId] = useState<number | null>(null);
  const [variationData, setVariationData] = useState<{
    id?: number;
    stock?: number;
    name?: string;
    price_befor_discount?: number | string;
    price_after_discount?: number | string;
  } | null>(null);
  const [isLoadingVariation, setIsLoadingVariation] = useState(false);
  const { token } = useAuth();

  const handleDataChange = (newQuantity: number, newCustomerNote: string) => {
    setQuantity(newQuantity);
    setCustomerNote(newCustomerNote);
  };

  // Fetch variation ID when all attributes are selected
  const fetchVariationId = async (attributes: Record<number, number>) => {
    setIsLoadingVariation(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products/get-variation-by-attribute`,
        {
          product_id: productId,
          attributes: attributes // Maps attribute_id to value_id
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status && response.data.data?.id) {
        setVariationId(response.data.data.id);
        setVariationData(response.data.data);
        console.log('variationData',response.data.data);
        setIsLoadingVariation(false);
      } else {
        console.error('Failed to get variation ID:', response.data);
        setVariationId(null);
        setVariationData(null);
        setIsLoadingVariation(false);
      }
    } catch (error) {
      console.error('Error fetching variation ID:', error);
      setVariationId(null);
      setVariationData(null);
      setIsLoadingVariation(false);
    }
  };

  // Handle selection changes (optional, for tracking)
  const handleSelectionChange = (selections: Record<number, number>) => {
    // Optional: can track selections if needed
    console.log('Selections changed:', selections);
  };

  return (
    <>
      {/* Show selected variation name and price if available */}
      {!variationData && (
        <ProductPrice price={productPrice} old_price={productOldPrice as number} />
      )}

{/* <!-- Product Description --> */}

      {variationData && (
        <div className="mb-4 space-y-2">
          {variationData?.name && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{variationData.name}</h2>
          )}
          <ProductPrice
            price={Number(variationData.price_after_discount ?? productPrice)}
            old_price={Number(variationData.price_befor_discount ?? '')}
          />
        </div>
      )}
      <ProductDescription short_description={productShortDescription || ''} description={productDescription || ''} />
                <hr className="border-gray-300 dark:border-gray-800"/>


      {hasVariations && variations && variations.length > 0 && (
        <ProductVariations 
          variations={variations}
          onSelectionChange={handleSelectionChange}
          onVariationFetch={fetchVariationId}
          onDataChange={handleDataChange}
          variationData={variationData}
        />
      )}
      
      <AddToCartButton 
        productId={productId}
        productTitle={productTitle}
        productPrice={productPrice}
        productImage={productImage}
        hasVariations={hasVariations}
        defaultVariationId={defaultVariationId as number | undefined}
        variationId={variationId}
        variationData={variationData}
        isLoadingVariation={isLoadingVariation}
        quantity={quantity}
        customerNote={customerNote}
      />
    </>
  );
}

export default ProductDetailsWrapper;



