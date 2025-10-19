/* eslint-disable @typescript-eslint/no-require-imports */
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents, theme }) {
    addComponents({

        /* Base Buttons */
        '.te-btn': {
            paddingLeft: `${theme('spacing.btn-x')}`,
            paddingRight: `${theme('spacing.btn-x')}`,
            borderRadius: theme('borderRadius.btn'),
            fontSize: theme('fontSize.btn'),
            fontWeight: theme('fontWeight.semibold'),
            lineHeight: theme('lineHeight.btn-h'),
            transform: 'translateY(0)',
            transition: 'all 0.2s',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid transparent',

            [`@media (max-width: ${theme('screens.lg')})`]: {
                lineHeight: theme('lineHeight.btn-h-mobile'),
            },

            '&:focus': {
                outline: 'none',
                //boxShadow: `0 0 0 3px ${theme('colors.primary.200')}`,
            },
            // Dark mode focus
            '.dark &:focus': {
                //boxShadow: `0 0 0 3px ${theme('colors.primary.800')}`,
            }
        },

        '.te-btn-sm': {
            paddingLeft: `${theme('spacing.btn-sm-x')}`,
            paddingRight: `${theme('spacing.btn-sm-x')}`,
            lineHeight: theme('lineHeight.btn-h-sm'),
            fontSize: theme('fontSize.btn-sm'),

            [`@media (max-width: ${theme('screens.lg')})`]: {
                lineHeight: theme('lineHeight.btn-h-sm-mobile'),
            },
        },

        '.te-btn-lg': {
            paddingLeft: `${theme('spacing.btn-lg-x')}`,
            paddingRight: `${theme('spacing.btn-lg-x')}`,
            lineHeight: theme('lineHeight.btn-h-lg'),
            fontSize: theme('fontSize.btn-lg'),
            borderRadius: theme('borderRadius.btn-lg'),

            [`@media (max-width: ${theme('screens.lg')})`]: {
                lineHeight: theme('lineHeight.btn-h-lg-mobile'), // Mobile only - 56px
            },
        },

        /* Primary Button */
        '.te-btn-primary': {
            backgroundColor: theme('colors.primary.500'),
            color: theme('colors.white'),
            '&:hover:not(:disabled)': {
                backgroundColor: theme('colors.primary.400'),
                transform: 'translateY(-2px)',
                //boxShadow: theme('boxShadow.primary'),
            },
            '&:active:not(:disabled)': {
                backgroundColor: theme('colors.primary.700'),
                transform: 'translateY(0)',
            },
            // Dark mode styles
            '.dark &': {
                backgroundColor: theme('colors.primary.300'),
                '&:hover:not(:disabled)': {
                    backgroundColor: theme('colors.primary.500'),
                },
                '&:active:not(:disabled)': {
                    backgroundColor: theme('colors.primary.500'),
                }
            }
        },

        /* Secondary Button */
        '.te-btn-secondary': {
            backgroundColor: theme('colors.secondary.500'),
            color: theme('colors.white'),
            '&:hover:not(:disabled)': {
                backgroundColor: theme('colors.secondary.600'),
                transform: 'translateY(-2px)',
                //boxShadow: theme('boxShadow.secondary'),
            },
            '&:active:not(:disabled)': {
                backgroundColor: theme('colors.secondary.700'),
                transform: 'translateY(0)',
            },
            '&:focus': {
                outline: 'none',
                //boxShadow: `0 0 0 3px ${theme('colors.secondary.200')}`,
            },
            // Dark mode styles
            '.dark &': {
                backgroundColor: theme('colors.secondary.300'),
                '&:hover:not(:disabled)': {
                    backgroundColor: theme('colors.secondary.500'),
                },
                '&:active:not(:disabled)': {
                    backgroundColor: theme('colors.secondary.500'),
                },
            }
        },

        /* Default Button */
        '.te-btn-default': {
            backgroundColor: 'transparent',
            border: `2px solid ${theme('colors.gray.300')}`,
            color: theme('colors.gray.700'),
            '&:hover:not(:disabled)': {
                backgroundColor: theme('colors.gray.50'),
                borderColor: theme('colors.gray.400'),
                transform: 'translateY(-2px)',
                //boxShadow: theme('boxShadow.lg'),
            },
            '&:active:not(:disabled)': {
                backgroundColor: theme('colors.gray.100'),
                transform: 'translateY(0)',
            },
            '&:focus': {
                outline: 'none',
                //boxShadow: `0 0 0 3px ${theme('colors.gray.200')}`,
            },
            // Dark mode styles
            '.dark &': {
                borderColor: theme('colors.gray.600'),
                color: theme('colors.gray.200'),
                '&:hover:not(:disabled)': {
                    backgroundColor: theme('colors.gray.800'),
                    borderColor: theme('colors.gray.500'),
                },
                '&:active:not(:disabled)': {
                    backgroundColor: theme('colors.gray.700'),
                },
                '&:focus': {
                    boxShadow: `0 0 0 3px ${theme('colors.gray.700')}`,
                }
            }
        },

        /* Disabled States */
        '.te-btn:disabled': {
            backgroundColor: theme('colors.gray.300'),
            color: theme('colors.gray.500'),
            borderColor: theme('colors.gray.300'),
            cursor: 'not-allowed',
            opacity: '0.6',
            '&:hover': {
                backgroundColor: theme('colors.gray.300'),
                borderColor: theme('colors.gray.300'),
                transform: 'translateY(0)',
                //boxShadow: theme('boxShadow.medium'),
            },
            // Dark mode disabled
            '.dark &': {
                backgroundColor: theme('colors.gray.700'),
                color: theme('colors.gray.400'),
                borderColor: theme('colors.gray.700'),
                '&:hover': {
                    backgroundColor: theme('colors.gray.700'),
                    borderColor: theme('colors.gray.700'),
                }
            }
        },

        /* Gradient Buttons */
        '.te-btn-primary-gradient': {
            background: `linear-gradient(135deg, ${theme('colors.primary.500')} 0%, ${theme('colors.primary.600')} 100%)`,
            color: theme('colors.white'),
            position: 'relative',
            overflow: 'hidden',
            zIndex: '1',
            border: 'none',
            '&::before': {
                content: '""',
                position: 'absolute',
                inset: '0',
                background: `linear-gradient(135deg, ${theme('colors.primary.600')} 0%, ${theme('colors.primary.700')} 100%)`,
                opacity: '0',
                transition: 'opacity 0.2s ease-in-out',
                zIndex: '-1',
            },
            '&:hover:not(:disabled)::before': {
                opacity: '1',
            },
            '&:hover:not(:disabled)': {
                transform: 'translateY(-2px)',
                boxShadow: `${theme('boxShadow.lg')}, 0 10px 20px rgba(59, 130, 246, 0.3)`,
            },
            '&:active:not(:disabled)': {
                transform: 'translateY(0)',
                '&::before': {
                    background: `linear-gradient(135deg, ${theme('colors.primary.700')} 0%, ${theme('colors.primary.800')} 100%)`,
                }
            },
            '& > *': {
                position: 'relative',
                zIndex: '1',
            },
            // Dark mode gradient
            '.dark &': {
                background: `linear-gradient(135deg, ${theme('colors.primary.600')} 0%, ${theme('colors.primary.700')} 100%)`,
                '&::before': {
                    background: `linear-gradient(135deg, ${theme('colors.primary.500')} 0%, ${theme('colors.primary.600')} 100%)`,
                },
                '&:hover:not(:disabled)': {
                    boxShadow: `${theme('boxShadow.lg')}, 0 10px 20px rgba(59, 130, 246, 0.4)`,
                },
                '&:active:not(:disabled)': {
                    '&::before': {
                        background: `linear-gradient(135deg, ${theme('colors.primary.400')} 0%, ${theme('colors.primary.500')} 100%)`,
                    }
                }
            }
        },

        '.te-btn-secondary-gradient': {
            background: `linear-gradient(135deg, ${theme('colors.secondary.500')} 0%, ${theme('colors.secondary.600')} 100%)`,
            color: theme('colors.white'),
            position: 'relative',
            overflow: 'hidden',
            zIndex: '1',
            border: 'none',
            '&::before': {
                content: '""',
                position: 'absolute',
                inset: '0',
                background: `linear-gradient(135deg, ${theme('colors.secondary.600')} 0%, ${theme('colors.secondary.700')} 100%)`,
                opacity: '0',
                transition: 'opacity 0.2s ease-in-out',
                zIndex: '-1',
            },
            '&:hover:not(:disabled)::before': {
                opacity: '1',
            },
            '&:hover:not(:disabled)': {
                transform: 'translateY(-2px)',
                boxShadow: `${theme('boxShadow.lg')}, 0 10px 20px rgba(5, 150, 105, 0.3)`,
            },
            '&:active:not(:disabled)': {
                transform: 'translateY(0)',
                '&::before': {
                    background: `linear-gradient(135deg, ${theme('colors.secondary.700')} 0%, ${theme('colors.secondary.800')} 100%)`,
                }
            },
            '& > *': {
                position: 'relative',
                zIndex: '1',
            },
            // Dark mode gradient
            '.dark &': {
                background: `linear-gradient(135deg, ${theme('colors.secondary.600')} 0%, ${theme('colors.secondary.700')} 100%)`,
                '&::before': {
                    background: `linear-gradient(135deg, ${theme('colors.secondary.500')} 0%, ${theme('colors.secondary.600')} 100%)`,
                },
                '&:hover:not(:disabled)': {
                    boxShadow: `${theme('boxShadow.lg')}, 0 10px 20px rgba(5, 150, 105, 0.3)`,
                },
                '&:active:not(:disabled)': {
                    '&::before': {
                        background: `linear-gradient(135deg, ${theme('colors.secondary.400')} 0%, ${theme('colors.secondary.500')} 100%)`,
                    }
                }
            }
        },

    });
});