"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/assets/images/Slider-01.webp",
    title: "Grace and Style For All Occasions",
    text: "Exquisite pieces that embody elegance, and enduring beauty",
    button: "Shop Collection",
  },
  {
    id: 2,
    image: "/assets/images/Slider-02.webp",
    title: "Where Elegance Meets Craftsmanship",
    text: "Each piece tells a story of artistry, sophistication, and everlasting beauty.",
    button: "Shop the Collection",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 7000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div
      id="site-slider"
      className="relative overflow-hidden group"
      data-autoplay="true"
      data-autoplay-speed="7000"
    >
      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex duration-700 ease-in-out relative z-10">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="slide-item w-full flex-shrink-0 relative bg-cover bg-center bg-no-repeat flex"
              style={{ backgroundImage: `url(${slide.image})`, height: "100%", minHeight: "100%" }}
            >
              <div
                className="absolute inset-0 z-10 hero-overlay"
                style={{ backgroundColor: "#000", opacity: 0.2, pointerEvents: "none" }}
              ></div>

              <div className="relative container z-20 flex items-center justify-center" style={{ height: "100%" }}>
                <div className="container-wrapper">
                  <div className="te-hero-item grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.618fr] items-center gap-12">
                    <div className="col-span-1">
                      <div className="space-y-6">
                        <h2 className="slider-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                          {slide.title}
                        </h2>
                        <p className="text-base lg:text-xl text-white">{slide.text}</p>
                        <a href="#" className="te-btn te-btn-primary">
                          {slide.button}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button */}
      <button
        id="prev-slide"
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 ease-in-out duration-300 focus:outline-none z-30 flex"
        aria-label="Previous Slide"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        id="next-slide"
        onClick={scrollNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 ease-in-out duration-300 focus:outline-none z-30 flex"
        aria-label="Next Slide"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Pagination */}
      <div
        id="pagination-dots"
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-4 w-4 rounded-full transition-colors duration-300 ease-in-out ${
              selectedIndex === index ? "bg-white" : "bg-white bg-opacity-25"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
