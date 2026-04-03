/**
 * Header interactions: Sticky scroll, mobile burger menu, dropdowns, active links
 */
export function initHeader() {
  const header = document.getElementById('site-header');
  const burgerToggle = document.querySelector('.burger-toggle');
  const mainNav = document.querySelector('.main-nav');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  if (!header) return;

  // 1. Sticky Header / Transparent to Solid transition
  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--scrolled');
      if (document.body.dataset.headerStyle === 'transparent') {
        header.classList.add('header--transparent');
      }
    }
  };

  // Initial check and scroll event
  checkScroll();
  window.addEventListener('scroll', checkScroll, { passive: true });

  // 2. Mobile Burger Menu
  if (burgerToggle && mainNav && mobileOverlay) {
    const toggleMenu = () => {
      const isExpanded = burgerToggle.getAttribute('aria-expanded') === 'true';
      burgerToggle.setAttribute('aria-expanded', !isExpanded);
      burgerToggle.classList.toggle('is-active');
      mainNav.classList.toggle('is-open');
      mobileOverlay.classList.toggle('is-active');
      document.body.style.overflow = isExpanded ? '' : 'hidden'; // Prevent background scroll
    };

    burgerToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        toggleMenu();
        burgerToggle.focus();
      }
    });
  }

  // 3. Dropdowns
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.nav-item-dropdown');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      // Close other dropdowns if any
      document.querySelectorAll('.nav-item-dropdown.is-open').forEach(openDropdown => {
        if (openDropdown !== parent) {
          openDropdown.classList.remove('is-open');
          openDropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        }
      });
      
      toggle.setAttribute('aria-expanded', !isExpanded);
      parent.classList.toggle('is-open');
    });
  });

  // Highlight active link based on current path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
  
  navLinks.forEach(link => {
    // pathname gives the absolute path relative to the domain root
    // e.g., if href="../index.html" and we're in /news/, pathname is "/index.html"
    const linkPath = link.pathname;
    if (!linkPath) return;
    
    const pathNoSlash = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    const linkPathNoSlash = linkPath.endsWith('/') ? linkPath.slice(0, -1) : linkPath;
    
    if (
      pathNoSlash === linkPathNoSlash || 
      (currentPath === '/' && (linkPath === '/index.html' || linkPath === '/')) ||
      (currentPath === '/en/' && (linkPath === '/en/index.html' || linkPath === '/en/'))
    ) {
      link.classList.add('active');
      const dropdownParent = link.closest('.nav-item-dropdown');
      if (dropdownParent) {
        const toggle = dropdownParent.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });

  // Resolve language switcher links dynamically based on current page
  const langLinks = document.querySelectorAll('.lang-link:not(.active)');
  const isEnPath = currentPath.startsWith('/en');
  langLinks.forEach(link => {
    if (isEnPath) {
      link.href = currentPath.replace('/en', '') || '/index.html';
    } else {
      const pathSuffix = currentPath === '/' ? '/index.html' : currentPath;
      link.href = '/en' + (pathSuffix.startsWith('/') ? pathSuffix : '/' + pathSuffix);
    }
  });
}
