import { loadPartials } from './utils/include.js';
import { initHeader } from './components/header.js';
import { initAnimations } from './components/animations.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Load Header and Footer first
  await loadPartials();

  // 2. Initialize Shared Components
  initHeader();
  initAnimations();

  // 3. Initialize Page-Specific Components based on data-page attribute
  const pageType = document.body.dataset.page;
  
  if (pageType === 'home') {
    // Dynamically import testimonials to save bandwidth on other pages
    // Will be created in Phase 3
    /*
    import('./components/testimonials.js').then(module => {
      module.initTestimonials();
    }).catch(err => console.error("Could not load testimonials.js", err));
    */
  }
  
  if (pageType === 'rehabilitation' || pageType === 'activities' || pageType === 'activities-sub' || pageType === 'gallery') {
    // Dynamically import gallery
    import('./components/gallery.js').then(module => {
      module.initGallery();
    }).catch(err => console.error("Could not load gallery.js", err));
  }
  
  if (pageType === 'rehabilitation') {
    // Dynamically import carousel for the top section
    import('./components/carousel.js').then(module => {
      module.initCarousel();
    }).catch(err => console.error("Could not load carousel.js", err));
  }
});
