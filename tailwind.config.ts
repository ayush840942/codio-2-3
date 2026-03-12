
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: [
          'Itim',
          'Patrick Hand',
          'Nunito',
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        draw: ['Patrick Hand', 'cursive'],
        display: [
          'Itim',
          'Montserrat',
          'Poppins',
          'system-ui',
          'sans-serif'
        ],
        mono: [
          'SF Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ]
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        'drawn': '2.5px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        purple: {
          50: 'hsl(249 100% 97%)',
          100: 'hsl(249 100% 95%)',
          200: 'hsl(250 90% 90%)',
          300: 'hsl(250 85% 80%)',
          400: 'hsl(250 80% 70%)',
          500: 'hsl(250 70% 60%)',
          600: 'hsl(250 70% 50%)',
          700: 'hsl(250 70% 40%)',
          800: 'hsl(250 60% 30%)',
          900: 'hsl(250 50% 20%)'
        },
        lavender: {
          50: 'hsl(249 100% 98%)',
          100: 'hsl(249 100% 96%)',
          200: 'hsl(249 90% 92%)',
          300: 'hsl(249 80% 85%)',
          400: 'hsl(249 70% 75%)',
          500: 'hsl(249 60% 65%)'
        },
        puzzle: {
          purple: 'hsl(250 70% 60%)',
          blue: 'hsl(220 90% 60%)',
          green: 'hsl(160 70% 45%)',
          yellow: 'hsl(45 95% 55%)',
          red: 'hsl(0 84% 60%)',
          orange: 'hsl(25 95% 55%)',
          pink: 'hsl(340 80% 65%)'
        },
        difficulty: {
          easy: 'hsl(160 70% 45%)',
          medium: 'hsl(45 95% 55%)',
          hard: 'hsl(0 84% 60%)'
        },
        // Concept Capers inspired colors
        cc: {
          blue: '#8cccf2',
          pink: '#f2a6c1',
          green: '#a6f2c1',
          yellow: '#f2e8a6',
          purple: '#bca6f2',
          orange: '#f2c1a6',
        },
        pastel: {
          blue: '#E0F2FE',
          pink: '#FCE7F3',
          green: '#DCFCE7',
          yellow: '#FEF9C3',
          purple: '#F5F3FF',
          orange: '#FFEDD5',
        }
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        '4xl': '3rem',
        '5xl': '4rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'soft': '0 4px 20px -4px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 8px 30px -6px rgba(0, 0, 0, 0.08)',
        'studypal': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'comic': '4px 4px 0px 0px rgba(0, 0, 0, 0.15)',
        'comic-sm': '2px 2px 0px 0px rgba(0, 0, 0, 0.15)',
        'comic-lg': '8px 8px 0px 0px rgba(0, 0, 0, 0.15)',
        'comic-hover': '6px 6px 0px 0px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-in-right': {
          from: { transform: 'translateX(20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' }
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px hsl(250 70% 60% / 0.3)' },
          '50%': { boxShadow: '0 0 25px hsl(250 70% 60% / 0.6)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' }
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'squishy': {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.1, 0.9)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'squishy': 'squishy 1.5s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
