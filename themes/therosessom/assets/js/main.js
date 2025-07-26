/**
 * Main JavaScript for therosessom Theme
 * Modern WordPress Photography Theme
 */

// Import external libraries
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { lozad } from 'lozad';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import custom modules
import './customizer.js';
import './navigation.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Main Theme Class
 */
class TheRosessomTheme {
  constructor() {
    this.init();
  }

  /**
   * Initialize all theme functionality
   */
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeComponents();
      });
    } else {
      this.initializeComponents();
    }
  }

  /**
   * Initialize all components
   */
  initializeComponents() {
    this.initAOS();
    this.initLazyLoading();
    this.initSwipers();
    this.initPortfolioFilter();
    this.initLightbox();
    this.initSmoothScroll();
    this.initFormHandlers();
    this.initScrollAnimations();
    
    // Custom event for theme initialization complete
    document.dispatchEvent(new CustomEvent('therosessom:initialized'));
  }

  /**
   * Initialize AOS (Animate On Scroll)
   */
  initAOS() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      anchorPlacement: 'top-bottom'
    });
  }

  /**
   * Initialize lazy loading for images
   */
  initLazyLoading() {
    const observer = lozad('.lazy', {
      threshold: 0.1,
      enableAutoReload: true
    });
    observer.observe();

    // Lazy load background images
    const bgObserver = lozad('.lazy-bg', {
      threshold: 0.1,
      load: function(el) {
        el.style.backgroundImage = `url(${el.dataset.backgroundImage})`;
        el.classList.add('loaded');
      }
    });
    bgObserver.observe();
  }

  /**
   * Initialize Swiper sliders
   */
  initSwipers() {
    // Hero slider
    const heroSlider = document.querySelector('.hero-swiper');
    if (heroSlider) {
      new Swiper(heroSlider, {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    }

    // Portfolio slider
    const portfolioSliders = document.querySelectorAll('.portfolio-swiper');
    portfolioSliders.forEach(slider => {
      new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        },
        navigation: {
          nextEl: slider.querySelector('.swiper-button-next'),
          prevEl: slider.querySelector('.swiper-button-prev'),
        }
      });
    });

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-swiper');
    if (testimonialSlider) {
      new Swiper(testimonialSlider, {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 6000,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      });
    }
  }

  /**
   * Initialize portfolio filtering
   */
  initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.dataset.filter;
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.dataset.category === filterValue) {
            gsap.to(item, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out'
            });
            item.style.display = 'block';
          } else {
            gsap.to(item, {
              opacity: 0,
              scale: 0.8,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                item.style.display = 'none';
              }
            });
          }
        });
      });
    });
  }

  /**
   * Initialize lightbox for images
   */
  initLightbox() {
    // Simple lightbox implementation
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openLightbox(trigger.href || trigger.dataset.src, trigger.dataset.title);
      });
    });
  }

  /**
   * Open lightbox
   */
  openLightbox(src, title = '') {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4';
    lightbox.innerHTML = `
      <div class="lightbox-content relative max-w-full max-h-full">
        <button class="lightbox-close absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors">&times;</button>
        <img src="${src}" alt="${title}" class="max-w-full max-h-full object-contain">
        ${title ? `<div class="lightbox-title text-white text-center mt-4">${title}</div>` : ''}
      </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Animation
    gsap.fromTo(lightbox, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3 }
    );

    // Close handlers
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const closeLightbox = () => {
      gsap.to(lightbox, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }
      });
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // ESC key
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  }

  /**
   * Initialize smooth scroll
   */
  initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: targetElement,
            ease: 'power2.inOut'
          });
        }
      });
    });
  }

  /**
   * Initialize form handlers
   */
  initFormHandlers() {
    const forms = document.querySelectorAll('.theme-form');
    
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          this.showNotification('Error sending message. Please try again.', 'error');
        } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    });
  }

  /**
   * Initialize scroll animations
   */
  initScrollAnimations() {
    // Parallax effect for hero sections
    const heroSections = document.querySelectorAll('.hero-parallax');
    heroSections.forEach(hero => {
      gsap.to(hero, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Fade in animation for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
      gsap.fromTo(item, 
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white shadow-lg`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animation
    gsap.fromTo(notification,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 0.3 }
    );

    // Auto remove
    setTimeout(() => {
      gsap.to(notification, {
        opacity: 0,
        x: 100,
        duration: 0.3,
        onComplete: () => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }
      });
    }, 3000);
  }
}

// Initialize theme
const theme = new TheRosessomTheme();

// Make theme available globally
window.TheRosessomTheme = theme;

// WordPress specific hooks
document.addEventListener('DOMContentLoaded', () => {
  // Handle WordPress infinite scroll if present
  if (typeof window.wp !== 'undefined' && window.wp.customize) {
    // Customizer preview refresh
    window.wp.customize.selectiveRefresh.bind('widget-updated', () => {
      theme.initializeComponents();
    });
  }
});