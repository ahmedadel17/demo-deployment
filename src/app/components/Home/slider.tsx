'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
function Slider({slides}: {slides: any[]}) {
  const [isRTL, setIsRTL] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'trimSnaps',
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    direction: isRTL ? 'rtl' : 'ltr',
  });
  
 

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Reinitialize Embla when direction changes so it flips correctly
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({
      loop: true,
      containScroll: 'trimSnaps',
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      direction: isRTL ? 'rtl' : 'ltr',
    });
  }, [emblaApi, isRTL]);

  // RTL Detection
  useEffect(() => {
    const checkDirection = () => {
      const htmlDir = document.documentElement.getAttribute('dir');
      setIsRTL(htmlDir === 'rtl');
    };

    // Check on mount
    checkDirection();

    // Watch for changes
    const observer = new MutationObserver(checkDirection);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });

    return () => observer.disconnect();
  }, []);

  // Auto-advance functionality - only if there are multiple slides
  useEffect(() => {
    if (!emblaApi || slides.length <= 1) return;
    
    const interval = setInterval(() => {
      if (emblaApi) {
        // In RTL mode, scroll in the opposite direction for natural flow
        if (isRTL) {
          emblaApi.scrollPrev();
        } else {
          emblaApi.scrollNext();
        }
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [emblaApi, isRTL, slides.length]);
  return (
    <div className="relative overflow-hidden group h-[450px] sm:h-[550px] md:h-[650px] lg:h-[650px] xl:h-[650px]">
      {/* Embla Carousel */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides?.map((slide) => (
            <div key={slide.id} className="embla__slide flex-shrink-0 w-full h-full">
              <div className="w-full h-full relative">
                {/* Background image (mirrored in RTL) */}
                <img
                  src={slide.image}
                  alt=""
                  className={`absolute inset-0 w-full h-full objectCover ${isRTL ? 'scale-x-[-1]' : ''}`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

                {/* Content */}
                <div className="relative container z-20 h-full">
                  <div className="container-wrapper h-full">
                    <div className="te-hero-item grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.618fr] items-center h-full">
                      <div className="col-span-1">
                        <div className="space-y-6 text-left rtl:text-right">
                          <h2 className="slider-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animated text-white">
                            {slide.title}
                          </h2>
                          <p className="text-base lg:text-xl text-white animated">
                            {slide.description}
                          </p>
                          <a href="#" className="te-btn te-btn-primary animated">
                            {slide.button_text?slide.button_text:'Shop Collection'}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Only show if there are multiple slides */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`absolute top-1/2 ${isRTL ? 'right-4' : 'left-4'} transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none z-30 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={isRTL ? "Next Slide" : "Previous Slide"}
          >
            {isRTL ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          <button 
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`absolute top-1/2 ${isRTL ? 'left-4' : 'right-4'} transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none z-30 disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={isRTL ? "Previous Slide" : "Next Slide"}
          >
            {isRTL ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </>
      )}

      {/* Pagination Dots - Only show if there are multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-4 w-4 rounded-full transition-colors duration-300 ${
                index === selectedIndex ? 'bg-white' : 'bg-white bg-opacity-25'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Slider