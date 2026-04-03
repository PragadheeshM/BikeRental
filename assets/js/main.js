/* ============================================
   MAIN.JS - Global JavaScript Logic
   Bike Rental & Tour Company
   ============================================ */

(function () {
  'use strict';

  /* --- DOM Ready --- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initThemeToggle();
    initStickyNavbar();
    initMobileMenu();
    initDropdowns();
    initScrollAnimations();
    initBackToTop();
    initRTLToggle();
    initFormValidation();
    initNewsletterForm();
  }

  /* ============================================
     THEME TOGGLE (Dark / Light)
     ============================================ */
  function initThemeToggle() {
    const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
    const html = document.documentElement;

    /* Load saved preference */
    const savedTheme = localStorage.getItem('br-theme');
    if (savedTheme === 'dark') {
      html.classList.add('dark');
    } else if (savedTheme === 'light') {
      html.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('dark');
    }

    updateToggleIcons();

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('br-theme', isDark ? 'dark' : 'light');
        updateToggleIcons();
      });
    });

    function updateToggleIcons() {
      const isDark = html.classList.contains('dark');
      toggleBtns.forEach(function (btn) {
        const sunIcon = btn.querySelector('.icon-sun');
        const moonIcon = btn.querySelector('.icon-moon');
        if (sunIcon && moonIcon) {
          sunIcon.style.display = isDark ? 'block' : 'none';
          moonIcon.style.display = isDark ? 'none' : 'block';
        }
      });
    }
  }

  /* ============================================
     STICKY NAVBAR
     ============================================ */
  function initStickyNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    });
  }

  /* ============================================
     MOBILE MENU
     ============================================ */
  function initMobileMenu() {
    var toggle = document.querySelector('.navbar__toggle');
    var menu = document.querySelector('.navbar__menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      menu.classList.toggle('navbar__menu--open');
      var isOpen = menu.classList.contains('navbar__menu--open');

      /* Update hamburger icon */
      var iconOpen = toggle.querySelector('.icon-menu');
      var iconClose = toggle.querySelector('.icon-close');
      if (iconOpen && iconClose) {
        iconOpen.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }

      /* Prevent body scroll when menu is open */
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close on link click */
    menu.querySelectorAll('.navbar__link:not([data-dropdown])').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('navbar__menu--open');
        document.body.style.overflow = '';
        var iconOpen = toggle.querySelector('.icon-menu');
        var iconClose = toggle.querySelector('.icon-close');
        if (iconOpen && iconClose) {
          iconOpen.style.display = 'block';
          iconClose.style.display = 'none';
        }
      });
    });
  }

  /* ============================================
     DROPDOWNS (Mobile accordion style)
     ============================================ */
  function initDropdowns() {
    var dropdownToggles = document.querySelectorAll('[data-dropdown]');

    dropdownToggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        if (window.innerWidth > 768) return;
        e.preventDefault();
        var parent = toggle.closest('.navbar__item');
        parent.classList.toggle('navbar__item--open');

        /* Close others */
        dropdownToggles.forEach(function (other) {
          var otherParent = other.closest('.navbar__item');
          if (otherParent !== parent) {
            otherParent.classList.remove('navbar__item--open');
          }
        });
      });
    });
  }

  /* ============================================
     SCROLL-TRIGGERED ANIMATIONS
     ============================================ */
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale'
    );

    if (!animatedElements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = el.dataset.delay || 0;
            setTimeout(function () {
              if (el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll--visible');
              }
              if (el.classList.contains('animate-slide-left')) {
                el.classList.add('animate-slide-left--visible');
              }
              if (el.classList.contains('animate-slide-right')) {
                el.classList.add('animate-slide-right--visible');
              }
              if (el.classList.contains('animate-scale')) {
                el.classList.add('animate-scale--visible');
              }
            }, parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     BACK TO TOP
     ============================================ */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     RTL TOGGLE
     ============================================ */
  function initRTLToggle() {
    var toggleBtns = document.querySelectorAll('[data-rtl-toggle]');
    var html = document.documentElement;

    var savedDir = localStorage.getItem('br-dir');
    if (savedDir) {
      html.setAttribute('dir', savedDir);
    }

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var currentDir = html.getAttribute('dir') || 'ltr';
        var newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        html.setAttribute('dir', newDir);
        localStorage.setItem('br-dir', newDir);
      });
    });
  }

  /* ============================================
     TOAST NOTIFICATION SYSTEM
     ============================================ */
  window.showToast = function (message, type, duration) {
    type = type || 'info';
    duration = duration || 4000;

    var container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var icons = {
      success: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
      error: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.innerHTML =
      (icons[type] || icons.info) +
      '<span>' + message + '</span>' +
      '<button class="toast__close" aria-label="Close">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>';

    container.appendChild(toast);

    /* Close button */
    toast.querySelector('.toast__close').addEventListener('click', function () {
      dismissToast(toast);
    });

    /* Auto dismiss */
    setTimeout(function () {
      dismissToast(toast);
    }, duration);
  };

  function dismissToast(toast) {
    if (toast.classList.contains('toast--exit')) return;
    toast.classList.add('toast--exit');
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }

  /* ============================================
     FORM VALIDATION
     ============================================ */
  function initFormValidation() {
    var forms = document.querySelectorAll('[data-validate]');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var isValid = true;

        /* Reset previous errors */
        form.querySelectorAll('.form-input--error').forEach(function (input) {
          input.classList.remove('form-input--error');
        });
        form.querySelectorAll('.form-error--visible').forEach(function (error) {
          error.classList.remove('form-error--visible');
        });

        /* Validate required fields */
        form.querySelectorAll('[required]').forEach(function (input) {
          if (!input.value.trim()) {
            markInvalid(input, 'This field is required');
            isValid = false;
          }
        });

        /* Validate email fields */
        form.querySelectorAll('[type="email"]').forEach(function (input) {
          if (input.value.trim() && !isValidEmail(input.value)) {
            markInvalid(input, 'Please enter a valid email address');
            isValid = false;
          }
        });

        /* Validate password min length */
        form.querySelectorAll('[data-minlength]').forEach(function (input) {
          var min = parseInt(input.dataset.minlength);
          if (input.value.trim() && input.value.length < min) {
            markInvalid(input, 'Must be at least ' + min + ' characters');
            isValid = false;
          }
        });

        if (isValid) {
          showToast('Form submitted successfully!', 'success');
          form.reset();
        } else {
          showToast('Please fix the errors below.', 'error');
        }
      });

      /* Real-time validation on blur */
      form.querySelectorAll('.form-input').forEach(function (input) {
        input.addEventListener('blur', function () {
          if (input.hasAttribute('required') && !input.value.trim()) {
            markInvalid(input, 'This field is required');
          } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
            markInvalid(input, 'Please enter a valid email address');
          } else {
            clearInvalid(input);
          }
        });

        input.addEventListener('input', function () {
          if (input.classList.contains('form-input--error')) {
            clearInvalid(input);
          }
        });
      });
    });

    function markInvalid(input, message) {
      input.classList.add('form-input--error');
      var errorEl = input.parentElement.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('form-error--visible');
      }
    }

    function clearInvalid(input) {
      input.classList.remove('form-input--error');
      var errorEl = input.parentElement.querySelector('.form-error');
      if (errorEl) {
        errorEl.classList.remove('form-error--visible');
      }
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }

  /* ============================================
     NEWSLETTER FORM
     ============================================ */
  function initNewsletterForm() {
    var forms = document.querySelectorAll('.footer__newsletter');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('.footer__newsletter-input');
        if (input && input.value.trim()) {
          showToast('Subscribed successfully! 🎉', 'success');
          input.value = '';
        } else {
          showToast('Please enter your email address.', 'warning');
        }
      });
    });
  }

  /* ============================================
     MODAL UTILITIES
     ============================================ */
  window.openModal = function (modalId) {
    var overlay = document.getElementById(modalId);
    if (overlay) {
      overlay.classList.add('modal-overlay--active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function (modalId) {
    var overlay = document.getElementById(modalId);
    if (overlay) {
      overlay.classList.remove('modal-overlay--active');
      document.body.style.overflow = '';
    }
  };

  /* Close modal on overlay click */
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay--active')) {
      e.target.classList.remove('modal-overlay--active');
      document.body.style.overflow = '';
    }
  });

  /* Close modal on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var activeModal = document.querySelector('.modal-overlay--active');
      if (activeModal) {
        activeModal.classList.remove('modal-overlay--active');
        document.body.style.overflow = '';
      }
    }
  });

})();
