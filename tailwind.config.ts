/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html"
	],
	theme: {
		extend: {
			screens: {
				xs: "var(--breakpoint-xs)",   // 480px
				sm: "var(--breakpoint-sm)",   // 640px
				md: "var(--breakpoint-md)",   // 768px
				lg: "var(--breakpoint-lg)",   // 1024px
				xl: "var(--breakpoint-xl)",   // 1280px
				"2xl": "var(--breakpoint-2xl)", // 1536px
				"3xl": "var(--breakpoint-3xl)", // 1920px
			},

			fontSize: {
				xs: "var(--text-xs)",
				sm: "var(--text-sm)",
				base: "var(--text-base)",
				lg: "var(--text-lg)",
				xl: "var(--text-xl)",
				"2xl": "var(--text-2xl)",
				"3xl": "var(--text-3xl)",
				"4xl": "var(--text-4xl)",
				"5xl": "var(--text-5xl)",
				"6xl": "var(--text-6xl)",
				"7xl": "var(--text-7xl)",
				"8xl": "var(--text-8xl)",
				"9xl": "var(--text-9xl)",
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)'
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)'
				},
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				chart: {
					'1': 'var(--chart-1)',
					'2': 'var(--chart-2)',
					'3': 'var(--chart-3)',
					'4': 'var(--chart-4)',
					'5': 'var(--chart-5)'
				}
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
	],
};