import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5EFE6',
          200: '#EBDDC9',
          300: '#DEC9A8',
          400: '#CDB793',
        },
        nepred: {
          50: '#FDF2F0',
          100: '#FCE4E1',
          500: '#DC351C',
          600: '#B83A24',
          700: '#942B18',
          800: '#752011',
          900: '#54150A',
        },
        nepgreen: {
          50: '#F1F7F4',
          100: '#DFEDE6',
          600: '#2A6F4E',
          700: '#1F533A',
          800: '#173E2B',
          900: '#0E291C',
        },
        nepbrown: {
          50: '#F9F5F2',
          100: '#EFE7E1',
          500: '#A46343',
          600: '#8C5033',
          700: '#6E3C24',
          800: '#522A17',
          900: '#381B0E',
        },
        nepgold: {
          50: '#FFFDF5',
          100: '#FEF3C7',
          400: '#F59E0B',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#926A08',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', '"Lora"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
        han: ['"Ma Shan Zheng"', '"ZCOOL XiaoWei"', '"Noto Serif SC"', 'serif'],
      },
      borderRadius: {
        'arch': '140px 140px 0 0',
      }
    },
  },
  plugins: [],
};
export default config;
