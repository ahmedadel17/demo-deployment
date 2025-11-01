/**
 * Hero Slider Component
 * Initialize hero sliders with data attributes
 */
(function() {
    function initHeroSlider() {
        const slider = document.getElementById('site-slider');
        if (!slider) return;

        const container = document.getElementById('slides-container');
        const slides = container.querySelectorAll('.slide-item');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        const dotsContainer = document.getElementById('pagination-dots');

        let currentIndex = 0;
        let autoplayInterval = null;

        // Get settings from data attributes
        const autoplay = slider.dataset.autoplay === 'true';
        const autoplaySpeed = parseInt(slider.dataset.autoplaySpeed) || 7000;

        // Set responsive heights
        function setSlideHeight() {
            const width = window.innerWidth;
            let height;

            if (width >= 1280) height = slider.dataset.heightXl;
            else if (width >= 1024) height = slider.dataset.heightLg;
            else if (width >= 768) height = slider.dataset.heightMd;
            else if (width >= 640) height = slider.dataset.heightSm;
            else height = slider.dataset.heightBase;

            slides.forEach(slide => slide.style.height = height);
        }

        // Generate pagination dots
        function createDots() {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'w-2 h-2 rounded-full transition-all duration-300 ' +
                    (index === 0 ? 'bg-white w-8' : 'bg-white/50');
                dot.setAttribute('aria-label', `Slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        // Update active dot
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.className = 'w-8 h-2 rounded-full bg-white transition-all duration-300';
                } else {
                    dot.className = 'w-2 h-2 rounded-full bg-white/50 transition-all duration-300';
                }
            });
        }

        // Go to specific slide
        function goToSlide(index) {
            currentIndex = index;
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
            resetAutoplay();
        }

        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        }

        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        }

        // Autoplay
        function startAutoplay() {
            if (autoplay && slides.length > 1) {
                autoplayInterval = setInterval(nextSlide, autoplaySpeed);
            }
        }

        function resetAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                startAutoplay();
            }
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        window.addEventListener('resize', setSlideHeight);

        // Initialize
        setSlideHeight();
        if (slides.length > 1) {
            createDots();
            startAutoplay();
        }
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }

    // Export for manual initialization
    if (typeof window !== 'undefined') {
        window.initHeroSlider = initHeroSlider;
    }
})();