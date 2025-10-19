
/* eslint-disable @typescript-eslint/no-require-imports */
const { generatePaletteFromHex } = require('./components/colors');
const components = require('./components/index');
const rtl = require('tailwindcss-rtl');
const typography = require('@tailwindcss/typography');

module.exports = {
    darkMode: 'class',
   
    content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    safelist: [
        'grid-cols-2',
        'bg-secondary-500',
        'bg-green-500',
        'bg-red-500',
        'lg:grid-cols-3',
        'lg:grid-cols-5',
        'lg:grid-cols-6',
        'md:grid-cols-1',
        'md:grid-cols-2',
        'md:grid-cols-3',
        'md:grid-cols-4',
    ],
    theme: {
        extend: {
            translate: {
                '0.25': '0.0625rem',
            },

            colors: {
                primary: generatePaletteFromHex('#0A2463'),
                secondary: generatePaletteFromHex('#CAA34E'),
                accent: generatePaletteFromHex('#ff8600'),
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
                green: {
                    500: '#055e26ff',
                },
                red: {
                    500: '#AE1113',
                },
            },

            // Custom Fonts
            fontFamily: {
                'inter': ['inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                'ltr': ['inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                'rtl': ['somarsans', 'system-ui', 'sans-serif'], // Arabic fonts
            },

            // Container Settings
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '1rem',
                    lg: '1rem',
                    xl: '1rem',
                    '2xl': '1rem',
                },
                screens: {
                    lg: '1024px',
                    xl: '1280px',
                },
            },

            // Font Sizes
            fontSize: {
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.875rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '3.25rem' }],
                '6xl': ['3.75rem', { lineHeight: '4rem' }],
                'btn-sm': ['0.75rem', { lineHeight: '1rem' }],   // 12px
                'btn': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
                'btn-lg': ['1rem', { lineHeight: '1.5rem' }],    // 16px
                'navbar-link': '0.875rem',
                'submenu-link': '0.875rem',
            },

            // Spacing
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
                'navbar-link': '.8rem',

                'btn-x': '1.2rem',
                'btn-sm-x': '0.75rem',
                'btn-lg-x': '1.5rem',
                'input-x': '0.75rem',

                // Desktop sizes
                'section-sm': '3rem',     // 48px
                'section-md': '4rem',     // 64px  
                'section-default': '6rem', // 96px (changed from 5rem)
                'section-lg': '7.5rem',   // 120px (changed from 6rem)

                // Mobile sizes
                'section-sm-mobile': '3rem',     // 48px
                'section-md-mobile': '4rem',       // 64px
                'section-default-mobile': '5rem',  // 80px (adjusted for proportion)
                'section-lg-mobile': '6rem',    // 96px (adjusted for proportion)
            },

            // Line Height for
            lineHeight: {
                // Desktop sizes
                'btn-h': '38px',
                'btn-h-sm': '30px',
                'btn-h-lg': '46px',

                // Mobile sizes
                'btn-h-mobile': '44px',
                'btn-h-sm-mobile': '36px',
                'btn-h-lg-mobile': '52px',
            },

            // Border Radius
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                DEFAULT: '0.25rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                'full': '9999px',
                'btn': '0.5rem',
                'btn-lg': '0.75rem',
                'input': '0.5rem',
            },

            // Box Shadow
            boxShadow: {
                'soft': '0 2px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                'hard': '0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'primary': '0 10px 15px -3px rgba(51, 144, 255, 0.25), 0 4px 6px -2px rgba(51, 144, 255, 0.125)',
                'secondary': '0 10px 15px -3px rgba(34, 139, 34, 0.25), 0 4px 6px -2px rgba(34, 139, 34, 0.125)',
            },

            // Animation
            animation: {
                // Custom animations from tailwindcss-animate
                "fade-in": "fadeIn 0.6s ease-in-out",
                "fade-in-up": "fadeInUp 0.6s ease-out",
                "fade-in-down": "fadeInDown 0.6s ease-out",
                "fade-in-left": "fadeInLeft 0.6s ease-out",
                "fade-in-right": "fadeInRight 0.6s ease-out",
                "scale-in": "scaleIn 0.5s ease-out",
                "slide-up": "slideUp 0.6s ease-out",
                "bounce-in": "bounceIn 0.8s ease-out",
                "rotate-in": "rotateIn 0.6s ease-out"
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                rotateIn: {
                    '0%': { opacity: '0', transform: 'rotate(-200deg)' },
                    '100%': { opacity: '1', transform: 'rotate(0)' }
                }
            },

            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        // Base styles for all screen sizes
                        'h1, h2, h3, h4, h5, h6': {
                            marginTop: '1em !important',
                            marginBottom: '.6em !important',
                        },
                        'h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child': {
                            marginTop: '0 !important',
                        },
                    },
                },
                lg: {
                    css: {
                        'h2, h3, h4, h5, h6': {
                            fontSize: theme('fontSize.2xl'),
                            lineHeight: theme('lineHeight.8'),
                        },
                    },
                },
            }),

        },
    },
    plugins: [
        components.buttons,
        components.navbar,
        components.footer,
        rtl,
        typography,
        require('@tailwindcss/forms')({
            strategy: 'base',
        }),
    ],
}