import { useEffect, useRef, useState } from "react";

interface ZoomImageProps {
    src: string;
    alt: string;
  }
  
  function ZoomImage({ src, alt }: ZoomImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);
  
    const updateZoomPosition = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      imageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    };
  
    const updateLensPosition = (e: MouseEvent) => {
      if (!containerRef.current || !lensRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 75;
      const y = e.clientY - rect.top - 75;
      lensRef.current.style.left = `${Math.max(0, Math.min(x, rect.width - 150))}px`;
      lensRef.current.style.top = `${Math.max(0, Math.min(y, rect.height - 150))}px`;
    };
  
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      const handleClick = (e: MouseEvent) => {
        setIsZoomed((prev) => !prev);
        updateZoomPosition(e);
      };
  
      const handleMouseMove = (e: MouseEvent) => {
        if (isZoomed) updateZoomPosition(e);
        updateLensPosition(e);
      };
  
      const handleMouseLeave = () => setIsZoomed(false);
  
      container.addEventListener("click", handleClick);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
  
      return () => {
        container.removeEventListener("click", handleClick);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [isZoomed]);
  
     return (
       <div ref={containerRef} className={`zoom-container aspect-square relative overflow-hidden cursor-zoom-in ${isZoomed ? "zoomed cursor-zoom-out" : ""}`}>
         <img
           ref={imageRef}
           src={src}
           alt={alt}
           className="w-full h-full object-cover transition-transform duration-300"
           style={{ 
             transform: `scale(${isZoomed ? 2 : 1})`,
             imageRendering: '-webkit-optimize-contrast'
           }}
         />
         <div ref={lensRef} className="zoom-lens absolute border-2 border-white rounded-full w-[150px] h-[150px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"></div>
       </div>
     );
  }
  export default ZoomImage;