/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
			  brand: {
				// Yellow Variant
				// extra: '#FFFBF0',
				// light: '#EAB308', // light variant
				// DEFAULT: '#EAB308', // main brand color
				// dark: '#EAB308', // dark variant
				// Green Variant
				extra: '#f2fcfa',
				light: '#e5f5f2', // light variant
				DEFAULT: '#1cba9b', // main brand color
				dark: '#117d67', // dark variant
			  },
			  'custom-gray': '#606060',
			},
			fontFamily: {
				sans: ['Figtree', 'sans-serif'], // This makes Nunito the default sans-serif font
				header: ['Gabarito', 'sans-serif'],  // This makes Gabarito the default header font
			},
			typography: {
				DEFAULT: {
					css: {
						color: '#606060',
						li: {
							'&::marker': {
								color: '#606060', // Bullet color
							},
						},
						'img + em': {
							textAlign: 'center',
							display: 'block',
							fontSize: '0.9rem',
							marginTop: '-1.5rem',
						},
						a: {
							background: 'linear-gradient(to bottom, transparent 62%, #e5f5f2 0) center 100% no-repeat',
							color: '#111827',
							fontWeight: '600',
							textDecoration: 'none',
							'&:hover': {
								cursor: 'pointer',
								background: 'linear-gradient(to bottom, transparent 62%, #b9efe4 0) center 100% no-repeat',
								textDecoration: 'none',
							},
							'&::after': {
								color: '#1cba9b',
								content: '" →"',
							}
						},
						code: {
							backgroundColor: '#e5f5f2', // Light gray background
							color: '#19a489', // Text color for code
							borderRadius: '4px',
							padding: '4px',
							fontSize: '0.9em',
							fontFamily: 'monospace', // Use monospace font
						},
						// Remove `backticks` from rendered code
						'code::before': { content: '""' },
						'code::after': { content: '""' }
					},
				},
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
		  "article img": {
			marginLeft: 'auto',
			marginRight: 'auto'
		  }
		});
	  },
	  require('@tailwindcss/typography')
	],
}
