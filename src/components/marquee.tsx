"use client";
import { useEffect, useRef } from "react";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const track = trackRef.current;
    const content = contentRef.current;

    let position = 0;
    const speed = 1; // Adjust speed if needed
    const contentWidth = content.scrollWidth;
    let isRTL = document.documentElement.getAttribute("dir") === "rtl";
    let animationId: number | null = null;

    // Clone content twice for seamless scroll
    const clone1 = content.cloneNode(true) as HTMLElement;
    const clone2 = content.cloneNode(true) as HTMLElement;
    clone1.setAttribute("aria-hidden", "true");
    clone2.setAttribute("aria-hidden", "true");
    track.appendChild(clone1);
    track.appendChild(clone2);

    const updateDirection = () => {
      isRTL = document.documentElement.getAttribute("dir") === "rtl";
    };

    const start = () => {
      if (animationId) return;

      const step = () => {
        if (isRTL) {
          position += speed;
          if (position >= contentWidth) position = 0;
          track.style.transform = `translateX(${position}px)`;
        } else {
          position -= speed;
          if (position <= -contentWidth) position = 0;
          track.style.transform = `translateX(${position}px)`;
        }
        animationId = requestAnimationFrame(step);
      };

      animationId = requestAnimationFrame(step);
    };

    const pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const reset = () => {
      position = 0;
      track.style.transform = "translateX(0)";
      pause();
      start();
    };

    const observer = new MutationObserver(() => {
      updateDirection();
      reset();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", start);

    start();

    return () => {
      pause();
      observer.disconnect();
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", start);
    };
  }, []);

  return (
    <div ref={containerRef} className="marquee-container overflow-hidden bg-primary-500 py-2">
      <div ref={trackRef} className="marquee-track flex will-change-transform">
        <div ref={contentRef} className="marquee-content flex whitespace-nowrap">
          <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">
            Free Shipping on Orders Over $50
          </a>
          <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">
            30-Day Return Policy
          </a>
          <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">
            24/7 Customer Support
          </a>
          <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">
            New Collection Available Now
          </a>
          <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">
            Subscribe for 10% Off
          </a>
          <a href="#" className="text-white hover:text-primary-200 mx-4 transition-colors duration-300 ease-in-out">
            Limited Time Offer
          </a>
        </div>
      </div>
    </div>
  );
}
