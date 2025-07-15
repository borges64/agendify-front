/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // Adicione seu breakpoint customizado aqui
        'customMd': '990px', // As classes como customMd:flex, customMd:hidden serão aplicadas a partir de 800px
      },
      colors: {
        pastel: {
          light: '#F3E5F5', // Um lilás bem claro
          DEFAULT: '#E1BEE7', // Um lilás um pouco mais forte
          dark: '#CE93D8', // Um lilás mais escuro
          yellowLight: '#FFD700', // Amarelo mais vibrante (Ouro)
        },
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
