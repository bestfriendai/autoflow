/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./index.html"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        automotive: {
          red: "#e53e3e",
          darkRed: "#c53030",
          orange: "#ff8c00",
          yellow: "#ffd700",
          green: "#32cd32",
          blue: "#1e90ff",
          purple: "#9370db",
          black: "#0f0f0f",
          darkGray: "#1a1a1a",
          mediumGray: "#2d2d2d",
          lightGray: "#404040",
        },
        neon: {
          red: "#ff073a",
          orange: "#ff8c00",
          yellow: "#ffff00",
          green: "#39ff14",
          blue: "#00ffff",
          purple: "#bf00ff",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(229, 62, 62, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(229, 62, 62, 0.6)" },
        },
        "neon-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor" 
          },
          "50%": { 
            boxShadow: "0 0 20px currentColor, 0 0 40px currentColor, 0 0 80px currentColor" 
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "glow-rotate": "glow-rotate 4s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          'text-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
        },
        '.backdrop-blur-premium': {
          'backdrop-filter': 'blur(20px) saturate(180%)',
        },
        '.border-glow': {
          'box-shadow': '0 0 10px currentColor, inset 0 0 10px currentColor',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}