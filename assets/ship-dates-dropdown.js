/**
 * Ship Dates Dropdown
 * Animated dropdown for displaying shipping date information
 */

(function() {
  'use strict';

  // Animation configuration
  const ANIMATION_DURATION = 300;
  const ANIMATION_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

  /**
   * Initialize all ship dates dropdowns on the page
   */
  function initShipDatesDropdowns() {
    const dropdowns = document.querySelectorAll('[data-ship-dates-dropdown]');
    dropdowns.forEach(initDropdown);
  }

  /**
   * Initialize a single dropdown instance
   * @param {HTMLElement} dropdown - The dropdown container element
   */
  function initDropdown(dropdown) {
    const trigger = dropdown.querySelector('[data-ship-dates-trigger]');
    const panel = dropdown.querySelector('.ship-dates-panel');
    const closeBtn = dropdown.querySelector('[data-ship-dates-close]');
    const overlay = dropdown.querySelector('[data-ship-dates-overlay]');
    const sectionHeaders = dropdown.querySelectorAll('.ship-dates-section__header');

    if (!trigger || !panel) return;

    // Toggle dropdown on trigger click
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(dropdown, panel, trigger);
    });

    // Close on close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeDropdown(dropdown, panel, trigger);
      });
    }

    // Close on overlay click (mobile)
    if (overlay) {
      overlay.addEventListener('click', () => {
        closeDropdown(dropdown, panel, trigger);
      });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdown.classList.contains('is-open')) {
        closeDropdown(dropdown, panel, trigger);
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (dropdown.classList.contains('is-open') && !dropdown.contains(e.target)) {
        closeDropdown(dropdown, panel, trigger);
      }
    });

    // Initialize collapsible sections
    sectionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        toggleSection(header);
      });
    });
  }

  /**
   * Toggle dropdown open/close state
   * @param {HTMLElement} dropdown - The dropdown container
   * @param {HTMLElement} panel - The panel element
   * @param {HTMLElement} trigger - The trigger button
   */
  function toggleDropdown(dropdown, panel, trigger) {
    if (dropdown.classList.contains('is-open')) {
      closeDropdown(dropdown, panel, trigger);
    } else {
      openDropdown(dropdown, panel, trigger);
    }
  }

  /**
   * Open the dropdown with animation
   * @param {HTMLElement} dropdown - The dropdown container
   * @param {HTMLElement} panel - The panel element
   * @param {HTMLElement} trigger - The trigger button
   */
  function openDropdown(dropdown, panel, trigger) {
    dropdown.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');

    // Animate panel opening
    animatePanel(panel, true);

    // Animate caret rotation
    const caret = trigger.querySelector('.ship-dates-caret');
    if (caret) {
      animateCaret(caret, true);
    }
  }

  /**
   * Close the dropdown with animation
   * @param {HTMLElement} dropdown - The dropdown container
   * @param {HTMLElement} panel - The panel element
   * @param {HTMLElement} trigger - The trigger button
   */
  function closeDropdown(dropdown, panel, trigger) {
    // Animate panel closing
    animatePanel(panel, false);

    // Animate caret rotation
    const caret = trigger.querySelector('.ship-dates-caret');
    if (caret) {
      animateCaret(caret, false);
    }

    // Remove class after animation
    setTimeout(() => {
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    }, ANIMATION_DURATION);
  }

  /**
   * Animate the panel open/close
   * @param {HTMLElement} panel - The panel element
   * @param {boolean} isOpening - Whether the panel is opening
   */
  function animatePanel(panel, isOpening) {
    // Check if Motion One is available
    if (typeof CasablancaAnimations !== 'undefined' && window.motion) {
      const { animate } = window.motion;
      
      if (isOpening) {
        animate(panel, 
          { opacity: [0, 1], transform: ['translateY(-10px) scale(0.98)', 'translateY(0) scale(1)'] },
          { duration: ANIMATION_DURATION / 1000, easing: ANIMATION_EASING }
        );
      } else {
        animate(panel,
          { opacity: [1, 0], transform: ['translateY(0) scale(1)', 'translateY(-10px) scale(0.98)'] },
          { duration: ANIMATION_DURATION / 1000, easing: ANIMATION_EASING }
        );
      }
    } else {
      // Fallback to CSS transitions (already handled by CSS)
      panel.style.transition = `opacity ${ANIMATION_DURATION}ms ${ANIMATION_EASING}, transform ${ANIMATION_DURATION}ms ${ANIMATION_EASING}`;
    }
  }

  /**
   * Animate the caret rotation
   * @param {HTMLElement} caret - The caret element
   * @param {boolean} isOpening - Whether the dropdown is opening
   */
  function animateCaret(caret, isOpening) {
    if (typeof CasablancaAnimations !== 'undefined' && window.motion) {
      const { animate } = window.motion;
      // Rotate from -90 (pointing right) to 0 (pointing down) - 90 degree rotation
      const rotation = isOpening ? 0 : -90;
      
      animate(caret,
        { rotate: [isOpening ? -90 : 0, rotation] },
        { duration: ANIMATION_DURATION / 1000, easing: ANIMATION_EASING }
      );
    }
    // CSS handles the transition as fallback
  }

  /**
   * Toggle a collapsible section
   * @param {HTMLElement} header - The section header button
   */
  function toggleSection(header) {
    const section = header.closest('.ship-dates-section');
    const content = section.querySelector('.ship-dates-section__content');
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Collapse
      section.classList.add('is-collapsed');
      header.setAttribute('aria-expanded', 'false');
      
      // Animate content collapse
      if (content) {
        animateSectionContent(content, false);
      }
    } else {
      // Expand
      section.classList.remove('is-collapsed');
      header.setAttribute('aria-expanded', 'true');
      
      // Animate content expand
      if (content) {
        animateSectionContent(content, true);
      }
    }
  }

  /**
   * Animate section content expand/collapse
   * @param {HTMLElement} content - The content element
   * @param {boolean} isExpanding - Whether the content is expanding
   */
  function animateSectionContent(content, isExpanding) {
    if (typeof CasablancaAnimations !== 'undefined' && window.motion) {
      const { animate } = window.motion;
      
      if (isExpanding) {
        // Get the natural height
        content.style.maxHeight = 'none';
        const height = content.scrollHeight;
        content.style.maxHeight = '0px';
        
        animate(content,
          { maxHeight: ['0px', height + 'px'], opacity: [0, 1] },
          { duration: ANIMATION_DURATION / 1000, easing: ANIMATION_EASING }
        ).finished.then(() => {
          content.style.maxHeight = '200px';
        });
      } else {
        const height = content.scrollHeight;
        animate(content,
          { maxHeight: [height + 'px', '0px'], opacity: [1, 0] },
          { duration: ANIMATION_DURATION / 1000, easing: ANIMATION_EASING }
        );
      }
    }
    // CSS handles the transition as fallback
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShipDatesDropdowns);
  } else {
    initShipDatesDropdowns();
  }

  // Re-initialize on Shopify section reload (for theme editor)
  document.addEventListener('shopify:section:load', initShipDatesDropdowns);

})();
