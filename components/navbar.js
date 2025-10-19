/* eslint-disable @typescript-eslint/no-require-imports */
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents, theme }) {
    addComponents({

        /* ====================
        ICON BUTTON
        ==================== */
        '.te-navbar-icon-button': {
            position: 'relative',
            display: 'flex',
            width: '2.5rem',
            height: '2.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme('spacing.2'),
            borderRadius: theme('borderRadius.lg'),
            color: theme('colors.gray.600'),
            border: `1px solid ${theme('colors.gray.200')}`,
            backgroundColor: 'transparent',
            cursor: 'pointer',

            '@media (hover: hover)': {
                '&:hover': {
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: theme('colors.gray.100'),
                },
            },

            '&:focus': {
                transition: 'all 0.2s ease-in-out',
                backgroundColor: theme('colors.gray.100'),
            },

            '.dark &': {
                color: theme('colors.gray.300'),
                borderColor: theme('colors.gray.700'),

                '@media (hover: hover)': {
                    '&:hover': {
                        transition: 'all 0.2s ease-in-out',
                        backgroundColor: theme('colors.gray.700'),
                        borderColor: theme('colors.gray.700'),
                    },
                },

                '&:focus': {
                    transition: 'all 0.2s ease-in-out',
                    backgroundColor: theme('colors.gray.700'),
                    borderColor: theme('colors.gray.700'),
                }
            }
        },

        /* ====================
           NAVIGATION COMPONENTS
        ==================== */
        '.te-navbar-nav': {
            display: 'flex',
            alignItems: 'center',
        },

        '.te-navbar-nav-mobile': {
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: `1px solid ${theme('colors.gray.200')}`,
            padding: theme('spacing.4'),
            transform: 'translateY(-100%)',
            opacity: '0',
            visibility: 'hidden',
            zIndex: '-1',
            transition: 'all 0.3s ease-in-out',
            boxShadow: theme('boxShadow.lg'),
            borderRadius: `0 0 ${theme('borderRadius.xl')} ${theme('borderRadius.xl')}`,

            [`@media (min-width: ${theme('screens.lg')})`]: {
                display: 'none',
            },
            '&.te-navbar-nav-mobile-show': {
                transform: 'translateY(0)',
                opacity: '1',
                visibility: 'visible',

            },
            '.dark &': {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                borderTopColor: theme('colors.gray.700'),
            }
        },

        '.te-navbar-nav-mobile-content': {
            display: 'flex',
            flexDirection: 'column',
            gap: theme('spacing.2'),
        },

        '.te-navbar-link': {
            display: 'flex',
            alignItems: 'center',
            padding: theme('spacing.navbar-link'),
            borderRadius: theme('borderRadius.lg'),
            fontSize: theme('fontSize.navbar-link'),
            fontWeight: theme('fontWeight.semibold'),
            color: theme('colors.gray.700'),
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            '&:hover': {
                color: theme('colors.primary.400'),
            },
            '&.te-navbar-link-active': {
                color: theme('colors.primary.400'),
            },
            '.dark &': {
                color: theme('colors.gray.200'),
                '&:hover': {
                    color: theme('colors.primary.200'),
                },
                '&.te-navbar-link-active': {
                    color: theme('colors.primary.200'),
                }
            }
        },

        '.te-navbar-submenu-link': {
            display: 'flex',
            alignItems: 'center',
            padding: theme('spacing.2'),
            fontSize: theme('fontSize.submenu-link'),
            fontWeight: theme('fontWeight.normal'),
            color: theme('colors.gray.600'),
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            position: 'relative',
            borderBottom: `1px solid ${theme('colors.gray.200')}`,

            '&:last-child': {
                borderBottom: 'none',
            },
            '&:hover': {
                color: theme('colors.primary.600'),
            },
            '&.te-navbar-submenu-link-active': {
                color: theme('colors.primary.600'),
                backgroundColor: theme('colors.primary.50'),
            },

            // Dark mode overrides
            '.dark &': {
                color: theme('colors.gray.300'),
                borderColor: theme('colors.gray.700'),
                '&:hover, &.te-navbar-submenu-link-active': {
                    color: theme('colors.primary.400'),
                },
            },
        },


        '.te-navbar-link-mobile': {
            padding: `${theme('spacing.2')}`,
            borderBottom: `1px solid ${theme('colors.gray.200')}`,
            '&:hover': {
                color: `${theme('colors.primary.100')}`,
            },
            '&.te-navbar-link-active': {
                color: `${theme('colors.primary.100')}`,
                fontWeight: theme('fontWeight.semibold'),
                '&::after': {
                    display: 'none',
                }
            },
            '&:last-of-type': {
                borderBottom: 'none',
            },
            '.dark &': {
                borderBottomColor: theme('colors.gray.700'),
                '&:last-of-type': {
                    borderBottom: 'none',
                }
            }
        },

        /* ====================
           DROPDOWN COMPONENTS
        ==================== */
        '.te-navbar-dropdown': {
            position: 'relative',
        },

        '.te-navbar-dropdown-content': {
            position: 'absolute',
            top: 'calc(100% + .5rem)',
            insetInlineEnd: '0',
            minWidth: '18rem', // default = mobile
            backgroundColor: theme('colors.white'),
            border: `1px solid ${theme('colors.gray.200')}`,
            borderRadius: theme('borderRadius.lg'),
            boxShadow: theme('boxShadow.lg'),
            padding: theme('spacing.2'),
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateY(-0.5rem)',
            transition: 'all 0.2s ease-in-out',
            zIndex: '50',

            '&.te-dropdown-show': {
                opacity: '1',
                visibility: 'visible',
                transform: 'translateY(0)',
            },

            '.dark &': {
                backgroundColor: theme('colors.gray.800'),
                borderColor: theme('colors.gray.600'),
            },

            // 👇 larger screens (lg and up)
            [`@media (min-width: ${theme('screens.lg')})`]: {
                minWidth: '20rem',
            }
        },

        '.te-navbar-dropdown-item': {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
            borderRadius: theme('borderRadius.md'),
            fontSize: theme('fontSize.sm'),
            color: theme('colors.gray.700'),
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                backgroundColor: theme('colors.gray.100'),
                color: theme('colors.primary.600'),
            },
            '.dark &': {
                color: theme('colors.gray.200'),
                '&:hover': {
                    backgroundColor: theme('colors.gray.700'),
                    color: theme('colors.primary.400'),
                }
            }
        },

        '.te-navbar-dropdown-separator': {
            height: '1px',
            backgroundColor: theme('colors.gray.200'),
            margin: `${theme('spacing.2')} 0`,
            '.dark &': {
                backgroundColor: theme('colors.gray.600'),
            }
        },

        /* ====================
           SUBMENU COMPONENTS
        ==================== */
        '.te-navbar-submenu': {
            position: 'relative',
        },

        '.te-navbar-submenu-content': {
            position: 'absolute',
            top: '100%',
            insetInlineStart: '0',
            minWidth: '12rem',
            backgroundColor: theme('colors.white'),
            border: `1px solid ${theme('colors.gray.200')}`,
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            borderBottomLeftRadius: theme('borderRadius.lg'),
            borderBottomRightRadius: theme('borderRadius.lg'),
            boxShadow: theme('boxShadow.lg'),
            padding: theme('spacing.2'),
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateY(-0.5rem)',
            transition: 'all 0.2s ease-in-out',
            zIndex: '50',
            '&.te-submenu-show': {
                opacity: '1',
                visibility: 'visible',
                transform: 'translateY(0)',
            },
            '.dark &': {
                backgroundColor: theme('colors.gray.800'),
                borderColor: theme('colors.gray.600'),
            }
        },

        '.te-navbar-submenu-item': {
            display: 'block',
            width: '100%',
            padding: `${theme('spacing.2')} ${theme('spacing.3')}`,
            borderRadius: theme('borderRadius.md'),
            fontSize: theme('fontSize.sm'),
            color: theme('colors.gray.600'),
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                backgroundColor: theme('colors.gray.100'),
                color: theme('colors.primary.600'),
            },
            '.dark &': {
                color: theme('colors.gray.300'),
                '&:hover': {
                    backgroundColor: theme('colors.gray.700'),
                    color: theme('colors.primary.400'),
                }
            }
        },

        '.te-navbar-link-has-submenu': {
            '&::after': {
                content: '""',
                marginInlineStart: theme('spacing.2'),
                width: '16px',
                height: '16px',
                backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                transition: 'all 0.2s ease-in-out',
            },
        },

        '.te-header-transparent .te-navbar-link-has-submenu': {
            '&::after': {
                filter: 'invert(100%)',
            },
        },


        /* ====================
   MEGA MENU COMPONENTS
==================== */
        '.te-navbar-mega-menu': {
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '100%',
            backgroundColor: theme('colors.white'),
            border: `1px solid ${theme('colors.gray.200')}`,
            borderRadius: `0 0 ${theme('borderRadius.lg')} ${theme('borderRadius.lg')} `,
            boxShadow: theme('boxShadow.sm'),
            padding: `${theme('spacing.6')} ${theme('spacing.8')} ${theme('spacing.4')}`,
            opacity: '0',
            visibility: 'hidden',
            transform: 'translateX(-50%) translateY(-0.5rem)',
            transition: 'all 0.3s ease-in-out',
            zIndex: '50',

            '&.te-mega-menu-show': {
                opacity: '1',
                visibility: 'visible',
                transform: 'translateX(-50%) translateY(0)',
            },

            '.dark &': {
                backgroundColor: theme('colors.gray.800'),
                borderColor: theme('colors.gray.600'),
            }
        },

        '.te-navbar-mega-menu-grid': {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: theme('spacing.12'),
        },

        '.te-navbar-mega-menu-column': {
            display: 'flex',
            flexDirection: 'column',
        },

        '.te-navbar-mega-menu-title': {
            fontSize: theme('fontSize.sm'),
            fontWeight: theme('fontWeight.bold'),
            color: theme('colors.gray.900'),
            marginBottom: theme('spacing.3'),
            paddingBottom: theme('spacing.2'),
            borderBottom: `2px solid ${theme('colors.gray.200')}`,
            '.dark &': {
                color: theme('colors.gray.100'),
                borderBottomColor: theme('colors.gray.600'),
            }
        },

        '.te-navbar-mega-menu-link': {
            display: 'flex',
            alignItems: 'center',
            padding: `${theme('spacing.2')} 0`,
            fontSize: theme('fontSize.sm'),
            color: theme('colors.gray.600'),
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                color: theme('colors.primary.600'),
            },
            '.dark &': {
                color: theme('colors.gray.300'),
                '&:hover': {
                    color: theme('colors.primary.400'),
                }
            }
        },

        '.te-navbar-link-has-mega-menu': {
            '&::after': {
                content: '""',
                marginInlineStart: theme('spacing.2'),
                width: '16px',
                height: '16px',
                backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                transition: 'all 0.2s ease-in-out',
            },
        },
        '.te-header-transparent .te-navbar-link-has-mega-menu': {
            '&::after': {
                filter: 'invert(100%)',
            },
        },

        /* ====================
   MEGA MENU GRID VARIANTS
==================== */
        '.te-navbar-mega-menu-1-col .te-navbar-mega-menu-grid': {
            gridTemplateColumns: '1fr',
            [`@media (max-width: ${theme('screens.sm')})`]: {
                gridTemplateColumns: '1fr',
            }
        },

        '.te-navbar-mega-menu-2-col .te-navbar-mega-menu-grid': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            [`@media (max-width: ${theme('screens.sm')})`]: {
                gridTemplateColumns: '1fr',
            }
        },

        '.te-navbar-mega-menu-3-col .te-navbar-mega-menu-grid': {
            gridTemplateColumns: 'repeat(3, 1fr)',
            [`@media (max-width: ${theme('screens.md')})`]: {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            [`@media (max-width: ${theme('screens.sm')})`]: {
                gridTemplateColumns: '1fr',
            }
        },

        '.te-navbar-mega-menu-4-col .te-navbar-mega-menu-grid': {
            gridTemplateColumns: 'repeat(4, 1fr)',
            [`@media (max-width: ${theme('screens.lg')})`]: {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            [`@media (max-width: ${theme('screens.sm')})`]: {
                gridTemplateColumns: '1fr',
            }
        },

        /* Responsive width adjustments */
        '.te-navbar-mega-menu-1-col': {
            width: '20rem',
        },

        '.te-navbar-mega-menu-2-col': {
            width: '48rem',
        },

        '.te-navbar-mega-menu-3-col': {
            width: '64rem',
        },

        '.te-navbar-mega-menu-4-col': {
            width: '64rem',
            [`@media (max-width: ${theme('screens.xl')})`]: {
                width: '48rem',
            }
        },


        /* ====================
       Mobile Sub Menu
     ==================== */
        '.te-navbar-link-mobile-has-submenu': {
            position: 'relative',
            display: 'block',
            borderBottom: `1px solid ${theme('colors.gray.200')} !important`,
            '&::after': {
                content: '""',
                position: 'absolute',
                insetInlineEnd: theme('spacing.1'),
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                transition: 'transform 0.2s ease-in-out',
            },
            '&.te-mobile-submenu-open::after': {
                transform: 'translateY(-50%) rotate(180deg)',
            },

            '.dark &': {
                borderBottom: `1px solid ${theme('colors.gray.700')} !important`, // new dark border
            },

            '.dark &::after': {
                filter: 'invert(100%)',
            }
        },

        '.te-navbar-submenu-mobile': {
            maxHeight: '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-in-out',

            '&.te-submenu-mobile-open': {
                maxHeight: '500px',
            }
        },

        '.te-navbar-submenu-mobile-link': {
            display: 'block',
            padding: `${theme('spacing.2')} ${theme('spacing.6')}`,
            fontSize: theme('fontSize.sm'),
            color: theme('colors.gray.600'),
            textDecoration: 'none',

            '&:last-child': {
                borderBottom: 'none',
            },
            '&:hover': {
                color: theme('colors.primary.600'),
            },
            '&.te-navbar-submenu-mobile-link-active': {
                color: theme('colors.primary.600'),
            },
            '.dark &': {
                color: theme('colors.gray.300'),
                '&:hover': {
                    color: theme('colors.primary.400'),
                },
                '&.te-navbar-submenu-mobile-link-active': {
                    color: theme('colors.primary.400'),
                }
            }
        },

    });
});