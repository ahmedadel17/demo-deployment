'use client';
import React, { useRef, useState, useEffect } from "react";

interface ProductGalleryProps {
  images: string[];
  discount?: string; // e.g. "20% OFF"
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, discount }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  // Handle zoom click toggle
  const handleZoomToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;
    setIsZoomed((prev) => !prev);
    if (!isZoomed) updateZoomPosition(e);
  };

  // Handle zoom position while moving
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) updateZoomPosition(e);
    updateLensPosition(e);
  };

  const updateZoomPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    imageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    imageRef.current.style.transform = isZoomed ? "scale(2)" : "scale(1)";
  };

  const updateLensPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !lensRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const lensSize = 150;
    const x = e.clientX - rect.left - lensSize / 2;
    const y = e.clientY - rect.top - lensSize / 2;

    lensRef.current.style.left = `${Math.max(0, Math.min(x, rect.width - lensSize))}px`;
    lensRef.current.style.top = `${Math.max(0, Math.min(y, rect.height - lensSize))}px`;
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    if (imageRef.current) imageRef.current.style.transform = "scale(1)";
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div
          ref={containerRef}
          onClick={handleZoomToggle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`zoom-container relative aspect-square overflow-hidden ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
        >
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Product"
            className="zoom-image w-full h-full objectCover transition-transform duration-300"
          />
          <div
            ref={lensRef}
            className="zoom-lens absolute w-[150px] h-[150px] border-2 border-white rounded-full pointer-events-none opacity-0 hover:opacity-100 shadow-lg transition-opacity duration-200"
          />
        </div>

        {/* Sale Badge */}
        {discount && (
          <div className="absolute top-4 start-4">
            <span className="bg-red-500/20 text-red-500 px-2 py-1 text-xs font-semibold rounded-full">
              {discount}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-4 end-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="overflow-hidden">
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`block rounded-md border-2 transition-all duration-200 ${
                selectedImage === img
                  ? "border-primary-300 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-80"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-20 aspect-square objectCover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
