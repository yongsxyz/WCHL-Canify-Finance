
import type { Config } from "tailwindcss";

export default {
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
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
			},
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
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
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					}
				},
				'rotate': {
					'0%': {
						transform: 'rotate(0deg)',
					},
					'100%': {
						transform: 'rotate(360deg)',
					}
				},
				'wander-left': {
					'0%': {
						transform: 'translate(-20px, -30px) rotate(0deg)',
					},
					'25%': {
						transform: 'translate(-60px, -10px) rotate(90deg)',
					},
					'50%': {
						transform: 'translate(-40px, -50px) rotate(180deg)',
					},
					'75%': {
						transform: 'translate(-80px, -20px) rotate(270deg)',
					},
					'100%': {
						transform: 'translate(-20px, -30px) rotate(360deg)',
					}
				},
				'wander-right': {
					'0%': {
						transform: 'translate(10px, 15px) rotate(0deg)',
					},
					'25%': {
						transform: 'translate(50px, -5px) rotate(90deg)',
					},
					'50%': {
						transform: 'translate(30px, 35px) rotate(180deg)',
					},
					'75%': {
						transform: 'translate(70px, 5px) rotate(270deg)',
					},
					'100%': {
						transform: 'translate(10px, 15px) rotate(360deg)',
					}
				},
				'wander-right-slow': {
					'0%': {
						transform: 'translate(10px, 15px) rotate(0deg)',
					},
					'25%': {
						transform: 'translate(40px, -10px) rotate(90deg)',
					},
					'50%': {
						transform: 'translate(20px, 25px) rotate(180deg)',
					},
					'75%': {
						transform: 'translate(60px, 0px) rotate(270deg)',
					},
					'100%': {
						transform: 'translate(10px, 15px) rotate(360deg)',
					}
				},
				'wander-left-slow': {
					'0%': {
						transform: 'translate(-20px, -30px) rotate(0deg)',
					},
					'25%': {
						transform: 'translate(-50px, -15px) rotate(90deg)',
					},
					'50%': {
						transform: 'translate(-30px, -40px) rotate(180deg)',
					},
					'75%': {
						transform: 'translate(-70px, -25px) rotate(270deg)',
					},
					'100%': {
						transform: 'translate(-20px, -30px) rotate(360deg)',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'rotate': 'rotate 10s linear infinite',
				'wander-left': 'wander-left 12s ease-in-out infinite',
				'wander-right': 'wander-right 12s ease-in-out infinite',
				'wander-right-slow': 'wander-right-slow 15s ease-in-out infinite',
				'wander-left-slow': 'wander-left-slow 18s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
