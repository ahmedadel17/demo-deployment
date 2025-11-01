import ZoomImage from "./ZoomImage";

// Gallery Slides Component
interface ImageData {
  url?: string;
  original_url?: string;
}

interface GallerySlidesProps {
  galleryImages: (string | ImageData)[];
  mainRef: any; // EmblaViewportRefType
}

function GallerySlides({ galleryImages, mainRef }: GallerySlidesProps) {
  return (
    <div className="embla overflow-hidden" ref={mainRef}>
      <div className="embla__container flex">
        {galleryImages.map((image: string | ImageData, i: number) => {
          const src = typeof image === 'string' ? image : image.original_url || image.url || '';
          return (
            <div key={i} className="embla__slide flex-none w-full min-w-0">
              <div className="aspect-square w-full">
                <ZoomImage 
                  src={src} 
                  alt={`Product ${i + 1}`} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default GallerySlides;
