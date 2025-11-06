'use client';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { useAppDispatch } from '@/app/store/hooks';
import { setCartData } from '@/app/store/slices/cartSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
// Extend Window interface to include initHeroSlider and Embla
interface EmblaCarouselType {
  (node: HTMLElement, options?: object, plugins?: unknown[]): {
    slideNodes: () => HTMLElement[];
    canScrollNext: () => boolean;
    canScrollPrev: () => boolean;
    scrollNext: () => void;
    scrollPrev: () => void;
    on: (event: string, callback: () => void) => void;
    reInit: (options?: object) => void;
    destroy: () => void;
  };
}

interface EmblaCarouselAutoplayType {
  (options: {
    delay: number;
    stopOnInteraction: boolean;
    stopOnMouseEnter: boolean;
    playOnInit: boolean;
    stopOnFocusIn: boolean;
  }): unknown;
}

interface SwiperInstance {
  destroy: () => void;
  update: () => void;
  slideNext: () => void;
  slidePrev: () => void;
  slideTo: (index: number) => void;
}

interface SwiperConstructor {
  new (
    container: HTMLElement | string,
    options?: {
      slidesPerView?: number | 'auto';
      spaceBetween?: number;
      loop?: boolean;
      autoplay?: { delay?: number; disableOnInteraction?: boolean };
      navigation?: { nextEl?: string | HTMLElement; prevEl?: string | HTMLElement };
      pagination?: { el?: string | HTMLElement; clickable?: boolean };
      direction?: 'horizontal' | 'vertical';
      [key: string]: unknown;
    }
  ): SwiperInstance;
}

declare global {
  interface Window {
    initHeroSlider?: () => void;
    EmblaCarousel?: EmblaCarouselType;
    EmblaCarouselAutoplay?: EmblaCarouselAutoplayType;
    Swiper?: SwiperConstructor;
  }
  
  interface HTMLElement {
    emblaApi?: ReturnType<NonNullable<Window['EmblaCarousel']>>;
    swiper?: SwiperInstance;
    cleanup?: () => void;
    emblaListener?: boolean;
  }
}

interface PageBuilderProps {
  html: string;
  css: string;
  scripts: Array<{
    type: string;
    selector: string;
  }>;
}

export default function PageBuilder({ html, css, scripts }: PageBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptsLoadedRef = useRef(false);
  const { getToken } = useAuth();
  const dispatch = useAppDispatch();
  const t = useTranslations();
  useEffect(() => {
    // Load required scripts based on component types
    const loadScripts = async () => {
      if (scriptsLoadedRef.current) return;

      const scriptPromises = scripts.map(script => {
        return new Promise((resolve, reject) => {
          // Check if script already loaded
          const scriptId = `pb-${script.type}`;
          if (document.getElementById(scriptId)) {
            resolve(true);
            return;
          }

          const scriptElement = document.createElement('script');
          scriptElement.id = scriptId;
          scriptElement.src = `/js/page-builder/${script.type}.js`;
          scriptElement.async = true;
          scriptElement.onload = () => resolve(true);
          scriptElement.onerror = () => reject(new Error(`Failed to load ${script.type}`));
          document.body.appendChild(scriptElement);
        });
      });

      await Promise.all(scriptPromises);
      scriptsLoadedRef.current = true;
    };

    loadScripts();

    // Cleanup
    return () => {
      scripts.forEach(script => {
        const scriptId = `pb-${script.type}`;
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.remove();
        }
      });
    };
  }, [scripts]);

  // Initialize hero slider after HTML is rendered
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if hero slider exists in HTML
    const sliderElement = container.querySelector('#site-slider') as HTMLElement;
    const slidesContainer = container.querySelector('#slides-container') as HTMLElement;
    const nextButton = container.querySelector('#next-slide') as HTMLElement;
    const prevButton = container.querySelector('#prev-slide') as HTMLElement;
    const dotsContainer = container.querySelector('#pagination-dots') as HTMLElement;
    
    if (!sliderElement || !slidesContainer) return;
    
    const initializeHeroSlider = () => {
      const slides = Array.from(slidesContainer.children) as HTMLElement[];
      
      if (slides.length === 0) return;
      
      const dots = dotsContainer ? Array.from(dotsContainer.children) as HTMLElement[] : [];
      
      const autoplay = sliderElement.dataset.autoplay === "true";
      const speed = parseInt(sliderElement.dataset.autoplaySpeed || "5000", 10);
      
      let currentIndex = 0;
      let intervalId: NodeJS.Timeout | null = null;
      
      // Clone first and last slides for infinite loop
      const firstClone = slides[0].cloneNode(true) as HTMLElement;
      const lastClone = slides[slides.length - 1].cloneNode(true) as HTMLElement;
      firstClone.classList.add('slide-clone');
      lastClone.classList.add('slide-clone');
      slidesContainer.appendChild(firstClone);
      slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);
      
      const allSlides = Array.from(slidesContainer.children) as HTMLElement[];
      let currentSlide = 1; // because first slide is now clone
      const slideWidth = sliderElement.offsetWidth;
      
      // Set initial position
      slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
      slidesContainer.style.transition = "transform 0.7s ease-in-out";
      
      // Function to move to a specific slide
      const goToSlide = (index: number) => {
        slidesContainer.style.transition = "transform 0.7s ease-in-out";
        currentSlide = index;
        slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
      };
      
      // Update dots active state
      const updateDots = () => {
        dots.forEach((dot, i) => {
          dot.className =
            i === currentIndex
              ? "w-8 h-2 rounded-full bg-white transition-all duration-300"
              : "w-2 h-2 rounded-full bg-white/50 transition-all duration-300";
        });
      };
      
      // Move to next slide
      const nextSlide = () => {
        if (currentSlide >= allSlides.length - 1) return;
        currentSlide++;
        goToSlide(currentSlide);
      };
      
      // Move to previous slide
      const prevSlide = () => {
        if (currentSlide <= 0) return;
        currentSlide--;
        goToSlide(currentSlide);
      };
      
      // Looping effect (jump instantly to real slides after clones)
      const handleTransitionEnd = () => {
        if (allSlides[currentSlide].isSameNode(firstClone)) {
          slidesContainer.style.transition = "none";
          currentSlide = 1;
          slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
        }
        if (allSlides[currentSlide].isSameNode(lastClone)) {
          slidesContainer.style.transition = "none";
          currentSlide = allSlides.length - 2;
          slidesContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
        }
        
        // Update active index for pagination
        currentIndex =
          currentSlide === 0
            ? slides.length - 1
            : currentSlide === slides.length + 1
            ? 0
            : currentSlide - 1;
        
        updateDots();
      };
      
      slidesContainer.addEventListener("transitionend", handleTransitionEnd);
      
      // Store event handlers for cleanup
      const eventHandlers: Array<{ element: HTMLElement; event: string; handler: () => void }> = [];
      
      // Buttons
      if (nextButton) {
        const handleNextClick = () => {
          nextSlide();
          resetAutoplay();
        };
        nextButton.addEventListener("click", handleNextClick);
        eventHandlers.push({ element: nextButton, event: "click", handler: handleNextClick });
      }
      
      if (prevButton) {
        const handlePrevClick = () => {
          prevSlide();
          resetAutoplay();
        };
        prevButton.addEventListener("click", handlePrevClick);
        eventHandlers.push({ element: prevButton, event: "click", handler: handlePrevClick });
      }
      
      // Pagination click
      dots.forEach((dot, i) => {
        const handleDotClick = () => {
          currentIndex = i;
          currentSlide = i + 1;
          goToSlide(currentSlide);
          resetAutoplay();
        };
        dot.addEventListener("click", handleDotClick);
        eventHandlers.push({ element: dot, event: "click", handler: handleDotClick });
      });
      
      // Autoplay
      const startAutoplay = () => {
        if (autoplay) {
          intervalId = setInterval(() => {
            nextSlide();
          }, speed);
        }
      };
      
      const resetAutoplay = () => {
        if (autoplay && intervalId) {
          clearInterval(intervalId);
          startAutoplay();
        }
      };
      
      startAutoplay();
      updateDots();
      
      // Resize listener (for responsive width)
      const handleResize = () => {
        const newWidth = sliderElement.offsetWidth;
        slidesContainer.style.transition = "none";
        slidesContainer.style.transform = `translateX(-${newWidth * currentSlide}px)`;
      };
      
      window.addEventListener("resize", handleResize);
      
      // Cleanup function
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
        slidesContainer.removeEventListener("transitionend", handleTransitionEnd);
        window.removeEventListener("resize", handleResize);
        // Remove all event listeners
        eventHandlers.forEach(({ element, event, handler }) => {
          element.removeEventListener(event, handler);
        });
        // Remove clones
        const clones = slidesContainer.querySelectorAll('.slide-clone');
        clones.forEach(clone => clone.remove());
      };
    };
    
    if (sliderElement && slidesContainer) {
      // Extract background images from raw HTML string
      const extractBackgroundFromHTML = (): Map<number, string> => {
        const backgroundMap = new Map<number, string>();
        const slideRegex = /<div[^>]*class="[^"]*slide-item[^"]*"[^>]*>/gi;
        
        let match;
        let slideIndex = 0;
        
        while ((match = slideRegex.exec(html)) !== null) {
          const slideHtml = html.substring(match.index, match.index + 1000); // Get more chars to catch full style
          
          // Try multiple patterns to catch different formats
          // Pattern 1: style="background-image: url("...")"
          let styleMatch = slideHtml.match(/style\s*=\s*["']([^"']*background-image[^"']*)["']/gi);
          // Pattern 2: style="background-image: url(&quot;...&quot;)" - HTML entities
          if (!styleMatch || styleMatch.length === 0) {
            styleMatch = slideHtml.match(/style\s*=\s*["'][^"']*background-image[^"']*url\(&quot;([^&]+)&quot;\)[^"']*["']/gi);
          }
          
          if (styleMatch && styleMatch.length > 0) {
            const styleStr = styleMatch[0];
            // Try multiple URL extraction patterns
            let urlMatch = styleStr.match(/url\(["']?([^"')]+)["']?\)/i);
            // Try HTML entities pattern
            if (!urlMatch) {
              urlMatch = styleStr.match(/url\(&quot;([^&]+)&quot;\)/i);
            }
            // Try escaped quotes
            if (!urlMatch) {
              urlMatch = styleStr.match(/url\(&#39;([^&#]+)&#39;\)/i);
            }
            
            if (urlMatch && urlMatch[1]) {
              let imageUrl = urlMatch[1].trim();
              // Decode HTML entities
              imageUrl = imageUrl
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
              backgroundMap.set(slideIndex, imageUrl);
              console.log(`📄 Extracted background for slide ${slideIndex + 1}:`, imageUrl);
            }
          }
          slideIndex++;
        }
        
        return backgroundMap;
      };
      
      const htmlBackgroundMap = extractBackgroundFromHTML();
      console.log('📋 Extracted backgrounds from HTML:', htmlBackgroundMap);
      
      // Force image loading for all images in slides
      const forceImageLoad = () => {
        const slides = container.querySelectorAll('.slide-item');
        slides.forEach((slide, index) => {
          const slideElement = slide as HTMLElement;
          
          // Handle img tags
          const images = slide.querySelectorAll('img');
          images.forEach((img) => {
            // Remove lazy loading if present
            if (img.hasAttribute('loading')) {
              img.removeAttribute('loading');
            }
            
            // Get the actual src (could be in src or data-src for lazy loading)
            const imageSrc = img.getAttribute('src') || img.getAttribute('data-src');
            
            if (imageSrc) {
              // Set src if it was in data-src
              if (img.getAttribute('data-src') && !img.src) {
                img.src = imageSrc;
              }
              
              // Force reload if image hasn't loaded
              if (!img.complete || img.naturalHeight === 0) {
                const originalSrc = img.src;
                img.src = '';
                setTimeout(() => {
                  img.src = originalSrc;
                }, 10);
              }
            }
          });
          
          // Extract background image URL from multiple sources
          let imageUrl: string | null = null;
          
          // 0. First check if we extracted it from HTML
          if (htmlBackgroundMap.has(index)) {
            imageUrl = htmlBackgroundMap.get(index) || null;
            console.log(`📄 Slide ${index + 1} - Found background from HTML:`, imageUrl);
          }
          
          // 1. Check data attributes
          if (!imageUrl) {
            const dataBg = slideElement.getAttribute('data-background-image') || 
                          slideElement.getAttribute('data-bg') ||
                          slideElement.getAttribute('data-bg-image');
            if (dataBg) {
              imageUrl = dataBg;
            }
          }
          
          // 2. Check inline style attribute (not computed) - handle HTML entities
          if (!imageUrl) {
            const inlineStyle = slideElement.getAttribute('style');
            if (inlineStyle) {
              // Try multiple regex patterns to catch different formats
              // Pattern 1: url("...") or url('...') or url(...)
              let bgMatch = inlineStyle.match(/background-image\s*:\s*url\(["']?([^"')]+)["']?\)/i);
              // Pattern 2: url(&quot;...&quot;) - HTML entities
              if (!bgMatch) {
                bgMatch = inlineStyle.match(/background-image\s*:\s*url\(&quot;([^&]+)&quot;\)/i);
              }
              // Pattern 3: url with escaped quotes
              if (!bgMatch) {
                bgMatch = inlineStyle.match(/background-image\s*:\s*url\(&#39;([^&#]+)&#39;\)/i);
              }
              
              if (bgMatch && bgMatch[1]) {
                imageUrl = bgMatch[1].trim();
                // Decode HTML entities immediately
                imageUrl = imageUrl
                  .replace(/&quot;/g, '"')
                  .replace(/&#39;/g, "'")
                  .replace(/&amp;/g, '&');
              }
            }
          }
          
          // 3. Check inline style property
          if (!imageUrl) {
            const inlineBg = slideElement.style.backgroundImage;
            if (inlineBg && inlineBg !== 'none' && inlineBg !== 'undefined') {
              const urlMatch = inlineBg.match(/url\(["']?([^"')]+)["']?\)/);
              if (urlMatch && urlMatch[1]) {
                imageUrl = urlMatch[1].trim();
              }
            }
          }
          
          // 4. Check computed style
          if (!imageUrl) {
            const bgImage = window.getComputedStyle(slideElement).backgroundImage;
            if (bgImage && bgImage !== 'none' && bgImage !== 'undefined') {
              const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
              if (urlMatch && urlMatch[1]) {
                imageUrl = urlMatch[1].trim();
              }
            }
          }
          
          // 5. Check CSS class that might have background image
          if (!imageUrl) {
            const classes = slideElement.className.split(' ');
            for (const className of classes) {
              if (className.includes('bg-') || className.includes('background')) {
                const style = window.getComputedStyle(slideElement);
                const bg = style.backgroundImage || style.background;
                if (bg && bg !== 'none') {
                  const urlMatch = bg.match(/url\(["']?([^"')]+)["']?\)/);
                  if (urlMatch && urlMatch[1]) {
                    imageUrl = urlMatch[1].trim();
                    break;
                  }
                }
              }
            }
          }
          
          // Decode HTML entities if URL contains them
          if (imageUrl) {
            imageUrl = imageUrl
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');
          }
          
          // Load and apply background image if found
          if (imageUrl && imageUrl !== 'none' && imageUrl !== 'undefined') {
            console.log(`🖼️ Slide ${index + 1} - Loading background image:`, imageUrl);
            
            // Ensure slide has proper classes and layout
            if (!slideElement.classList.contains('flex')) {
              slideElement.classList.add('flex');
            }
            if (!slideElement.classList.contains('bg-cover')) {
              slideElement.classList.add('bg-cover', 'bg-center', 'bg-no-repeat');
            }
            
            // Ensure proper height (use 100% if fixed height might cause issues)
            const currentHeight = slideElement.style.height;
            if (currentHeight && currentHeight.includes('px')) {
              // Keep fixed height but ensure min-height is set
              slideElement.style.minHeight = currentHeight;
            } else if (!currentHeight || currentHeight === '') {
              slideElement.style.height = '100%';
              slideElement.style.minHeight = '100%';
            }
            
            // Apply immediately (don't wait for preload)
            slideElement.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
            slideElement.style.setProperty('background-size', 'cover', 'important');
            slideElement.style.setProperty('background-position', 'center', 'important');
            slideElement.style.setProperty('background-repeat', 'no-repeat', 'important');
            
            // Preload to ensure image is loaded
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
              // Re-apply to ensure it's visible
              slideElement.style.setProperty('background-image', `url("${imageUrl}")`, 'important');
              // Force a repaint
              slideElement.style.opacity = '0.99';
              setTimeout(() => {
                slideElement.style.opacity = '1';
              }, 10);
              console.log(`✅ Slide ${index + 1} - Background image loaded:`, imageUrl);
            };
            
            img.onerror = () => {
              console.warn(`❌ Slide ${index + 1} - Failed to load background image:`, imageUrl);
              // Keep the style even if preload fails
            };
            
            img.src = imageUrl;
          } else {
            console.warn(`⚠️ Slide ${index + 1} - No background image URL found`);
          }
        });
      };

      // Small delay to ensure HTML is fully rendered
      let cleanupFn: (() => void) | undefined;
      
      const timeoutId = setTimeout(() => {
        // Force image loading first
        forceImageLoad();
        
        // Initialize the slider with the new logic
        cleanupFn = initializeHeroSlider();
        
        // Force image load again after slider initialization
        setTimeout(() => {
          forceImageLoad();
        }, 200);
        
        // Force image load again after a longer delay to catch any images that didn't load
        setTimeout(forceImageLoad, 500);
        setTimeout(forceImageLoad, 1000);
      }, 150);
      
      return () => {
        clearTimeout(timeoutId);
        if (cleanupFn) {
          cleanupFn();
        }
      };
    }
  }, [html]);

  // Initialize Swiper carousels
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load Swiper scripts if not already loaded
    const loadSwiperScripts = async () => {
      // Check if Swiper is already loaded
      if (window.Swiper) {
        initializeSwipers();
        return;
      }

      // Try to load Swiper from CDN
      const scripts = [
        { id: 'swiper-css', src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', type: 'link' },
        { id: 'swiper-js', src: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', type: 'script' }
      ];

      const loadScript = (item: { id: string; src: string; type: string }): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (document.getElementById(item.id)) {
            resolve();
            return;
          }

          if (item.type === 'link') {
            const linkElement = document.createElement('link');
            linkElement.id = item.id;
            linkElement.rel = 'stylesheet';
            linkElement.href = item.src;
            linkElement.onload = () => resolve();
            linkElement.onerror = () => reject(new Error(`Failed to load ${item.src}`));
            document.head.appendChild(linkElement);
          } else {
            const scriptElement = document.createElement('script');
            scriptElement.id = item.id;
            scriptElement.src = item.src;
            scriptElement.async = true;
            scriptElement.onload = () => resolve();
            scriptElement.onerror = () => reject(new Error(`Failed to load ${item.src}`));
            document.body.appendChild(scriptElement);
          }
        });
      };

      try {
        await Promise.all(scripts.map(loadScript));
        // Wait a bit for scripts to initialize
        setTimeout(() => {
          initializeSwipers();
        }, 100);
      } catch (error) {
        console.error('Error loading Swiper scripts:', error);
        // Try to initialize anyway in case Swiper is already available
        setTimeout(() => {
          initializeSwipers();
        }, 500);
      }
    };

    const initializeSwipers = () => {
      if (!window.Swiper) {
        console.warn('Swiper not loaded');
        return;
      }

      // Find all Swiper containers in the container
      const swiperContainers = container.querySelectorAll('.swiper');
      
      swiperContainers.forEach((swiperElement) => {
        const swiperNode = swiperElement as HTMLElement;
        
        // Skip if already initialized
        if (swiperNode.swiper) {
          return;
        }

        // Find navigation elements
        const prevButton = swiperNode.querySelector('.swiper-button-prev');
        const nextButton = swiperNode.querySelector('.swiper-button-next');
        const pagination = swiperNode.querySelector('.swiper-pagination');
        
        // Default options
        const swiperOptions: {
          slidesPerView?: number | 'auto';
          spaceBetween?: number;
          loop?: boolean;
          autoplay?: { delay?: number; disableOnInteraction?: boolean };
          navigation?: { nextEl?: HTMLElement | null; prevEl?: HTMLElement | null };
          pagination?: { el?: HTMLElement | null; clickable?: boolean };
          direction?: 'horizontal' | 'vertical';
          [key: string]: unknown;
        } = {
          slidesPerView: 'auto',
          spaceBetween: 16,
          loop: true,
          direction: document.dir === 'rtl' ? 'rtl' as 'horizontal' : 'horizontal',
        };

        // Add navigation if buttons exist
        if (prevButton || nextButton) {
          const navConfig: { nextEl?: HTMLElement; prevEl?: HTMLElement } = {};
          if (nextButton) {
            navConfig.nextEl = nextButton as HTMLElement;
          }
          if (prevButton) {
            navConfig.prevEl = prevButton as HTMLElement;
          }
          swiperOptions.navigation = navConfig;
        }

        // Add pagination if it exists
        if (pagination) {
          swiperOptions.pagination = {
            el: pagination as HTMLElement,
            clickable: true,
          };
        }

        // Add autoplay if data attribute exists
        const autoplayDelay = swiperNode.getAttribute('data-autoplay-delay');
        if (autoplayDelay) {
          swiperOptions.autoplay = {
            delay: parseInt(autoplayDelay, 10) || 3000,
            disableOnInteraction: false,
          };
        }

        // Initialize Swiper
        try {
          if (!window.Swiper) {
            console.warn('Swiper constructor not available');
            return;
          }
          // Use type assertion since Swiper options are flexible
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const swiperInstance = new window.Swiper(swiperNode, swiperOptions as any);
          
          // Store Swiper instance
          swiperNode.swiper = swiperInstance;
          
          // Store cleanup function
          swiperNode.cleanup = () => {
            if (swiperInstance) {
              swiperInstance.destroy();
            }
            delete swiperNode.swiper;
          };
        } catch (error) {
          console.error('Error initializing Swiper:', error);
        }
      });
    };

    // Small delay to ensure HTML is rendered
    const timeoutId = setTimeout(() => {
      loadSwiperScripts();
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup Swipers
      const swipers = container.querySelectorAll('.swiper');
      swipers.forEach((swiperElement) => {
        const swiperNode = swiperElement as HTMLElement;
        if (swiperNode.cleanup) {
          swiperNode.cleanup();
        }
      });
    };
  }, [html]);

  // Initialize Embla carousels
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load Embla scripts if not already loaded
    const loadEmblaScripts = async () => {
      // Check if Embla is already loaded
      if (window.EmblaCarousel) {
        initializeCarousels();
        return;
      }

      const scripts = [
        { id: 'embla-carousel', src: '/js/embla-carousel.min.js' },
        { id: 'embla-autoplay', src: '/js/embla-carousel-autoplay.min.js' }
      ];

      const loadScript = (script: { id: string; src: string }): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (document.getElementById(script.id)) {
            resolve();
            return;
          }

          const scriptElement = document.createElement('script');
          scriptElement.id = script.id;
          scriptElement.src = script.src;
          scriptElement.async = true;
          scriptElement.onload = () => resolve();
          scriptElement.onerror = () => reject(new Error(`Failed to load ${script.src}`));
          document.body.appendChild(scriptElement);
        });
      };

      try {
        await Promise.all(scripts.map(loadScript));
        // Wait a bit for scripts to initialize
        setTimeout(() => {
          initializeCarousels();
        }, 100);
      } catch (error) {
        console.error('Error loading Embla scripts:', error);
      }
    };

    const initializeCarousels = () => {
      if (!window.EmblaCarousel || !window.EmblaCarouselAutoplay) {
        console.warn('Embla scripts not loaded');
        return;
      }

      // Find all carousels in the container
      const carousels = container.querySelectorAll('.te-carousel .embla');
      
      carousels.forEach((emblaNodeElement) => {
        const emblaNode = emblaNodeElement as HTMLElement;
        
        // Skip if already initialized
        if (emblaNode.emblaApi) {
          return;
        }

        if (!window.EmblaCarousel || !window.EmblaCarouselAutoplay) {
          return;
        }

        const options = {
          loop: true,
          containScroll: 'trimSnaps' as const,
          align: 'start' as const,
          direction: document.dir === 'rtl' ? 'rtl' as const : 'ltr' as const
        };

        // Initialize Embla with autoplay
        const emblaApi = window.EmblaCarousel(emblaNode, options, [
          window.EmblaCarouselAutoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            playOnInit: true,
            stopOnFocusIn: true
          })
        ]);

        // Store API reference
        emblaNode.emblaApi = emblaApi;

        // Find navigation buttons
        const carouselContainer = emblaNode.closest('.te-carousel');
        const prevBtn = carouselContainer?.querySelector('.embla-prev') as HTMLButtonElement;
        const nextBtn = carouselContainer?.querySelector('.embla-next') as HTMLButtonElement;

        if (prevBtn && nextBtn) {
          // Check if buttons already have listeners
          if (prevBtn.emblaListener) {
            return;
          }

          const slides = emblaApi.slideNodes();
          
          const scrollNextFull = () => {
            if (slides.length > 0) {
              const containerWidth = (emblaNode as HTMLElement).getBoundingClientRect().width;
              const slideWidth = slides[0].getBoundingClientRect().width;
              const slidesVisible = Math.max(1, Math.floor(containerWidth / slideWidth));
              
              for (let i = 0; i < slidesVisible; i++) {
                if (emblaApi.canScrollNext()) {
                  emblaApi.scrollNext();
                }
              }
            }
          };

          const scrollPrevFull = () => {
            if (slides.length > 0) {
              const containerWidth = (emblaNode as HTMLElement).getBoundingClientRect().width;
              const slideWidth = slides[0].getBoundingClientRect().width;
              const slidesVisible = Math.max(1, Math.floor(containerWidth / slideWidth));
              
              for (let i = 0; i < slidesVisible; i++) {
                if (emblaApi.canScrollPrev()) {
                  emblaApi.scrollPrev();
                }
              }
            }
          };

          const toggleButtons = () => {
            prevBtn.disabled = !emblaApi.canScrollPrev();
            nextBtn.disabled = !emblaApi.canScrollNext();
          };

          // Add event listeners
          prevBtn.addEventListener('click', scrollPrevFull);
          nextBtn.addEventListener('click', scrollNextFull);
          
          // Mark buttons as having listeners
          prevBtn.emblaListener = true;
          nextBtn.emblaListener = true;
          
          toggleButtons();
          emblaApi.on('select', toggleButtons);

          // Handle resize
          const handleResize = () => {
            emblaApi.reInit();
            toggleButtons();
          };
          
          window.addEventListener('resize', handleResize);
          
          // Store cleanup function
          emblaNode.cleanup = () => {
            prevBtn.removeEventListener('click', scrollPrevFull);
            nextBtn.removeEventListener('click', scrollNextFull);
            window.removeEventListener('resize', handleResize);
            emblaApi.destroy();
            delete prevBtn.emblaListener;
            delete nextBtn.emblaListener;
          };
        }
      });
    };

    // Small delay to ensure HTML is rendered
    const timeoutId = setTimeout(() => {
      loadEmblaScripts();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup carousels
      const carousels = container.querySelectorAll('.embla');
      carousels.forEach((emblaNodeElement) => {
        const emblaNode = emblaNodeElement as HTMLElement;
        if (emblaNode.cleanup) {
          emblaNode.cleanup();
        }
      });
    };
  }, [html]);

  // Initialize default selections on page load
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper function to update button state
    const updateButtonState = (productCard: HTMLElement, isLoading: boolean, isEnabled: boolean) => {
      const button = productCard.querySelector('.te-btn.te-btn-primary') as HTMLButtonElement;
      if (!button) return;

      if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        // Add loading spinner if not exists
        if (!button.querySelector('.loading-spinner')) {
          const spinner = document.createElement('span');
          spinner.className = 'loading-spinner';
          spinner.innerHTML = `
            <svg class="animate-spin h-4 w-4 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          `;
          button.insertBefore(spinner, button.firstChild);
        }
      } else {
        button.disabled = !isEnabled;
        button.classList.remove('loading');
        if (isEnabled) {
          button.style.opacity = '1';
          button.style.cursor = 'pointer';
        } else {
          button.style.opacity = '0.5';
          button.style.cursor = 'not-allowed';
        }
        // Remove loading spinner
        const spinner = button.querySelector('.loading-spinner');
        if (spinner) {
          spinner.remove();
        }
      }
    };

    // Function to check if button should be enabled
    const checkButtonState = (productCard: HTMLElement) => {
      const productDataStr = productCard.getAttribute('data-product');
      if (!productDataStr) return;

      try {
        const productData = JSON.parse(productDataStr);
        const isLoading = (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation || false;
        
        // If no variations, button is always enabled
        if (!productData.has_variation || !productData.variations || productData.variations.length === 0) {
          updateButtonState(productCard, false, true);
          return;
        }

        // Check if all variations are selected
        const selectedOptions: Record<string, number> = {};
        productCard.querySelectorAll('.product-attribute').forEach(attr => {
          const attrId = (attr as HTMLElement).getAttribute('data-attribute-id');
          const activeOption = attr.querySelector('.size-option.active, .color-option.active') as HTMLElement;
          
          if (attrId && activeOption) {
            const valueId = activeOption.getAttribute('data-value-id');
            if (valueId) {
              selectedOptions[attrId] = parseInt(valueId, 10);
            }
          }
        });

        const requiredAttributes = productData.variations?.map((v: { id: number }) => v.id.toString()) || [];
        const allSelected = requiredAttributes.length > 0 && 
          requiredAttributes.every((attrId: string) => selectedOptions[attrId] !== undefined);

        // Check if variation data exists
        const hasVariationData = !!(productCard as HTMLElement & { variationData?: { variantId?: number } }).variationData;

        // Enable button only if: not loading, all selected, and variation data exists
        const isEnabled = !isLoading && allSelected && hasVariationData;
        updateButtonState(productCard, isLoading, isEnabled);
      } catch (error) {
        console.error('Error checking button state:', error);
      }
    };

    // Set default selections for all product cards
    const productCards = container.querySelectorAll('[data-product]');
    productCards.forEach((card) => {
      const productDataStr = (card as HTMLElement).getAttribute('data-product');
      if (!productDataStr) return;

      try {
        const productData = JSON.parse(productDataStr);
        
        if (productData.defaultSelection) {
          Object.keys(productData.defaultSelection).forEach((attrId) => {
            const valueId = productData.defaultSelection[attrId];
            const attributeContainer = card.querySelector(`.product-attribute[data-attribute-id="${attrId}"]`);
            
            if (attributeContainer) {
              const option = attributeContainer.querySelector(
                `[data-attribute-id="${attrId}"][data-value-id="${valueId}"]`
              ) as HTMLElement;
              
              if (option) {
                // Remove active from all options in this group
                attributeContainer.querySelectorAll('.size-option.active, .color-option.active').forEach(btn => {
                  btn.classList.remove('active');
                });
                // Add active to default option
                option.classList.add('active');
              }
            }
          });
        }
      } catch (error) {
        console.error('Error initializing default selection:', error);
      }
      
      // Check and update button state after initialization
      checkButtonState(card as HTMLElement);
    });
  }, [html]);

  // Monitor button states periodically
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper function to update button state
    const updateButtonState = (productCard: HTMLElement, isLoading: boolean, isEnabled: boolean) => {
      const button = productCard.querySelector('.te-btn.te-btn-primary') as HTMLButtonElement;
      if (!button) return;

      if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        if (!button.querySelector('.loading-spinner')) {
          const spinner = document.createElement('span');
          spinner.className = 'loading-spinner';
          spinner.innerHTML = `
            <svg class="animate-spin h-4 w-4 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          `;
          button.insertBefore(spinner, button.firstChild);
        }
      } else {
        button.disabled = !isEnabled;
        button.classList.remove('loading');
        if (isEnabled) {
          button.style.opacity = '1';
          button.style.cursor = 'pointer';
        } else {
          button.style.opacity = '0.5';
          button.style.cursor = 'not-allowed';
        }
        const spinner = button.querySelector('.loading-spinner');
        if (spinner) {
          spinner.remove();
        }
      }
    };

    // Function to check if button should be enabled
    const checkButtonState = (productCard: HTMLElement) => {
      const productDataStr = productCard.getAttribute('data-product');
      if (!productDataStr) return;

      try {
        const productData = JSON.parse(productDataStr);
        const isLoading = (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation || false;
        
        if (!productData.has_variation || !productData.variations || productData.variations.length === 0) {
          updateButtonState(productCard, false, true);
          return;
        }

        const selectedOptions: Record<string, number> = {};
        productCard.querySelectorAll('.product-attribute').forEach(attr => {
          const attrId = (attr as HTMLElement).getAttribute('data-attribute-id');
          const activeOption = attr.querySelector('.size-option.active, .color-option.active') as HTMLElement;
          
          if (attrId && activeOption) {
            const valueId = activeOption.getAttribute('data-value-id');
            if (valueId) {
              selectedOptions[attrId] = parseInt(valueId, 10);
            }
          }
        });

        const requiredAttributes = productData.variations?.map((v: { id: number }) => v.id.toString()) || [];
        const allSelected = requiredAttributes.length > 0 && 
          requiredAttributes.every((attrId: string) => selectedOptions[attrId] !== undefined);

        const hasVariationData = !!(productCard as HTMLElement & { variationData?: { variantId?: number } }).variationData;

        const isEnabled = !isLoading && allSelected && hasVariationData;
        updateButtonState(productCard, isLoading, isEnabled);
      } catch (error) {
        console.error('Error checking button state:', error);
      }
    };

    const intervalId = setInterval(() => {
      const productCards = container.querySelectorAll('[data-product]');
      productCards.forEach((card) => {
        checkButtonState(card as HTMLElement);
      });
    }, 500); // Check every 500ms

    return () => clearInterval(intervalId);
  }, [html]);

  // Handle Variation Selection and Add to Cart
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Helper function to update button state
    const updateButtonState = (productCard: HTMLElement, isLoading: boolean, isEnabled: boolean) => {
      const button = productCard.querySelector('.te-btn.te-btn-primary') as HTMLButtonElement;
      if (!button) return;

      if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        if (!button.querySelector('.loading-spinner')) {
          const spinner = document.createElement('span');
          spinner.className = 'loading-spinner';
          spinner.innerHTML = `
            <svg class="animate-spin h-4 w-4 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          `;
          button.insertBefore(spinner, button.firstChild);
        }
      } else {
        button.disabled = !isEnabled;
        button.classList.remove('loading');
        if (isEnabled) {
          button.style.opacity = '1';
          button.style.cursor = 'pointer';
        } else {
          button.style.opacity = '0.5';
          button.style.cursor = 'not-allowed';
        }
        const spinner = button.querySelector('.loading-spinner');
        if (spinner) {
          spinner.remove();
        }
      }
    };

    // Function to update price container with variation prices
    const updatePriceContainer = (productCard: HTMLElement, variationData: { price_after_discount?: string; price_befor_discount?: string; price_before_discount?: string }) => {
      const priceContainer = productCard.querySelector('.product-price');
      if (!priceContainer) {
        console.warn('Price container not found');
        return;
      }

      // Get price values - handle typo "befor" and correct "before"
      const priceAfterDiscount = variationData.price_after_discount;
      const priceBeforeDiscount = variationData.price_befor_discount || variationData.price_before_discount;

      if (!priceAfterDiscount) {
        console.warn('Price after discount not found in variation data');
        return;
      }

      // Find price paragraphs
      const priceParagraphs = priceContainer.querySelectorAll('p');
      
      // First paragraph is the line-through price (before discount)
      if (priceParagraphs.length > 0 && priceBeforeDiscount) {
        const beforeDiscountP = priceParagraphs[0];
        // Find the text node after the icon
        const iconSpan = beforeDiscountP.querySelector('.icon-riyal-symbol');
        if (iconSpan && iconSpan.nextSibling) {
          // Update the text content after the icon
          iconSpan.nextSibling.textContent = ` ${priceBeforeDiscount}`;
        } else {
          // If structure is different, try to update the whole paragraph
          const textContent = beforeDiscountP.textContent || '';
          const newText = textContent.replace(/[\d.]+/, priceBeforeDiscount);
          beforeDiscountP.textContent = newText;
        }
      }

      // Second paragraph is the current price (after discount)
      if (priceParagraphs.length > 1) {
        const afterDiscountP = priceParagraphs[1];
        // Find the text node after the icon
        const iconSpan = afterDiscountP.querySelector('.icon-riyal-symbol');
        if (iconSpan && iconSpan.nextSibling) {
          // Update the text content after the icon
          iconSpan.nextSibling.textContent = ` ${priceAfterDiscount}`;
        } else {
          // If structure is different, try to update the whole paragraph
          const textContent = afterDiscountP.textContent || '';
          const newText = textContent.replace(/[\d.]+/, priceAfterDiscount);
          afterDiscountP.textContent = newText;
        }
      }

      console.log('💰 Price updated:', { priceBeforeDiscount, priceAfterDiscount });
    };

    // Function to check if button should be enabled
    const checkButtonState = (productCard: HTMLElement) => {
      const productDataStr = productCard.getAttribute('data-product');
      if (!productDataStr) return;

      try {
        const productData = JSON.parse(productDataStr);
        const isLoading = (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation || false;
        
        if (!productData.has_variation || !productData.variations || productData.variations.length === 0) {
          updateButtonState(productCard, false, true);
          return;
        }

        const selectedOptions: Record<string, number> = {};
        productCard.querySelectorAll('.product-attribute').forEach(attr => {
          const attrId = (attr as HTMLElement).getAttribute('data-attribute-id');
          const activeOption = attr.querySelector('.size-option.active, .color-option.active') as HTMLElement;
          
          if (attrId && activeOption) {
            const valueId = activeOption.getAttribute('data-value-id');
            if (valueId) {
              selectedOptions[attrId] = parseInt(valueId, 10);
            }
          }
        });

        const requiredAttributes = productData.variations?.map((v: { id: number }) => v.id.toString()) || [];
        const allSelected = requiredAttributes.length > 0 && 
          requiredAttributes.every((attrId: string) => selectedOptions[attrId] !== undefined);

        const hasVariationData = !!(productCard as HTMLElement & { variationData?: { variantId?: number } }).variationData;

        const isEnabled = !isLoading && allSelected && hasVariationData;
        updateButtonState(productCard, isLoading, isEnabled);
      } catch (error) {
        console.error('Error checking button state:', error);
      }
    };

    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Handle variation option clicks (size-option, color-option)
      const variationOption = target.closest('.size-option, .color-option') as HTMLElement;
      if (variationOption) {
        e.preventDefault();
        e.stopPropagation();
        
        // Find the product card
        const productCard = variationOption.closest('[data-product]') as HTMLElement;
        if (!productCard) return;
        
        // Get the attribute container
        const attributeContainer = variationOption.closest('.product-attribute') as HTMLElement;
        if (!attributeContainer) return;
        
        const attributeId = attributeContainer.getAttribute('data-attribute-id');
        if (!attributeId) return;
        
        // Remove active class from all options in this attribute group
        attributeContainer.querySelectorAll('.size-option.active, .color-option.active').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked option
        variationOption.classList.add('active');
        
        // Extract product data
        const productDataStr = productCard.getAttribute('data-product');
        if (!productDataStr) return;
        
        try {
          const productData = JSON.parse(productDataStr);
          
          // Get all selected options
          const selectedOptions: Record<string, number> = {};
          productCard.querySelectorAll('.product-attribute').forEach(attr => {
            const attrId = (attr as HTMLElement).getAttribute('data-attribute-id');
            const activeOption = attr.querySelector('.size-option.active, .color-option.active') as HTMLElement;
            
            if (attrId && activeOption) {
              const valueId = activeOption.getAttribute('data-value-id');
              if (valueId) {
                selectedOptions[attrId] = parseInt(valueId, 10);
              }
            }
          });
          
          // Check if all required variations are selected
          const requiredAttributes = productData.variations?.map((v: { id: number }) => v.id.toString()) || [];
          const allSelected = requiredAttributes.length > 0 && 
            requiredAttributes.every((attrId: string) => selectedOptions[attrId] !== undefined);
          
          // If all variants are selected, fetch variation from API
          if (allSelected && productData.has_variation) {
            // Set loading state
            (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation = true;
            checkButtonState(productCard);
            
            try {
              // Prepare request payload - attributes as object with string attribute IDs as keys
              // Sort keys to ensure "1" comes before "2", etc.
              const sortedKeys = Object.keys(selectedOptions).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
              const attributes: Record<string, number> = {};
              sortedKeys.forEach(attrId => {
                attributes[attrId] = selectedOptions[attrId];
              });
              
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products/get-variation-by-attribute`,
                {
                  product_id: productData.id,
                  attributes: attributes,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              
              if (response.data && response.data.data) {
                const variationData = response.data.data;
                // Store variation data on the product card element
                (productCard as HTMLElement & { variationData?: unknown }).variationData = variationData;
                console.log('✅ Variation fetched:', variationData);
                console.log('🎯 Variation ID:', variationData.variantId || variationData.id);
                
                // Update price container with new prices
                updatePriceContainer(productCard, variationData);
              }
            } catch (error) {
              console.error('Error fetching variation:', error);
              // Fallback to variantMap if API fails
              const variantKey = Object.keys(selectedOptions)
                .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
                .map(id => `${id}:${selectedOptions[id]}`)
                .join('|');
              
              if (productData.variantMap && productData.variantMap[variantKey]) {
                const variant = productData.variantMap[variantKey];
                (productCard as HTMLElement & { variationData?: unknown }).variationData = variant;
                console.log('📦 Using variantMap fallback:', variant);
                
                // Update price container with variant prices if available
                if (variant.price_after_discount || variant.price) {
                  updatePriceContainer(productCard, {
                    price_after_discount: variant.price_after_discount || variant.price?.toString(),
                    price_before_discount: variant.price_before_discount || variant.compareAt?.toString(),
                    price_befor_discount: variant.price_befor_discount || variant.compareAt?.toString(),
                  });
                }
              }
            } finally {
              // Clear loading state
              (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation = false;
              checkButtonState(productCard);
            }
          } else {
            // Clear variation data if not all selected
            delete (productCard as HTMLElement & { variationData?: unknown }).variationData;
            (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation = false;
            checkButtonState(productCard);
          }
        } catch (error) {
          console.error('Error parsing product data:', error);
        }
        
        return;
      }
      
      // Handle Add to Cart button clicks
      const addToCartButton = target.closest('.te-btn.te-btn-primary');
      if (addToCartButton) {
        e.preventDefault();
        e.stopPropagation();
        
        // Find the product card
        const productCard = addToCartButton.closest('[data-product]') as HTMLElement;
        if (!productCard) {
          console.error('Product card not found');
          return;
        }
        
        // Extract product data
        const productDataStr = productCard.getAttribute('data-product');
        if (!productDataStr) {
          console.error('Product data not found');
          return;
        }
        
        try {
          const productData = JSON.parse(productDataStr);
          
          // Print product ID
          console.log('🛒 Product ID:', productData.id);
          
          // Get selected options or use default selection
          const selectedOptions: Record<string, number> = {};
          productCard.querySelectorAll('.product-attribute').forEach(attr => {
            const attrId = (attr as HTMLElement).getAttribute('data-attribute-id');
            const activeOption = attr.querySelector('.size-option.active, .color-option.active') as HTMLElement;
            
            if (attrId && activeOption) {
              const valueId = activeOption.getAttribute('data-value-id');
              if (valueId) {
                selectedOptions[attrId] = parseInt(valueId, 10);
              }
            }
          });
          
          // Check button state - if disabled, don't proceed
          const button = addToCartButton as HTMLButtonElement;
          if (button.disabled) {
            toast.error('Please select all variations and wait for them to load');
            return;
          }

          // Check if we have fetched variation data
          const fetchedVariation = (productCard as HTMLElement & { variationData?: { variantId?: number; id?: number } }).variationData;
          
          // Determine item_id (variantId or productId)
          let itemId = productData.default_variation_id || productData.id;
          
          if (fetchedVariation) {
            // Use fetched variation data
            itemId = fetchedVariation.variantId || fetchedVariation.id || itemId;
            console.log('✅ Using fetched variation ID:', itemId);
          } else if (productData.has_variation) {
            // Fallback: try variantMap or fetch from API
            const selections = Object.keys(selectedOptions).length > 0 
              ? selectedOptions 
              : (productData.defaultSelection || {});
            
            const requiredAttributes = productData.variations?.map((v: { id: number }) => v.id.toString()) || [];
            const allSelected = requiredAttributes.length > 0 && 
              requiredAttributes.every((attrId: string) => selections[attrId] !== undefined);
            
            if (allSelected && Object.keys(selections).length > 0) {
              // Set loading state
              (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation = true;
              updateButtonState(productCard, true, false);
              
              // Try to fetch variation if not already fetched
              try {
                // Prepare request payload - attributes as object with string attribute IDs as keys
                // Sort keys to ensure "1" comes before "2", etc.
                const sortedKeys = Object.keys(selections).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
                const attributes: Record<string, number> = {};
                sortedKeys.forEach(attrId => {
                  attributes[attrId] = selections[attrId];
                });
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products/get-variation-by-attribute`,
                  {
                    product_id: productData.id,
                    attributes: attributes,
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                );
                
                if (response.data && response.data.data) {
                  const variationData = response.data.data;
                  itemId = variationData.variantId;
                  // Store variation data
                  (productCard as HTMLElement & { variationData?: unknown }).variationData = variationData;
                  console.log('✅ Fetched variation on add to cart:', itemId);
                  
                  // Update price container with new prices
                  updatePriceContainer(productCard, variationData);
                }
              } catch (error) {
                console.error('Error fetching variation on add to cart:', error);
                // Fallback to variantMap
                if (productData.variantMap) {
                  const variantKey = Object.keys(selections)
                    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
                    .map(id => `${id}:${selections[id]}`)
                    .join('|');
                  
                  const variant = productData.variantMap[variantKey];
                  if (variant) {
                    itemId = variant.variantId;
                    (productCard as HTMLElement & { variationData?: unknown }).variationData = variant;
                    console.log('✅ Using variantMap fallback:', variant.variantId);
                    
                    // Update price container with variant prices if available
                    if (variant.price_after_discount || variant.price) {
                      updatePriceContainer(productCard, {
                        price_after_discount: variant.price_after_discount || variant.price?.toString(),
                        price_before_discount: variant.price_before_discount || variant.compareAt?.toString(),
                        price_befor_discount: variant.price_befor_discount || variant.compareAt?.toString(),
                      });
                    }
                  }
                }
              } finally {
                // Clear loading state
                (productCard as HTMLElement & { isLoadingVariation?: boolean }).isLoadingVariation = false;
                checkButtonState(productCard);
              }
            } else if (productData.variantMap) {
              // Fallback to variantMap if selections exist
              const variantKey = Object.keys(selections)
                .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
                .map(id => `${id}:${selections[id]}`)
                .join('|');
              
              const variant = productData.variantMap[variantKey];
              if (variant) {
                itemId = variant.variantId;
                console.log('✅ Using variantMap:', variant.variantId);
                
                // Update price container with variant prices if available
                if (variant.price_after_discount || variant.price) {
                  updatePriceContainer(productCard, {
                    price_after_discount: variant.price_after_discount || variant.price?.toString(),
                    price_before_discount: variant.price_before_discount || variant.compareAt?.toString(),
                    price_befor_discount: variant.price_befor_discount || variant.compareAt?.toString(),
                  });
                }
              }
            }
          }
          
          // Get auth token
          const authToken = getToken();
          if (!authToken) {
            toast.error('Please login to add items to cart');
            return;
          }
          
          // Add to cart
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/add-to-cart`,
              {
                item_id: itemId,
                qty: 1,
                customer_note: '',
                type: 'product',
              },
              {
                headers: {
                  'Authorization': `Bearer ${authToken}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            
            if (response.data.status) {
              // Update cart store with the new cart data from response
              if (response.data.data) {
                dispatch(setCartData(response.data.data));
              }
              toast.success(t('Product added to cart successfully'));
            } else {
              console.error('Add to cart failed:', response.data);
              toast.error(response.data.message || 'Failed to add to cart');
            }
          } catch (error) {
            console.error('Error adding to cart:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
              toast.error('Please login to add items to cart');
            } else {
              toast.error('An error occurred while adding to cart');
            }
          }
        } catch (error) {
          console.error('Error parsing product data:', error);
          toast.error('Invalid product data');
        }
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [html, getToken, dispatch]);

  // Fix gradient syntax in dynamically injected HTML
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fixGradients = () => {
      // Find all elements with gradient backgrounds
      const elements = container.querySelectorAll('[style*="linear-gradient"], [class*="linear-gradient"]');
      
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        
        // Fix inline style gradients
        const inlineStyle = htmlElement.getAttribute('style');
        if (inlineStyle && inlineStyle.includes('linear-gradient')) {
          // Fix underscores in color stops (e.g., #1D1E3D_-3.17% -> #1D1E3D -3.17%)
          let fixedStyle = inlineStyle.replace(/(#[0-9A-Fa-f]+)_(-?\d+\.?\d*%)/g, '$1 $2');
          // Also fix cases where color and percentage are concatenated without space
          fixedStyle = fixedStyle.replace(/(#[0-9A-Fa-f]+)(-?\d+\.?\d*%)/g, '$1 $2');
          
          if (fixedStyle !== inlineStyle) {
            htmlElement.setAttribute('style', fixedStyle);
            // Also update the style property directly
            htmlElement.style.background = fixedStyle.match(/linear-gradient\([^)]+\)/)?.[0] || '';
          }
        }
        
        // Fix Tailwind arbitrary gradient classes
        const classList = Array.from(htmlElement.classList);
        classList.forEach((className) => {
          if (className.includes('bg-[') && className.includes('linear-gradient')) {
            // Extract the gradient from the class
            const gradientMatch = className.match(/linear-gradient\(([^)]+)\)/);
            if (gradientMatch) {
              let gradientValue = gradientMatch[1];
              // Fix underscores in color stops
              gradientValue = gradientValue.replace(/(#[0-9A-Fa-f]+)_(-?\d+\.?\d*%)/g, '$1 $2');
              gradientValue = gradientValue.replace(/(#[0-9A-Fa-f]+)(-?\d+\.?\d*%)/g, '$1 $2');
              
              // Apply as inline style instead
              htmlElement.style.background = `linear-gradient(${gradientValue})`;
              htmlElement.classList.remove(className);
            }
          }
        });
      });
    };

    // Fix gradients after HTML is rendered
    const timeoutId = setTimeout(() => {
      fixGradients();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [html]);

  return (
    <>
      {/* Inject CSS */}
      {/* <style dangerouslySetInnerHTML={{ __html: css }} /> */}

      {/* Inject HTML */}
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}