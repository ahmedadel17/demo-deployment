document.addEventListener("DOMContentLoaded", () => {
    let sliderElement = document.getElementById("site-slider");
    if (!sliderElement) {
        console.error('Slider element with ID "site-slider" not found.');
        return;
    }

    let autoplayInterval;
    let slidesContainer = document.getElementById("slides-container");
    let slideItems = document.querySelectorAll(".slide-item");
    let prevButton = document.getElementById("prev-slide");
    let nextButton = document.getElementById("next-slide");
    let paginationDots = document.getElementById("pagination-dots");

    let hasMultipleSlides = slideItems.length > 1;
    let originalSlideCount = slideItems.length;
    let currentSlide = hasMultipleSlides ? 1 : 0;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isTouching = false;

    let autoplay = sliderElement.dataset.autoplay === "true";
    let autoplaySpeed = parseInt(sliderElement.dataset.autoplaySpeed, 10) || 5000;

    // Extract slider configuration from data attributes
    let sliderConfig = {
        heightBase: sliderElement.dataset.heightBase || "500px",
        heightSm: sliderElement.dataset.heightSm || "550px",
        heightMd: sliderElement.dataset.heightMd || "600px",
        heightLg: sliderElement.dataset.heightLg || "650px",
        heightXl: sliderElement.dataset.heightXl || "700px",
        overlayColor: sliderElement.dataset.overlayColor || "#000000",
        overlayOpacity: sliderElement.dataset.overlayOpacity || "40"
    };

    // Clean up duplicate classes and fix container
    function cleanupSliderClasses() {
        if (!slidesContainer) return;

        // Remove all existing classes and add clean ones
        slidesContainer.className = "";
        slidesContainer.classList.add('flex', 'duration-700', 'ease-in-out', 'relative', 'z-10');

        console.log('Cleaned up slider container classes');
    }

    // Create clones for infinite loop
    function createClones() {
        if (!hasMultipleSlides) return;

        // Clone first slide and append to end
        let firstSlide = slideItems[0].cloneNode(true);
        firstSlide.classList.add('slide-clone');
        slidesContainer.appendChild(firstSlide);

        // Clone last slide and prepend to beginning
        let lastSlide = slideItems[slideItems.length - 1].cloneNode(true);
        lastSlide.classList.add('slide-clone');
        slidesContainer.insertBefore(lastSlide, slideItems[0]);

        // Update slideItems to include clones
        slideItems = document.querySelectorAll(".slide-item");

        console.log('Created clones. Total slides now:', slideItems.length);
    }

    // Apply dynamic heights and overlay styles
    function applySliderStyles() {
        // Apply responsive heights to slider container
        const heightCSS = `
            /* Base height */
            #site-slider {
                height: ${sliderConfig.heightBase};
            }
            
            /* Responsive heights */
            @media (min-width: 640px) {
                #site-slider { height: ${sliderConfig.heightSm}; }
            }
            @media (min-width: 768px) {
                #site-slider { height: ${sliderConfig.heightMd}; }
            }
            @media (min-width: 1024px) {
                #site-slider { height: ${sliderConfig.heightLg}; }
            }
            @media (min-width: 1280px) {
                #site-slider { height: ${sliderConfig.heightXl}; }
            }

            /* Ensure slide items take full height */
            #site-slider .slide-item {
                height: 100%;
                min-height: 100%;
            }

            /* Ensure slides container takes full height */
            #slides-container {
                height: 100%;
            }

            /* Dynamic overlay styles */
            .hero-overlay {
                background-color: ${sliderConfig.overlayColor};
                opacity: ${parseInt(sliderConfig.overlayOpacity) / 100};
                pointer-events: none;
            }

            /* Ensure background images cover properly */
            .slide-item.bg-cover {
                background-size: cover;
                background-position: left center;
                background-repeat: no-repeat;
            }

            /* Additional styling for better performance */
            .slide-item {
                will-change: transform;
                backface-visibility: hidden;
            }

            /* Disable transitions during instant jumps */
            .no-transition {
                transition: none !important;
            }
        `;

        // Inject CSS if it doesn't exist
        let existingStyle = document.getElementById('slider-dynamic-styles');
        if (!existingStyle) {
            let styleElement = document.createElement('style');
            styleElement.id = 'slider-dynamic-styles';
            styleElement.textContent = heightCSS;
            document.head.appendChild(styleElement);
        }

        // Apply styling to individual slide items
        slideItems.forEach((slide, index) => {
            slide.style.height = '100%';
            slide.style.minHeight = '100%';

            if (!slide.classList.contains('bg-cover')) {
                slide.classList.add('bg-cover', 'bg-center', 'bg-no-repeat');
            }

            let overlayElement = slide.querySelector('.hero-overlay, [class*="hero-overlay"]');
            if (overlayElement) {
                overlayElement.style.backgroundColor = sliderConfig.overlayColor;
                overlayElement.style.opacity = parseInt(sliderConfig.overlayOpacity) / 100;
                overlayElement.style.pointerEvents = 'none';
            }
        });
    }

    // Preload background images for better performance
    function preloadBackgroundImages() {
        slideItems.forEach((slide) => {
            const backgroundImage = window.getComputedStyle(slide).backgroundImage;
            if (backgroundImage && backgroundImage !== 'none') {
                const imageUrl = backgroundImage.slice(4, -1).replace(/"/g, "");
                if (imageUrl && imageUrl !== 'none') {
                    const img = new Image();
                    img.src = imageUrl;
                }
            }
        });
    }

    // Update slider position with smooth transition
    let updateSlider = (instant = false) => {
        console.log('UpdateSlider called - Moving to slide:', currentSlide, 'Instant:', instant);

        let direction = document.dir === "rtl" ? -1 : 1;

        // Adjust calculation for single vs multiple slides
        let slidePosition = hasMultipleSlides ? currentSlide : 0;
        let translateValue = `translateX(${-(direction * slidePosition * 100)}%)`;

        if (instant) {
            slidesContainer.classList.add('no-transition');
            slidesContainer.style.transform = translateValue;

            setTimeout(() => {
                slidesContainer.classList.remove('no-transition');
            }, 50);
        } else {
            slidesContainer.classList.remove('no-transition');
            slidesContainer.style.transform = translateValue;
        }

        slidesContainer.style.willChange = 'transform';

        console.log('Applied transform:', translateValue);

        if (hasMultipleSlides && paginationDots) {
            updatePagination();
        } else if (!hasMultipleSlides && paginationDots) {
            // Handle single slide pagination
            updatePagination();
        }
        
        if (prevButton && nextButton) {
            updateNavigationButtons();
        }
    };

    // Handle transition end to jump to real slides (only for multiple slides)
    function handleTransitionEnd() {
        // Skip transition end logic for single slides
        if (!hasMultipleSlides) {
            isTransitioning = false;
            return;
        }
        
        isTransitioning = false;

        // If we're at the cloned first slide (index 0), jump to real first slide (index 1)
        if (currentSlide === 0) {
            currentSlide = originalSlideCount;
            updateSlider(true); // Instant jump
        }
        // If we're at the cloned last slide, jump to real last slide
        else if (currentSlide === originalSlideCount + 1) {
            currentSlide = 1;
            updateSlider(true); // Instant jump
        }
    }

    // Previous slide with infinite loop
    let goToPrevSlide = () => {
        if (!hasMultipleSlides || isTransitioning) return;
        isTransitioning = true;

        console.log('Previous clicked - Current slide:', currentSlide);
        currentSlide -= 1;

        console.log('Previous - New slide:', currentSlide);
        updateSlider();
        restartAutoplay();
    };

    // Next slide with infinite loop
    let goToNextSlide = () => {
        if (!hasMultipleSlides || isTransitioning) return;
        isTransitioning = true;

        console.log('Next clicked - Current slide:', currentSlide);
        currentSlide += 1;

        console.log('Next - New slide:', currentSlide);
        updateSlider();
        restartAutoplay();
    };

    // Update pagination dots
    let updatePagination = () => {
        if (!paginationDots) return;

        paginationDots.innerHTML = "";

        // Only create dots for original slides
        for (let i = 0; i < originalSlideCount; i++) {
            let dot = document.createElement("button");
            dot.classList.add("h-4", "w-4", "rounded-full", "transition-colors", "duration-300", "ease-in-out");
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

            // Determine active dot based on current position
            let isActive = false;
            
            if (hasMultipleSlides) {
                if (currentSlide === i + 1) {
                    isActive = true;
                } else if (currentSlide === 0 && i === originalSlideCount - 1) {
                    // If at cloned first slide, highlight last dot
                    isActive = true;
                } else if (currentSlide === originalSlideCount + 1 && i === 0) {
                    // If at cloned last slide, highlight first dot
                    isActive = true;
                }
            } else {
                // For single slide, always active if it's the first (and only) dot
                isActive = (i === 0);
            }

            if (isActive) {
                dot.classList.add("bg-white");
            } else {
                dot.classList.add("bg-white", "bg-opacity-25");
            }

            // Fix the click handler for single vs multiple slides
            if (hasMultipleSlides) {
                dot.addEventListener("click", () => goToSlide(i + 1)); // +1 because of clone offset
            } else {
                dot.addEventListener("click", () => goToSlide(i)); // No offset for single slide
            }
            
            paginationDots.appendChild(dot);
        }
    };

    // Go to specific slide
    let goToSlide = (slideIndex) => {
        if (isTransitioning) return;
        isTransitioning = true;

        currentSlide = slideIndex;
        updateSlider();
        restartAutoplay();
    };

    // Update navigation button visibility
    let updateNavigationButtons = () => {
        if (!prevButton || !nextButton) return;

        if (hasMultipleSlides) {
            prevButton.style.display = "flex";
            nextButton.style.display = "flex";
        } else {
            prevButton.style.display = "none";
            nextButton.style.display = "none";
        }
    };

    // Start autoplay
    let startAutoplay = () => {
        if (autoplay && hasMultipleSlides) {
            autoplayInterval = setInterval(() => {
                goToNextSlide();
            }, autoplaySpeed);
        }
    };

    // Restart autoplay
    let restartAutoplay = () => {
        if (autoplay && hasMultipleSlides) {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
    };

    // Event listeners
    if (prevButton) {
        prevButton.addEventListener("click", goToPrevSlide);
    }

    if (nextButton) {
        nextButton.addEventListener("click", goToNextSlide);
    }

    // Add transition end listener
    if (slidesContainer) {
        slidesContainer.addEventListener('transitionend', handleTransitionEnd);
    }

    // Touch events for mobile swipe (only for multiple slides)
    if (slidesContainer && hasMultipleSlides) {
        slidesContainer.addEventListener("touchstart", (e) => {
            isTouching = true;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            clearInterval(autoplayInterval);
        }, { passive: true });

        slidesContainer.addEventListener("touchmove", (e) => {
            if (!isTouching) return;

            let touchCurrentX = e.touches[0].clientX;
            let touchCurrentY = e.touches[0].clientY;
            let diffX = touchCurrentX - touchStartX;
            let diffY = touchCurrentY - touchStartY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
                touchEndX = touchCurrentX;
            }
        }, { passive: false });

        slidesContainer.addEventListener("touchend", () => {
            if (!isTouching) return;
            isTouching = false;

            let diffX = touchStartX - touchEndX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    goToNextSlide();
                } else {
                    goToPrevSlide();
                }
            }

            restartAutoplay();
        });
    }

    // Enhanced hero container classes functionality
    function addHeroContainerClasses() {
        var heroContainers = document.querySelectorAll('#site-slider .container');

        heroContainers.forEach(function (container) {
            var classesToAdd = ['flex', 'items-center', 'justify-center', 'relative', 'z-20'];

            classesToAdd.forEach(function (className) {
                if (!container.classList.contains(className)) {
                    container.classList.add(className);
                }
            });

            container.style.height = '100%';
            container.style.minHeight = '100%';
        });

        var slideItems = document.querySelectorAll('#site-slider .slide-item');
        slideItems.forEach(function (slideItem) {
            if (!slideItem.classList.contains('flex')) {
                slideItem.classList.add('flex');
            }
            slideItem.style.height = '100%';
            slideItem.style.minHeight = '100%';
        });
    }

    // Function to handle responsive height updates on window resize
    function handleResize() {
        applySliderStyles();
    }

    // Initialize slider
    cleanupSliderClasses(); // Clean up duplicate classes first
    createClones(); // Create clones for infinite loop
    applySliderStyles(); // Apply styles
    preloadBackgroundImages(); // Preload images for performance
    updateSlider(true); // Initialize position (instant)
    startAutoplay();
    addHeroContainerClasses();

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Mutation observer for dynamic content
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                addHeroContainerClasses();
                applySliderStyles();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Cleanup function
    function cleanup() {
        clearInterval(autoplayInterval);
        window.removeEventListener('resize', handleResize);
        if (slidesContainer) {
            slidesContainer.removeEventListener('transitionend', handleTransitionEnd);
        }
        observer.disconnect();
    }

    // Store cleanup function globally if needed
    window.sliderCleanup = cleanup;
});