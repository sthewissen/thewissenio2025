/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
			  brand: {
				extra: '#f2fcfa',
				light: '#31ceaf', // light variant
				DEFAULT: '#1cba9b', // main brand color
				dark: '#19a489', // dark variant
			  },
			  'custom-gray': '#606060',
			},
			fontFamily: {
				sans: ['Figtree', 'sans-serif'], // This makes Nunito the default sans-serif font
				header: ['Gabarito', 'sans-serif'],  // This makes Gabarito the default header font
			},
		}
	},
	plugins: [
	  function ({ addComponents, theme }) {
		addComponents({
		  '::selection': {
			backgroundColor: '#31ceaf', // Background color when highlighted
			color: '#ffffff', // Text color when highlighted
		  },
		});
	  },
	],
}
