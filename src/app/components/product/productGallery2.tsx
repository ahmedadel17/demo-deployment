"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useSelector } from "react-redux";
import NavigationArrow from "./productGallery/NavigationArrows";
import SaleBadge from "./productGallery/saleBadge";
import Wishlist from "./productGallery/wishlist";
import GallerySlides from "./productGallery/GallerySlides";



export default function ProductGallery({images}: {images: string[]}) {
  const [mainRef, mainApi] = useEmblaCarousel();
  const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Get variation data from Redux store
  interface VariationData {
    data?: {
      gallery?: (string | { url?: string; original_url?: string })[];
      discount?: string;
      is_favourite?: boolean;
    };
  }
  
  const variationData = useSelector((state: { product: { variationData: VariationData | null } }) => state.product.variationData);
  
  // Use variation gallery images if available, otherwise use passed images prop
  let galleryImages = variationData?.data?.gallery || images;
  
  // If gallery is empty, use just the thumbnail (first image)
  if (!galleryImages || galleryImages.length === 0) {
    galleryImages = images.length > 0 ? [images[0]] : [];
  }
  
 
 
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbsApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbsApi]
  );

  useEffect(() => {
    if (!mainApi || !thumbsApi) return;

    const onSelect = () => {
      setSelectedIndex(mainApi.selectedScrollSnap());
      thumbsApi.scrollTo(mainApi.selectedScrollSnap());
    };

    mainApi.on("select", onSelect);
    onSelect();
  }, [mainApi, thumbsApi]);

  // If no images at all, show a placeholder
  if (galleryImages.length === 0) {
    return (
      <div className="space-y-4">
        <div className="product-gallery relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="aspect-square w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p className="text-sm">No image available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className="product-gallery relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <GallerySlides galleryImages={galleryImages} mainRef={mainRef} />

        {/* Navigation Arrows - only show if more than one image */}
        {galleryImages.length > 1 && (
          <>
            <NavigationArrow 
              onClick={() => mainApi?.scrollPrev()} 
              direction="prev" 
            />
            <NavigationArrow 
              onClick={() => mainApi?.scrollNext()} 
              direction="next" 
            />
          </>
        )}

        {/* Sale Badge */}
        <SaleBadge discount={variationData?.data?.discount || "20% OFF"} />

        {/* Wishlist Button */}
        <Wishlist 
          isFavourite={variationData?.data?.is_favourite || false} 
          onToggle={() => {
            // Handle wishlist toggle logic here
            console.log('Toggle wishlist');
          }}
        />
      </div>

      {/* Thumbnails - only show if more than one image */}
      {galleryImages.length > 1 && (
        <div className="product-thumbnail embla-thumbs overflow-hidden" ref={thumbsRef}>
          <div className="embla-thumbs__container flex gap-3">
             {galleryImages.map((image: string | { url?: string; original_url?: string }, i: number) => {
               const src = typeof image === 'string' ? image : image.original_url ? image.original_url :image.url;
               return (
                 <div key={i} className="embla-thumbs__slide flex-none">
                   <button
                     type="button"
                     onClick={() => onThumbClick(i)}
                     className={`block rounded-md border-2 transition-all duration-200 ${
                       selectedIndex === i
                         ? "border-primary-400 opacity-100"
                         : "border-transparent opacity-60 hover:opacity-80"
                     }`}
                   >
                     <img
                       src={src}
                       alt={`Thumbnail ${i + 1}`}
                       className="w-20 aspect-square object-cover rounded-md"
                       style={{
                         imageRendering: '-webkit-optimize-contrast'
                       }}
                     />
                   </button>
                 </div>
               );
             })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Zoom Image ----------------------------- */


