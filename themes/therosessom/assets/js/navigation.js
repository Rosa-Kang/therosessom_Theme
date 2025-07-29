/**
 * Navigation Module for therosessom Theme
 * Integrated with main theme architecture
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
                menuOpen: 'menu-open'
            }
        };

        this.elements = {};
        this.state = {
            isOpen: false,
            isAnimating: false
        };

        this.init();
    }

    /**
     * Initialize navigation
     */
    init() {
        this.getElements();
        
        if (!this.validateElements()) {
            console.warn('Navigation: Required elements not found');
            return;
        }

        this.setupInitialState();
        this.bindEvents();
        
        console.log('✅ Navigation module loaded');
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
            body: document.body
        };

        this.updateMenuLinks();
    }

    updateMenuLinks() {
        this.elements.menuLinks = document.querySelectorAll(this.config.selectors.menuLinks);
    }

    validateElements() {
        const { navigation, menuToggle, body } = this.elements;
        return navigation && menuToggle && body;
    }

    setupInitialState() {
        this.elements.menuToggle.setAttribute('aria-expanded', 'false');
        this.syncState();
    }

    syncState() {
        this.state.isOpen = this.elements.body.classList.contains(this.config.classes.menuOpen);
    }

    bindEvents() {
        const { menuToggle } = this.elements;

        menuToggle.addEventListener('click', this.handleToggleClick.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        document.addEventListener('keydown', this.handleKeydown.bind(this));

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, this.config.DEBOUNCE_DELAY);
        });
    }

    handleToggleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!this.state.isAnimating) {
            this.toggleMenu();
        }
    }

    handleDocumentClick(event) {
        if (!this.state.isOpen) return;

        const { navigation } = this.elements;
        
        if (navigation.contains(event.target)) return;

        this.closeMenu();
    }

    handleKeydown(event) {
        if (event.key === 'Escape' && this.state.isOpen) {
            event.preventDefault();
            this.closeMenu();
        }
    }

    handleResize() {
        if (window.innerWidth >= this.config.DESKTOP_BREAKPOINT && this.state.isOpen) {
            this.closeMenu();
        }
    }

    async toggleMenu() {
        this.state.isAnimating = true;
        this.state.isOpen = !this.state.isOpen;

        try {
            await this.updateVisuals();
            this.manageFocus();
        } finally {
            setTimeout(() => {
                this.state.isAnimating = false;
            }, 300);
        }
    }

    async updateVisuals() {
        const { navigation, menuToggle, body } = this.elements;
        const { classes } = this.config;
        const { isOpen } = this.state;

        navigation.classList.toggle(classes.toggled, isOpen);
        menuToggle.classList.toggle(classes.toggled, isOpen);  
        body.classList.toggle(classes.menuOpen, isOpen);

        menuToggle.setAttribute('aria-expanded', isOpen.toString());

        return new Promise(resolve => setTimeout(resolve, 50));
    }

    manageFocus() {
        const { isOpen } = this.state;
        
        if (isOpen) {
            this.updateMenuLinks();
            const firstLink = this.elements.menuLinks[0];
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        } else {
            this.elements.menuToggle.focus();
        }
    }

    closeMenu() {
        if (this.state.isOpen && !this.state.isAnimating) {
            this.toggleMenu();
        }
    }

    openMenu() {
        if (!this.state.isOpen && !this.state.isAnimating) {
            this.toggleMenu();
        }
    }

    getState() {
        return {
            isOpen: this.state.isOpen,
            isAnimating: this.state.isAnimating,
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