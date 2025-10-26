'use client';

import { useEffect, useRef } from 'react';

export function useScrollEffects() {
  const headerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLElement>(null);
  const backToTopRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastScroll = 0;

    // Hysteresis thresholds to prevent flickering
    const STICKY_THRESHOLD_HIGH = 150;
    const STICKY_THRESHOLD_LOW = 50;
    const HEADER_HIDE_THRESHOLD = 100;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Handle header sticky class
      if (headerRef.current) {
        if (scrollTop > HEADER_HIDE_THRESHOLD) {
          headerRef.current.classList.add('is-sticky-start');
        } else {
          headerRef.current.classList.remove('is-sticky-start');
        }
      }

      // Handle marquee visibility with hysteresis
      if (marqueeRef.current) {
        const currentDisplay = marqueeRef.current.style.display;
        const isCurrentlyHidden = currentDisplay === 'none';

        if (!isCurrentlyHidden && scrollTop > STICKY_THRESHOLD_HIGH) {
          marqueeRef.current.style.display = 'none';
        } else if (isCurrentlyHidden && scrollTop < STICKY_THRESHOLD_LOW) {
          marqueeRef.current.style.display = 'block';
        }
      }

      // Handle hide/show for sticky-scroll only
      if (headerRef.current?.classList.contains('sticky-scroll')) {
        if (scrollTop > lastScroll && scrollTop > HEADER_HIDE_THRESHOLD) {
          headerRef.current.style.transform = 'translateY(-100%)';
        } else {
          headerRef.current.style.transform = 'translateY(0)';
        }
      } else if (headerRef.current) {
        headerRef.current.style.transform = 'translateY(0)';
      }

      // Progress bar
      if (progressBarRef.current) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBarRef.current.style.width = scrolled + '%';
      }

      // Back to top button
      if (backToTopRef.current) {
        if (window.pageYOffset > 300) {
          backToTopRef.current.classList.add('show');
        } else {
          backToTopRef.current.classList.remove('show');
        }
      }

      lastScroll = scrollTop;
    };

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (!href || href === '#') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    // Back to top functionality
    const handleBackToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Add event listeners for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Back to top button
    if (backToTopRef.current) {
      backToTopRef.current.addEventListener('click', handleBackToTop);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      if (backToTopRef.current) {
        backToTopRef.current.removeEventListener('click', handleBackToTop);
      }
    };
  }, []);

  return {
    headerRef,
    marqueeRef,
    progressBarRef,
    backToTopRef
  };
}






