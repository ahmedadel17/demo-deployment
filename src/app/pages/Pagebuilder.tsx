'use client';
import { useEffect, useRef } from 'react';

// Extend Window interface to include initHeroSlider
declare global {
  interface Window {
    initHeroSlider?: () => void;
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

      // Initialize components after scripts loaded
      setTimeout(() => {
        scripts.forEach(script => {
          if (script.type === 'hero-slider' && window.initHeroSlider) {
            window.initHeroSlider();
          }
        });
      }, 100);
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

  return (
    <>
      {/* Inject CSS */}
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Inject HTML */}
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}