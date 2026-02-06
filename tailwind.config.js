/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './blocks/*.liquid',
    './templates/*.liquid',
    './templates/**/*.json'
  ],
  // Using prefix to avoid conflicts with existing theme CSS
  prefix: 'tw-',
  theme: {
    extend: {
      // Map to existing CSS custom properties for consistency
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        foreground: 'var(--color-foreground)',
        background: 'var(--color-background)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        // Custom brand colors
        'brand-blue': '#3b82a0',
        'brand-rose': '#c4a6a3',
      },
      fontFamily: {
        primary: 'var(--font-primary--family)',
        body: 'var(--font-body--family)',
        accent: 'var(--font-accent--family)',
      },
      borderRadius: {
        'theme': 'var(--style-border-radius)',
        'inputs': 'var(--style-border-radius-inputs)',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)',
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        'hover': 'var(--hover-transition-duration, 0.25s)',
      },
      transitionTimingFunction: {
        'hover': 'var(--hover-transition-timing, ease-out)',
      },
    },
  },
  plugins: [],
}
