/**
 * Enhanced Shop Dropdown Animations
 * Uses Motion One for smooth, polished dropdown animations
 */

// Import Motion One
import { animate, stagger } from 'motion';

class ShopDropdownAnimations {
  constructor() {
    this.initialized = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    if (this.initialized) return;
    this.initialized = true;

    // Find header menu component
    const headerMenu = document.querySelector('header-menu');
    if (!headerMenu) return;

    // Observe for submenu visibility changes
    this.observeSubmenus(headerMenu);
    
    // Add enhanced styles
    this.addEnhancedStyles();
  }

  observeSubmenus(headerMenu) {
    // Watch for aria-expanded changes on menu items
    const menuItems = headerMenu.querySelectorAll('.menu-list__list-item');
    
    menuItems.forEach(item => {
      const link = item.querySelector('[ref="menuitem"]');
      const submenu = item.querySelector('.menu-list__submenu');
      
      if (!link || !submenu) return;

      // Create mutation observer for aria-expanded changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'aria-expanded') {
            const isExpanded = link.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
              this.animateSubmenuOpen(submenu);
            }
          }
        });
      });

      observer.observe(link, { attributes: true, attributeFilter: ['aria-expanded'] });
    });
  }

  animateSubmenuOpen(submenu) {
    const inner = submenu.querySelector('.menu-list__submenu-inner');
    if (!inner) return;

    // Animate the mega menu grid columns
    const columns = inner.querySelectorAll('.mega-menu__column');
    if (columns.length > 0) {
      // Set initial state
      columns.forEach(col => {
        col.style.opacity = '0';
        col.style.transform = 'translateY(12px)';
      });

      // Animate columns with stagger
      animate(
        columns,
        { 
          opacity: [0, 1],
          transform: ['translateY(12px)', 'translateY(0)']
        },
        {
          duration: 0.35,
          delay: stagger(0.05, { start: 0.1 }),
          easing: [0.22, 1, 0.36, 1] // Custom easing for smooth feel
        }
      );
    }

    // Animate links within each column
    const links = inner.querySelectorAll('.mega-menu__link');
    if (links.length > 0) {
      links.forEach(link => {
        link.style.opacity = '0';
      });

      animate(
        links,
        { opacity: [0, 1] },
        {
          duration: 0.3,
          delay: stagger(0.02, { start: 0.15 }),
          easing: 'ease-out'
        }
      );
    }

    // Animate featured content if present
    const contentItems = inner.querySelectorAll('.mega-menu__content-list-item');
    if (contentItems.length > 0) {
      contentItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px) scale(0.98)';
      });

      animate(
        contentItems,
        { 
          opacity: [0, 1],
          transform: ['translateY(16px) scale(0.98)', 'translateY(0) scale(1)']
        },
        {
          duration: 0.4,
          delay: stagger(0.08, { start: 0.2 }),
          easing: [0.22, 1, 0.36, 1]
        }
      );
    }
  }

  addEnhancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced dropdown animations */
      .menu-list__submenu {
        --submenu-animation-speed: 280ms;
      }
      
      /* Smoother clip-path transition */
      .menu-list__list-item:where(:not([slot='overflow'])) > .menu-list__submenu {
        transition: clip-path 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                    visibility 0s linear 0s;
      }
      
      /* When closing, delay visibility change */
      .menu-list__list-item:not(:has([aria-expanded='true'])) > .menu-list__submenu:not(:hover) {
        transition: clip-path 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                    visibility 0s linear 0.28s;
      }
      
      /* Smooth background animation */
      .overflow-menu::after {
        transition: height 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                    opacity 0.2s ease-out 0.05s;
      }
      
      /* Subtle shadow enhancement on open */
      .menu-list__submenu-inner {
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
      }
      
      /* Menu item hover enhancement */
      .mega-menu__link {
        transition: color 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        margin: -0.25rem -0.5rem;
      }
      
      .mega-menu__link:hover {
        background-color: rgba(0, 0, 0, 0.03);
        transform: translateX(3px);
      }
      
      .mega-menu__link--parent:hover {
        transform: none;
      }
      
      /* Featured content hover effects */
      .mega-menu__content-list-item {
        transition: transform 0.25s ease;
      }
      
      .mega-menu__content-list-item:hover {
        transform: translateY(-4px);
      }
      
      /* Caret rotation on menu items with children */
      .menu-list__link[aria-haspopup="true"]::after {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 6px;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid currentColor;
        transition: transform 0.25s ease;
        vertical-align: middle;
      }
      
      .menu-list__link[aria-expanded="true"]::after {
        transform: rotate(180deg);
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize
new ShopDropdownAnimations();
