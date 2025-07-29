/**
 * File customizer.js
 *
 * Theme Customizer enhancements for a better user experience.
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 * No jQuery dependency - Pure JavaScript implementation.
 */

(function() {
    'use strict';

    // Wait for WordPress Customizer API to be available
    if (typeof wp === 'undefined' || !wp.customize) {
        console.warn('WordPress Customizer API not available');
        return;
    }

    /**
     * Utility function to safely query DOM elements
     */
    function queryElements(selector) {
        return document.querySelectorAll(selector);
    }

    function queryElement(selector) {
        return document.querySelector(selector);
    }

    /**
     * Utility function to set CSS styles
     */
    function setStyles(elements, styles) {
        elements.forEach(element => {
            Object.keys(styles).forEach(property => {
                element.style[property] = styles[property];
            });
        });
    }

    /**
     * Site title customization
     */
    wp.customize('blogname', function(value) {
        value.bind(function(to) {
            const siteTitleLinks = queryElements('.site-title a');
            siteTitleLinks.forEach(link => {
                link.textContent = to;
            });
        });
    });

    /**
     * Site description customization
     */
    wp.customize('blogdescription', function(value) {
        value.bind(function(to) {
            const siteDescriptions = queryElements('.site-description');
            siteDescriptions.forEach(description => {
                description.textContent = to;
            });
        });
    });

    /**
     * Header text color customization
     */
    wp.customize('header_textcolor', function(value) {
        value.bind(function(to) {
            const siteTitles = queryElements('.site-title');
            const siteDescriptions = queryElements('.site-description');
            const siteTitleLinks = queryElements('.site-title a');
            
            if ('blank' === to) {
                // Hide header text
                const hideStyles = {
                    clip: 'rect(1px, 1px, 1px, 1px)',
                    position: 'absolute'
                };
                
                setStyles([...siteTitles, ...siteDescriptions], hideStyles);
            } else {
                // Show header text with color
                const showStyles = {
                    clip: 'auto',
                    position: 'relative'
                };
                
                const colorStyles = {
                    color: to
                };
                
                setStyles([...siteTitles, ...siteDescriptions], showStyles);
                setStyles([...siteTitleLinks, ...siteDescriptions], colorStyles);
            }
        });
    });

    /**
     * Custom logo handling (if applicable)
     */
    if (wp.customize('custom_logo')) {
        wp.customize('custom_logo', function(value) {
            value.bind(function(to) {
                // Handle custom logo changes
                const logoContainers = queryElements('.custom-logo-link');
                
                if (to) {
                    // Logo is set - you might want to fetch the new logo image
                    // This is more complex and typically handled by WordPress
                    console.log('Custom logo changed:', to);
                } else {
                    // Logo removed - show site title instead
                    logoContainers.forEach(container => {
                        container.style.display = 'none';
                    });
                }
            });
        });
    }

    /**
     * Theme color customizations (if you have custom color controls)
     */
    
    // Primary color
    if (wp.customize('primary_color')) {
        wp.customize('primary_color', function(value) {
            value.bind(function(to) {
                // Update CSS custom property for primary color
                document.documentElement.style.setProperty('--color-primary', to);
            });
        });
    }

    // Secondary color
    if (wp.customize('secondary_color')) {
        wp.customize('secondary_color', function(value) {
            value.bind(function(to) {
                document.documentElement.style.setProperty('--color-secondary', to);
            });
        });
    }

    /**
     * Typography customizations (if applicable)
     */
    
    // Font family
    if (wp.customize('body_font_family')) {
        wp.customize('body_font_family', function(value) {
            value.bind(function(to) {
                document.body.style.fontFamily = to;
            });
        });
    }

    // Font size
    if (wp.customize('body_font_size')) {
        wp.customize('body_font_size', function(value) {
            value.bind(function(to) {
                document.body.style.fontSize = to + 'px';
            });
        });
    }

    /**
     * Layout customizations
     */
    
    // Container width
    if (wp.customize('container_width')) {
        wp.customize('container_width', function(value) {
            value.bind(function(to) {
                const containers = queryElements('.container, .max-w-container');
                containers.forEach(container => {
                    container.style.maxWidth = to + 'px';
                });
            });
        });
    }

    /**
     * Footer customizations
     */
    
    // Footer text
    if (wp.customize('footer_text')) {
        wp.customize('footer_text', function(value) {
            value.bind(function(to) {
                const footerTexts = queryElements('.footer-text, .site-info');
                footerTexts.forEach(footer => {
                    footer.innerHTML = to;
                });
            });
        });
    }

    /**
     * Advanced: Handle dynamic style injection
     */
    function injectCustomStyles(css) {
        let styleElement = queryElement('#therosessom-customizer-styles');
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'therosessom-customizer-styles';
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = css;
    }

    /**
     * Example: Background color customization with CSS injection
     */
    if (wp.customize('background_color')) {
        wp.customize('background_color', function(value) {
            value.bind(function(to) {
                const css = `
                    body {
                        background-color: #${to} !important;
                    }
                `;
                injectCustomStyles(css);
            });
        });
    }

    /**
     * Handle selective refresh for widgets
     */
    if (wp.customize.selectiveRefresh) {
        // Listen for selective refresh events
        wp.customize.selectiveRefresh.bind('partial-content-rendered', function(partial) {
            console.log('Partial content refreshed:', partial.id);
            
            // Re-initialize any JavaScript components if needed
            if (window.TheRosessomTheme && typeof window.TheRosessomTheme.reinitialize === 'function') {
                window.TheRosessomTheme.reinitialize();
            }
        });
    }

    /**
     * Debug mode for development
     */
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('local')) {
        console.log('🎨 Customizer enhancements loaded (Vanilla JS)');
        
        // Make customizer utilities available globally for debugging
        window.therosessomCustomizer = {
            queryElements,
            queryElement,
            setStyles,
            injectCustomStyles
        };
    }

})();