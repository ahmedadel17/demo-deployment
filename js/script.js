(function () {
    'use strict';

    // =============================
    // Navbar Scroll Progress Bar
    // =============================
    const progressBar = document.getElementById('navbar-progress');

    if (progressBar) {
        window.addEventListener('scroll', function () {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }


    // =============================
    // Header Sticky
    // =============================
    const header = document.getElementById('header');
    const marqueeContainer = document.querySelector('.marquee-container');
    let lastScroll = 0;

    // Hysteresis thresholds to prevent flickering
    const STICKY_THRESHOLD_HIGH = 150; // Hide marquee when scrolling past this
    const STICKY_THRESHOLD_LOW = 50;   // Show marquee when scrolling back below this
    const HEADER_HIDE_THRESHOLD = 100; // Original threshold for header sticky behavior

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Handle header sticky class with original threshold
        if (scrollTop > HEADER_HIDE_THRESHOLD) {
            header.classList.add('is-sticky-start');
        } else {
            header.classList.remove('is-sticky-start');
        }

        // Handle marquee visibility with hysteresis
        if (marqueeContainer) {
            const currentDisplay = marqueeContainer.style.display;
            const isCurrentlyHidden = currentDisplay === 'none';

            if (!isCurrentlyHidden && scrollTop > STICKY_THRESHOLD_HIGH) {
                // Hide marquee only when scrolling significantly past threshold
                marqueeContainer.style.display = 'none';
            } else if (isCurrentlyHidden && scrollTop < STICKY_THRESHOLD_LOW) {
                // Show marquee only when scrolling significantly below threshold
                marqueeContainer.style.display = 'block'; // or 'flex' depending on your layout
            }
        }

        // Handle hide/show for sticky-scroll only
        if (header.classList.contains('sticky-scroll')) {
            if (scrollTop > lastScroll && scrollTop > HEADER_HIDE_THRESHOLD) {
                // Scrolling down → hide header
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up → show header
                header.style.transform = 'translateY(0)';
            }
        } else {
            // Always sticky → ensure header is visible
            header.style.transform = 'translateY(0)';
        }

        lastScroll = scrollTop;
    });

    // =============================
    // Smooth Scroll for Anchor Links - FIXED
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if href is just '#' or empty
            if (!targetId || targetId === '#') {
                return; // Let default behavior happen (dropdown triggers, etc.)
            }

            // Only prevent default and smooth scroll if target element exists
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault(); // Only prevent default if we found a target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // If no target element found, let the default behavior happen (don't break navigation)
        });
    });

    // =============================
    // Back-to-Top Button
    // =============================
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Smooth scroll to top on button click
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


})();
