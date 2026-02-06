/**
 * Casablanca Theme Animations
 * Powered by Motion One
 * 
 * This module provides scroll-triggered animations and interactive effects
 * for the Casablanca Bridal Shopify theme.
 */

import { animate, stagger, inView, scroll } from 'motion';

/**
 * Initialize scroll-triggered fade-in animations
 * Elements with .animate-on-scroll will fade in and slide up when entering viewport
 */
export function initScrollAnimations() {
  // Fade in and slide up on scroll
  inView('.animate-on-scroll', (info) => {
    animate(
      info.target,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.6, easing: 'ease-out' }
    );
  }, { margin: '-100px' });

  // Simple fade in
  inView('.animate-fade-in', (info) => {
    animate(
      info.target,
      { opacity: [0, 1] },
      { duration: 0.5, easing: 'ease-out' }
    );
  }, { margin: '-50px' });

  // Slide up animation
  inView('.animate-slide-up', (info) => {
    animate(
      info.target,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 0.7, easing: [0.25, 0.1, 0.25, 1] }
    );
  }, { margin: '-100px' });

  // Scale in animation
  inView('.animate-scale-in', (info) => {
    animate(
      info.target,
      { opacity: [0, 1], scale: [0.95, 1] },
      { duration: 0.5, easing: 'ease-out' }
    );
  }, { margin: '-50px' });
}

/**
 * Initialize staggered children animations
 * Container with .stagger-children will animate its children sequentially
 */
export function initStaggerAnimations() {
  inView('.stagger-children', (info) => {
    const children = info.target.children;
    animate(
      children,
      { opacity: [0, 1], y: [10, 0] },
      { duration: 0.4, delay: stagger(0.1), easing: 'ease-out' }
    );
  }, { margin: '-50px' });
}

/**
 * Initialize card hover animations
 * Cards with .card-animate will scale slightly on hover
 */
export function initCardAnimations() {
  document.querySelectorAll('.card-animate').forEach(card => {
    card.addEventListener('mouseenter', () => {
      animate(card, { scale: 1.02 }, { duration: 0.2, easing: 'ease-out' });
    });
    
    card.addEventListener('mouseleave', () => {
      animate(card, { scale: 1 }, { duration: 0.2, easing: 'ease-out' });
    });
  });
}

/**
 * Initialize button hover animations
 * Buttons with .btn-animate will have a subtle scale effect
 */
export function initButtonAnimations() {
  document.querySelectorAll('.btn-animate').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      animate(btn, { scale: 1.05 }, { duration: 0.15, easing: 'ease-out' });
    });
    
    btn.addEventListener('mouseleave', () => {
      animate(btn, { scale: 1 }, { duration: 0.15, easing: 'ease-out' });
    });
    
    btn.addEventListener('mousedown', () => {
      animate(btn, { scale: 0.98 }, { duration: 0.1 });
    });
    
    btn.addEventListener('mouseup', () => {
      animate(btn, { scale: 1.05 }, { duration: 0.1 });
    });
  });
}

/**
 * Initialize hero section parallax effect
 * Elements with .parallax will move at different speeds on scroll
 */
export function initParallaxEffects() {
  document.querySelectorAll('.parallax').forEach(element => {
    const speed = element.dataset.parallaxSpeed || 0.5;
    
    scroll(
      animate(element, { y: [0, 100 * speed] }),
      { target: element }
    );
  });
}

/**
 * Initialize image reveal animations
 * Images with .image-reveal will have a curtain reveal effect
 */
export function initImageReveal() {
  inView('.image-reveal', (info) => {
    const img = info.target.querySelector('img');
    if (img) {
      animate(
        img,
        { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] },
        { duration: 0.8, easing: [0.77, 0, 0.175, 1] }
      );
    }
  }, { margin: '-100px' });
}

/**
 * Initialize counter animations
 * Elements with .counter will animate from 0 to their data-target value
 */
export function initCounterAnimations() {
  inView('.counter', (info) => {
    const target = parseInt(info.target.dataset.target || '0');
    const duration = parseFloat(info.target.dataset.duration || '2');
    
    animate(
      (progress) => {
        info.target.textContent = Math.round(progress * target);
      },
      { duration, easing: 'ease-out' }
    );
  });
}

/**
 * Initialize all animations
 * Call this function when the DOM is ready
 */
export function initAllAnimations() {
  initScrollAnimations();
  initStaggerAnimations();
  initCardAnimations();
  initButtonAnimations();
  initParallaxEffects();
  initImageReveal();
  initCounterAnimations();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  initAllAnimations();
}

// Re-initialize on Shopify section reload (for theme editor)
document.addEventListener('shopify:section:load', initAllAnimations);

// Export for manual initialization if needed
export default {
  initAllAnimations,
  initScrollAnimations,
  initStaggerAnimations,
  initCardAnimations,
  initButtonAnimations,
  initParallaxEffects,
  initImageReveal,
  initCounterAnimations,
};
