/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.php',
    './assets/js/**/*.js',
    './template-parts/**/*.php',
    './inc/**/*.php',
    './page-templates/**/*.php'
  ],
  
  theme: {
    extend: {
      // Custom colors for photography theme
      colors: {
        primary: {
          50: '#f8f9ff',
          100: '#e8eaff',
          200: '#d6dbff',
          300: '#b4c0ff',
          400: '#8c9eff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        gold: {
          50: '#fefdf7',
          100: '#fef9e7',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      
      // Custom fonts
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      
      // Photography-specific aspect ratios
      aspectRatio: {
        'photo': '3/2',
        'portrait': '2/3',
        'square': '1/1',
        'wide': '16/9',
        'ultra-wide': '21/9'
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'zoom-in': 'zoomIn 0.3s ease-out',
        'zoom-out': 'zoomOut 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite'
      },
      
      // Custom keyframes
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
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        zoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' }
        }
      },
      
      // Custom screens (breakpoints)
      screens: {
        'xs': '475px',
        '3xl': '1600px'
      },
      
      // Custom container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px'
        }
      },
      
      // Custom box shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'large': '0 10px 50px -12px rgba(0, 0, 0, 0.15), 0 20px 40px -12px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
      },
      
      // Custom backdrop blur
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class' // Use class strategy to avoid conflicts
    }),
    require('@tailwindcss/typography')({
      className: 'prose'
    }),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom plugin for photography-specific utilities
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        // Image overlay utilities
        '.image-overlay': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            transition: 'opacity 0.3s ease',
            zIndex: '1'
          }
        },
        '.image-overlay-hover': {
          '&:hover::before': {
            opacity: '0'
          }
        },
        
        // Text gradients
        '.text-gradient': {
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        },
        
        // Scroll snap utilities
        '.scroll-snap-x': {
          scrollSnapType: 'x mandatory'
        },
        '.scroll-snap-child': {
          scrollSnapAlign: 'start'
        }
      }
      
      const newComponents = {
        // Portfolio card component
        '.portfolio-card': {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.soft'),
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme('boxShadow.large')
          }
        },
        
        // Button components
        '.btn-primary': {
          backgroundColor: theme('colors.primary.600'),
          color: theme('colors.white'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.lg'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme('colors.primary.700'),
            transform: 'translateY(-1px)'
          }
        },
        
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.primary.600'),
          border: `2px solid ${theme('colors.primary.600')}`,
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.lg'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
            color: theme('colors.white')
          }
        }
      }
      
      addUtilities(newUtilities)
      addComponents(newComponents)
    }
  ]
}