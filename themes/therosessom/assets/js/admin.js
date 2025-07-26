/**
 * Admin JavaScript for therosessom Theme
 * WordPress Admin Panel Enhancements
 */

/**
 * Admin Theme Class
 */
class TheRosessomAdmin {
  constructor() {
    this.init();
  }

  /**
   * Initialize admin functionality
   */
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeAdmin();
      });
    } else {
      this.initializeAdmin();
    }
  }

  /**
   * Initialize all admin components
   */
  initializeAdmin() {
    this.initACFEnhancements();
    this.initMediaUploadEnhancements();
    this.initCustomizerEnhancements();
    this.initMetaBoxEnhancements();
    this.initColorPickerEnhancements();
    
    // Admin initialization complete event
    document.dispatchEvent(new CustomEvent('therosessom:admin:initialized'));
  }

  /**
   * Enhanced ACF Pro functionality
   */
  initACFEnhancements() {
    // Wait for ACF to be available
    if (typeof acf !== 'undefined') {
      // Portfolio gallery preview enhancement
      acf.addAction('ready', () => {
        this.enhancePortfolioGallery();
        this.addImageSizePreview();
        this.enhanceFlexibleContent();
      });

      // New field added
      acf.addAction('append', () => {
        this.enhancePortfolioGallery();
      });
    }
  }

  /**
   * Enhance portfolio gallery fields
   */
  enhancePortfolioGallery() {
    const galleryFields = document.querySelectorAll('.acf-gallery');
    
    galleryFields.forEach(gallery => {
      if (gallery.dataset.enhanced) return;
      gallery.dataset.enhanced = 'true';

      // Add preview buttons for different aspect ratios
      const toolbar = gallery.querySelector('.acf-gallery-toolbar');
      if (toolbar) {
        const previewButtons = document.createElement('div');
        previewButtons.className = 'aspect-ratio-preview';
        previewButtons.innerHTML = `
          <label>Preview As:</label>
          <button type="button" data-ratio="photo">3:2</button>
          <button type="button" data-ratio="square">1:1</button>
          <button type="button" data-ratio="portrait">2:3</button>
        `;
        
        toolbar.appendChild(previewButtons);
        
        // Handle preview button clicks
        previewButtons.addEventListener('click', (e) => {
          if (e.target.tagName === 'BUTTON') {
            this.previewGalleryAspectRatio(gallery, e.target.dataset.ratio);
          }
        });
      }
    });
  }

  /**
   * Preview gallery with different aspect ratios
   */
  previewGalleryAspectRatio(gallery, ratio) {
    const images = gallery.querySelectorAll('.acf-gallery-attachment img');
    const ratioClasses = {
      photo: 'aspect-[3/2]',
      square: 'aspect-square',
      portrait: 'aspect-[2/3]'
    };

    images.forEach(img => {
      // Remove existing aspect ratio classes
      Object.values(ratioClasses).forEach(cls => {
        img.classList.remove(cls);
      });
      
      // Add new aspect ratio class
      if (ratioClasses[ratio]) {
        img.classList.add(ratioClasses[ratio], 'object-cover');
      }
    });
  }

  /**
   * Add image size preview to media uploads
   */
  addImageSizePreview() {
    const imageFields = document.querySelectorAll('.acf-image-uploader');
    
    imageFields.forEach(field => {
      if (field.dataset.sizePreview) return;
      field.dataset.sizePreview = 'true';

      const img = field.querySelector('img');
      if (img) {
        this.addImageSizeInfo(img);
      }

      // Listen for new image uploads
      field.addEventListener('change', () => {
        setTimeout(() => {
          const newImg = field.querySelector('img');
          if (newImg) {
            this.addImageSizeInfo(newImg);
          }
        }, 100);
      });
    });
  }

  /**
   * Add image size information
   */
  addImageSizeInfo(img) {
    if (img.dataset.sizeInfo) return;
    img.dataset.sizeInfo = 'true';

    img.addEventListener('load', () => {
      const container = img.closest('.acf-image-uploader');
      const existing = container.querySelector('.image-size-info');
      if (existing) existing.remove();

      const sizeInfo = document.createElement('div');
      sizeInfo.className = 'image-size-info';
      sizeInfo.style.cssText = 'font-size: 11px; color: #666; margin-top: 5px;';
      sizeInfo.innerHTML = `
        <strong>Dimensions:</strong> ${img.naturalWidth} × ${img.naturalHeight}px<br>
        <strong>Aspect Ratio:</strong> ${this.calculateAspectRatio(img.naturalWidth, img.naturalHeight)}
      `;
      
      container.appendChild(sizeInfo);
    });
  }

  /**
   * Calculate aspect ratio
   */
  calculateAspectRatio(width, height) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  }

  /**
   * Enhance flexible content layouts
   */
  enhanceFlexibleContent() {
    const flexibleFields = document.querySelectorAll('.acf-flexible-content');
    
    flexibleFields.forEach(field => {
      if (field.dataset.enhanced) return;
      field.dataset.enhanced = 'true';

      // Add layout preview buttons
      const layouts = field.querySelectorAll('.layout');
      layouts.forEach(layout => {
        this.addLayoutPreview(layout);
      });

      // Listen for new layouts
      field.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-layout')) {
          setTimeout(() => {
            const newLayouts = field.querySelectorAll('.layout:not([data-preview])');
            newLayouts.forEach(layout => {
              this.addLayoutPreview(layout);
            });
          }, 100);
        }
      });
    });
  }

  /**
   * Add layout preview functionality
   */
  addLayoutPreview(layout) {
    if (layout.dataset.preview) return;
    layout.dataset.preview = 'true';

    const handle = layout.querySelector('.acf-fc-layout-handle');
    if (handle) {
      const previewBtn = document.createElement('button');
      previewBtn.type = 'button';
      previewBtn.className = 'button button-small';
      previewBtn.textContent = 'Preview';
      previewBtn.style.marginLeft = '10px';
      
      previewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.previewLayout(layout);
      });
      
      handle.appendChild(previewBtn);
    }
  }

  /**
   * Preview layout in modal
   */
  previewLayout(layout) {
    const layoutName = layout.dataset.layout;
    const fields = this.extractLayoutFields(layout);
    
    // Create preview modal
    const modal = document.createElement('div');
    modal.className = 'layout-preview-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.8); z-index: 100000;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
    `;
    
    modal.innerHTML = `
      <div style="background: white; max-width: 800px; max-height: 80vh; 
                  overflow: auto; padding: 20px; border-radius: 8px;">
        <h3>Layout Preview: ${layoutName}</h3>
        <div class="preview-content">
          ${this.generateLayoutPreview(layoutName, fields)}
        </div>
        <button type="button" class="button" onclick="this.closest('.layout-preview-modal').remove()">
          Close Preview
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  /**
   * Extract fields from layout
   */
  extractLayoutFields(layout) {
    const fields = {};
    const inputs = layout.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      const name = input.name.replace(/.*\[([^\]]+)\]$/, '$1');
      fields[name] = input.value;
    });
    
    return fields;
  }

  /**
   * Generate layout preview HTML
   */
  generateLayoutPreview(layoutName, fields) {
    // This would generate a preview based on the layout type
    // For now, just show the fields
    let html = `<div class="layout-${layoutName}">`;
    
    Object.entries(fields).forEach(([key, value]) => {
      if (value) {
        html += `<p><strong>${key}:</strong> ${value}</p>`;
      }
    });
    
    html += '</div>';
    return html;
  }

  /**
   * Enhance media upload functionality
   */
  initMediaUploadEnhancements() {
    // Add quick resize options for uploaded images
    if (typeof wp !== 'undefined' && wp.media) {
      const originalMediaFrame = wp.media;
      
      // Extend media frame with custom functionality
      wp.media.view.Modal.prototype.on('ready', function() {
        this.addImageOptimizationTools();
      });
    }
  }

  /**
   * Add image optimization tools
   */
  addImageOptimizationTools() {
    // Add optimization buttons to media modal
    setTimeout(() => {
      const mediaModal = document.querySelector('.media-modal');
      if (mediaModal && !mediaModal.querySelector('.optimization-tools')) {
        const toolbar = mediaModal.querySelector('.media-toolbar');
        if (toolbar) {
          const tools = document.createElement('div');
          tools.className = 'optimization-tools';
          tools.innerHTML = `
            <button type="button" class="button webp-convert">Convert to WebP</button>
            <button type="button" class="button compress-image">Optimize Size</button>
          `;
          toolbar.appendChild(tools);
        }
      }
    }, 100);
  }

  /**
   * Enhance WordPress Customizer
   */
  initCustomizerEnhancements() {
    if (typeof wp !== 'undefined' && wp.customize) {
      // Add live preview enhancements
      wp.customize.bind('ready', () => {
        this.addCustomizerPreviewEnhancements();
      });
    }
  }

  /**
   * Add customizer preview enhancements
   */
  addCustomizerPreviewEnhancements() {
    // Add real-time color preview
    const colorControls = document.querySelectorAll('.customize-control-color');
    colorControls.forEach(control => {
      const input = control.querySelector('input[type="text"]');
      if (input) {
        input.addEventListener('input', (e) => {
          this.previewColorChange(e.target.dataset.customizeSettingLink, e.target.value);
        });
      }
    });
  }

  /**
   * Preview color changes in real-time
   */
  previewColorChange(setting, color) {
    const preview = document.getElementById('customize-preview');
    if (preview) {
      const message = {
        type: 'color-change',
        setting: setting,
        color: color
      };
      preview.contentWindow.postMessage(message, '*');
    }
  }

  /**
   * Enhance meta boxes
   */
  initMetaBoxEnhancements() {
    const metaBoxes = document.querySelectorAll('.postbox');
    
    metaBoxes.forEach(box => {
      // Add collapse/expand animations
      const button = box.querySelector('.handlediv');
      if (button) {
        button.addEventListener('click', () => {
          const content = box.querySelector('.inside');
          if (content) {
            content.style.transition = 'all 0.3s ease';
          }
        });
      }
    });
  }

  /**
   * Enhance color picker functionality
   */
  initColorPickerEnhancements() {
    // Add color palette suggestions
    const colorInputs = document.querySelectorAll('input[type="color"], .color-picker');
    
    colorInputs.forEach(input => {
      this.addColorPalette(input);
    });
  }

  /**
   * Add color palette to color inputs
   */
  addColorPalette(input) {
    if (input.nextElementSibling?.classList.contains('color-palette')) return;

    const palette = document.createElement('div');
    palette.className = 'color-palette';
    palette.style.cssText = 'margin-top: 5px; display: flex; gap: 5px; flex-wrap: wrap;';
    
    const brandColors = [
      '#4f46e5', '#6366f1', '#4338ca',  // Primary blues
      '#ec4899', '#f472b6', '#db2777',  // Secondary pinks
      '#f59e0b', '#fcd34d', '#d97706',  // Gold colors
      '#000000', '#404040', '#737373',  // Neutrals
      '#ffffff', '#f5f5f5', '#e5e5e5'   // Light colors
    ];

    brandColors.forEach(color => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.style.cssText = `
        width: 24px; height: 24px; border-radius: 3px;
        background-color: ${color}; border: 1px solid #ddd;
        cursor: pointer; margin: 0;
      `;
      
      swatch.addEventListener('click', () => {
        input.value = color;
        input.dispatchEvent(new Event('change'));
      });
      
      palette.appendChild(swatch);
    });

    input.parentNode.insertBefore(palette, input.nextSibling);
  }
}

// Initialize admin functionality
const adminTheme = new TheRosessomAdmin();

// Make admin theme available globally
window.TheRosessomAdmin = adminTheme;