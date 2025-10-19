'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAppSelector } from '@/app/store/hooks';
interface ProductGalleryCarouselProps {
  images: string[];
  discount?: string;
}

interface ImageData {
  url?: string;
  thumbnail?: string;
}

const ProductGalleryCarousel: React.FC<ProductGalleryCarouselProps> = ({ 
  images, 
  discount 
}) => {
  const { variationData } = useAppSelector((state) => state.product);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 20,
      direction: 'ltr'
    },
    [Autoplay({ 
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      playOnInit: true,
      stopOnFocusIn: true
    })]
  );
  
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);

  const updateZoomPosition = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    imageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    imageRef.current.style.transform = isZoomed ? "scale(2)" : "scale(1)";
  }, [isZoomed]);

  const updateLensPosition = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !lensRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const lensSize = 150;
    const x = e.clientX - rect.left - lensSize / 2;
    const y = e.clientY - rect.top - lensSize / 2;

    lensRef.current.style.left = `${Math.max(0, Math.min(x, rect.width - lensSize))}px`;
    lensRef.current.style.top = `${Math.max(0, Math.min(y, rect.height - lensSize))}px`;
  }, []);

  // Handle zoom click toggle
  const handleZoomToggle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;
    setIsZoomed((prev) => !prev);
    if (!isZoomed) updateZoomPosition(e);
  }, [isZoomed, updateZoomPosition]);

  // Handle zoom position while moving
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) updateZoomPosition(e);
    updateLensPosition(e);
  }, [isZoomed, updateZoomPosition, updateLensPosition]);

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false);
    if (imageRef.current) imageRef.current.style.transform = "scale(1)";
  }, []);

  // Sync main carousel with thumbnails
  const onThumbClick = useCallback((index: number) => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    emblaMainApi.scrollTo(index);
  }, [emblaMainApi, emblaThumbsApi]);

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  console.log('variationData', variationData);
  return (
    <div className="space-y-4">
      {/* Main Image Carousel */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="embla" ref={emblaMainRef}>
          <div className="embla__container">
            {images.map((image, index) => (
              <div key={index} className="embla__slide">
                <div
                  ref={containerRef}
                  onClick={handleZoomToggle}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className={`zoom-container relative aspect-square overflow-hidden ${
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                >
                  <Image
                    ref={imageRef}
                    src={image}
                    alt={`Product ${index + 1}`}
                    fill
                    className="zoom-image object-cover transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    ref={lensRef}
                    className="zoom-lens absolute w-[150px] h-[150px] border-2 border-white rounded-full pointer-events-none opacity-0 hover:opacity-100 shadow-lg transition-opacity duration-200"
                  />
                </div>
              </div>
            ))}
            {variationData && variationData?.data && (
                (variationData.data as any)?.gallery?.map((image: any, index: number) => (
                    <div key={index} className="embla__slide">
                        <Image
                            src={image}
                            alt={`Product ${index + 1}`}
                            fill
                            className="zoom-image object-cover transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ))
            )}
          </div>
        </div>

        {/* Sale Badge */}
        {discount && (
          <div className="absolute top-4 start-4 z-10">
            <span className="bg-red-500/20 text-red-500 px-2 py-1 text-xs font-semibold rounded-full">
              {discount}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-4 end-4 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
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

        {/* Navigation Buttons */}
        <button
          className="embla__prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          onClick={scrollPrev}
          aria-label="Previous image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          className="embla__next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          onClick={scrollNext}
          aria-label="Next image"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Play/Pause Button */}
        <button
          className="embla__play-pause absolute bottom-4 right-4 z-10 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          onClick={() => {
            const autoplay = emblaMainApi?.plugins().autoplay;
            if (autoplay) {
              if (autoplay.isPlaying()) {
                autoplay.stop();
              } else {
                autoplay.play();
              }
            }
          }}
        >
          <span className="embla__play-pause-text">Pause</span>
        </button>
      </div>

      {/* Thumbnail Carousel */}
      <div className="embla-thumbs" ref={emblaThumbsRef}>
        <div className="embla-thumbs__container flex gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`embla-thumbs__slide flex-shrink-0 ${
                selectedIndex === index ? 'embla-thumbs__slide--selected' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => onThumbClick(index)}
                className={`block rounded-md border-2 transition-all duration-200 ${
                  selectedIndex === index
                    ? "border-primary-500 opacity-100"
                    : "border-transparent opacity-60 hover:opacity-80"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md"
                />
              </button>
            </div>
          ))}
          {variationData && variationData?.data && (
            (variationData.data as any)?.gallery?.map((image: any, index: number) => (
                <div key={index} className="embla__slide">
                    <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                    />
                </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGalleryCarousel;
