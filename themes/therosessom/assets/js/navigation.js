/**
 * Navigation Module for therosessom Theme
 * Integrated with main theme architecture and wavy effects
 */

export class NavigationMenu {
    constructor() {
        this.config = {
            DESKTOP_BREAKPOINT: 768,
            DEBOUNCE_DELAY: 250,
            selectors: {
                navigation: '#site-navigation',
                menuToggle: '#menu-toggle', 
                menu: '#primary-menu',
                menuLinks: '#primary-menu a'
            },
            classes: {
                toggled: 'toggled',
                menuOpen: 'menu-open',
                wavyProcessed: 'wavy-processed',
                menuCurrent: 'menu-current'
            },
            wavy: {
                animationDelay: 0.05, // seconds between each letter
                animationDuration: 600, // ms
                enabled: true
            }
        };

        this.elements = {};
        this.state = {
            isOpen: false,
            isAnimating: false,
            isDesktop: window.innerWidth >= this.config.DESKTOP_BREAKPOINT,
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };

        this.init();
    }

    /**
     * Initialize the menu
     */
    init() {
        this.getElements();
        if (this.validateElements()) {
            this.setupInitialState();
            this.bindEvents();
            this.initWavyEffect();
        }
    }

    /**
     * Get DOM elements
     */
    getElements() {
        const { selectors } = this.config;
        
        this.elements = {
            navigation: document.querySelector(selectors.navigation),
            menuToggle: document.querySelector(selectors.menuToggle),
            menu: document.querySelector(selectors.menu),
            menuLinks: document.querySelectorAll(selectors.menuLinks),
            body: document.body
        };
    }

    /**
     * Update menu links collection (useful for dynamic menus)
     */
    updateMenuLinks() {
        this.elements.menuLinks = document.querySelectorAll(this.config.selectors.menuLinks);
    }

    /**
     * Validate required elements exist
     */
    validateElements() {
        const { navigation, menuToggle, body } = this.elements;
        return navigation && menuToggle && body;
    }

    /**
     * Setup initial states
     */
    setupInitialState() {
        this.elements.menuToggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        const { menuToggle } = this.elements;

        // Mobile menu toggle
        menuToggle.addEventListener('click', this.handleToggleClick.bind(this));
        
        // Close menu on outside click
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));

        // Optimized resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, this.config.DEBOUNCE_DELAY);
        });

        // Listen for reduced motion preference changes
        const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionMediaQuery.addEventListener('change', (e) => {
            this.state.prefersReducedMotion = e.matches;
        });
    }

    /**
     * Handle mobile menu toggle click
     */
    handleToggleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!this.state.isAnimating) {
            this.toggleMenu();
        }
    }

    /**
     * Handle clicks outside menu to close it
     */
    handleDocumentClick(event) {
        if (!this.state.isOpen) return;

        const { navigation } = this.elements;
        
        if (navigation.contains(event.target)) return;

        this.closeMenu();
    }

    /**
     * Handle keyboard navigation
     */
    handleKeydown(event) {
        if (event.key === 'Escape' && this.state.isOpen) {
            event.preventDefault();
            this.closeMenu();
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        const wasDesktop = this.state.isDesktop;
        this.state.isDesktop = window.innerWidth >= this.config.DESKTOP_BREAKPOINT;

        // Close mobile menu when switching to desktop
        if (this.state.isDesktop && this.state.isOpen) {
            this.closeMenu();
        }

        // Re-initialize wavy effect if switching to desktop
        if (!wasDesktop && this.state.isDesktop) {
            this.initWavyEffect();
        }
    }

    /**
     * Toggle mobile menu
     */
    async toggleMenu() {
        this.state.isAnimating = true;
        this.state.isOpen = !this.state.isOpen;

        try {
            await this.updateVisuals();
            this.manageFocus();
        } finally {
            // Reset animation state after transition completes
            setTimeout(() => {
                this.state.isAnimating = false;
            }, 300);
        }
    }

    /**
     * Update visual states
     */
    async updateVisuals() {
        const { navigation, menuToggle, body } = this.elements;
        const { classes } = this.config;
        const { isOpen } = this.state;

        navigation.classList.toggle(classes.toggled, isOpen);
        menuToggle.classList.toggle(classes.toggled, isOpen);  
        body.classList.toggle(classes.menuOpen, isOpen);

        menuToggle.setAttribute('aria-expanded', isOpen.toString());

        // Small delay for smooth transitions
        return new Promise(resolve => setTimeout(resolve, 50));
    }

    /**
     * Manage focus for accessibility
     */
    manageFocus() {
        const { isOpen } = this.state;
        
        if (isOpen) {
            // Update menu links and focus first one when menu opens
            this.updateMenuLinks();
            const firstLink = this.elements.menuLinks[0];
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        } else {
            // Return focus to toggle button when menu closes
            this.elements.menuToggle.focus();
        }
    }

    /**
     * Close mobile menu
     */
    closeMenu() {
        if (this.state.isOpen && !this.state.isAnimating) {
            this.toggleMenu();
        }
    }

    /**
     * Initialize wavy text effect for desktop menu
     */
    initWavyEffect() {
        // Only apply on desktop and if animations are allowed
        if (!this.state.isDesktop || 
            this.state.prefersReducedMotion || 
            !this.config.wavy.enabled) {
            return;
        }

        requestAnimationFrame(() => {
            this.elements.menuLinks.forEach(link => {
                this.processLinkForWavy(link);
            });
            this.highlightCurrentPage();
        });
    }

    /**
     * Process individual menu link for wavy effect
     */
    processLinkForWavy(link) {
        // Skip if already processed
        if (link.classList.contains(this.config.classes.wavyProcessed)) {
            return;
        }

        const text = link.textContent.trim();
        
        // Skip empty links
        if (!text) return;

        const letters = text.split('').map((letter, index) => {
            const delay = index * this.config.wavy.animationDelay;
            
            if (letter === ' ') {
                return `<span class="letter" style="animation-delay: ${delay}s">&nbsp;</span>`;
            }
            
            return `<span class="letter" style="animation-delay: ${delay}s">${letter}</span>`;
        }).join('');

        link.innerHTML = letters;
        link.classList.add(this.config.classes.wavyProcessed);
    }

    /**
     * Highlight current page menu item
     */
    highlightCurrentPage() {
        // WordPress automatically adds current-menu-item class
        const currentItems = document.querySelectorAll(`
            .current-menu-item > a,
            .current-page-ancestor > a,
            .current-menu-ancestor > a,
            .current-menu-parent > a
        `);

        currentItems.forEach(link => {
            link.classList.add(this.config.classes.menuCurrent);
        });
    }

    /**
     * Update wavy effect (useful for dynamic menu updates)
     */
    refreshWavyEffect() {
        // Remove existing processing
        this.elements.menuLinks.forEach(link => {
            link.classList.remove(this.config.classes.wavyProcessed);
        });

        // Re-get menu links in case DOM changed
        this.updateMenuLinks();
        
        // Re-initialize wavy effect
        this.initWavyEffect();
    }

    /**
     * Public API: Enable/disable wavy effect
     */
    toggleWavyEffect(enabled = null) {
        this.config.wavy.enabled = enabled !== null ? enabled : !this.config.wavy.enabled;
        
        if (this.config.wavy.enabled) {
            this.initWavyEffect();
        } else {
            // Remove wavy effect
            this.elements.menuLinks.forEach(link => {
                const letters = link.querySelectorAll('.letter');
                if (letters.length > 0) {
                    link.textContent = link.textContent;
                    link.classList.remove(this.config.classes.wavyProcessed);
                }
            });
            // Still highlight current page even without wavy effect
            this.highlightCurrentPage();
        }
    }

    /**
     * Get current state (useful for debugging)
     */
    getState() {
        return {
            isOpen: this.state.isOpen,
            isAnimating: this.state.isAnimating,
            isDesktop: this.state.isDesktop,
            wavyEnabled: this.config.wavy.enabled,
            prefersReducedMotion: this.state.prefersReducedMotion,
            elements: Object.keys(this.elements).reduce((acc, key) => {
                acc[key] = !!this.elements[key];
                return acc;
            }, {})
        };
    }
}

// Auto-initialize if not using module system
if (typeof window !== 'undefined' && !window.TheRosessomTheme) {
    document.addEventListener('DOMContentLoaded', () => {
        window.navigationMenu = new NavigationMenu();
    });
}
