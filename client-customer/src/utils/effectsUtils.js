// Effects Utilities for Scroll Animations and Parallax

/**
 * Initialize Intersection Observer for scroll-triggered animations
 */
export const initScrollAnimations = () => {
  if (!window.IntersectionObserver) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation classes
        entry.target.classList.add('animate-fade-in');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Optional: Remove observer after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll animation classes
  const elements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .observe-fade, .observe-left, .observe-right, .observe-scale');
  elements.forEach((el) => observer.observe(el));

  return observer;
};

/**
 * Parallax effect for background images
 */
export const initParallax = (elementSelector, parallaxStrength = 0.5) => {
  const parallaxElements = document.querySelectorAll(elementSelector);

  if (!parallaxElements.length) return;

  const handleParallax = () => {
    parallaxElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      // Only apply parallax if element is in viewport
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const yOffset = (elementTop - windowHeight / 2) * parallaxStrength;
        const bg = element.querySelector('.parallax-bg');
        if (bg) {
          bg.style.transform = `translateY(${yOffset}px)`;
        }
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  handleParallax();
};

/**
 * Add hover animations to elements
 */
export const initHoverAnimations = () => {
  const hoverElements = document.querySelectorAll('.product-card, .btn, .hover-lift');

  hoverElements.forEach((element) => {
    element.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
};

/**
 * Add ripple effect to buttons
 */
export const addRippleEffect = (elementSelector) => {
  const elements = document.querySelectorAll(elementSelector);

  elements.forEach((element) => {
    element.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      const rect = this.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = diameter + 'px';
      ripple.style.left = e.clientX - rect.left - radius + 'px';
      ripple.style.top = e.clientY - rect.top - radius + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
};

/**
 * Animated counter
 */
export const animateCounter = (element, targetValue, duration = 2000) => {
  const increment = targetValue / (duration / 16); // 60fps
  let currentValue = 0;

  const counter = setInterval(() => {
    currentValue += increment;
    if (currentValue >= targetValue) {
      element.textContent = targetValue;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(currentValue);
    }
  }, 16);
};

/**
 * Smooth scroll to element
 */
export const smoothScroll = (targetElement) => {
  if (!targetElement) return;

  targetElement.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

/**
 * Add loading skeleton animation
 */
export const addLoadingSkeletons = (containerSelector, count = 6) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'loading-skeleton';
    skeleton.style.height = '300px';
    skeleton.style.marginBottom = '16px';
    skeleton.style.borderRadius = '8px';
    container.appendChild(skeleton);
  }
};

/**
 * Remove loading skeleton animation
 */
export const removeLoadingSkeletons = (containerSelector) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const skeletons = container.querySelectorAll('.loading-skeleton');
  skeletons.forEach((skeleton) => skeleton.remove());
};

/**
 * Add fade-in animation to images
 */
export const fadeInImages = () => {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease-out';

    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
};

/**
 * Detect user's device and adjust animations
 */
export const adaptAnimationsForDevice = () => {
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReducedMotion) {
    // Disable heavy animations on mobile or if user prefers reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    
    // Add reduced motion class
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    }
  }
};

/**
 * Scroll progress bar animation
 */
export const initScrollProgressBar = () => {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress-bar';
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '3px';
  progressBar.style.background = 'linear-gradient(90deg, #16c784, #0dd481)';
  progressBar.style.width = '0%';
  progressBar.style.zIndex = '9999';
  progressBar.style.transition = 'width 0.1s ease';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
  });
};

/**
 * Reveal elements on scroll
 */
export const initRevealOnScroll = () => {
  if (!window.IntersectionObserver) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.observe-fade, .observe-left, .observe-right, .observe-scale').forEach((el) => {
    revealObserver.observe(el);
  });
};

/**
 * Stagger animations on scroll
 */
export const initStaggerAnimations = () => {
  const elements = document.querySelectorAll('.product-card, .scroll-fade-in');
  let delay = 0;

  elements.forEach((el) => {
    el.style.animationDelay = (delay * 0.05) + 's';
    delay++;
  });
};

/**
 * Mouse parallax effect
 */
export const initMouseParallax = (container) => {
  const elements = container ? document.querySelectorAll(container + ' [data-parallax]') : document.querySelectorAll('[data-parallax]');

  if (!elements.length) return;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    elements.forEach((el) => {
      const speed = el.dataset.parallax || '10';
      el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
};

/**
 * Initialize all effects
 */
export const initializeAllEffects = () => {
  initScrollAnimations();
  initHoverAnimations();
  addRippleEffect('.btn, button');
  fadeInImages();
  adaptAnimationsForDevice();
  initScrollProgressBar();
  initRevealOnScroll();
  initStaggerAnimations();

  // Optional: Initialize parallax if needed
  // initParallax('.parallax');
  // initMouseParallax();
};

/**
 * Cleanup effects
 */
export const cleanupEffects = () => {
  const observers = document.querySelectorAll('[data-observer]');
  observers.forEach((el) => {
    if (el.__observer) {
      el.__observer.disconnect();
    }
  });
};

const effectsUtils = {
  initScrollAnimations,
  initParallax,
  initHoverAnimations,
  addRippleEffect,
  animateCounter,
  smoothScroll,
  addLoadingSkeletons,
  removeLoadingSkeletons,
  fadeInImages,
  adaptAnimationsForDevice,
  initializeAllEffects,
  cleanupEffects
};

export default effectsUtils;
