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
        },
        nepred: {
          50: '#FDF2F0',
          100: '#FCE4E1',
          500: '#DC351C',
          600: '#B83A24',
          700: '#942B18',
          800: '#752011',
        },
        nepgreen: {
          50: '#F1F7F4',
          100: '#DFEDE6',
          600: '#2A6F4E',
          700: '#1F533A',
          800: '#173E2B',
          900: '#102C1E',
        },
        nepbrown: {
          50: '#F9F5F2',
          100: '#EFE7E1',
          500: '#A46343',
          600: '#8C5033',
          700: '#6E3C24',
          800: '#522A17',
        },
        nepgold: {
          100: '#FEF3C7',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'arch': '120px 120px 0 0',
      }
    },
  },
  plugins: [],
};
export default config;
