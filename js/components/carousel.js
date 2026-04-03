/**
 * Simple WP-friendly Image Carousel
 * Relies on native CSS scroll snapping. This JS just adds navigation arrows and dots.
 */
export function initCarousel() {
  const wrappers = document.querySelectorAll('.wp-friendly-carousel-wrapper');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const items = track.querySelectorAll('.carousel-item');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');
    const pagination = wrapper.querySelector('.carousel-pagination');

    if (!track || items.length === 0) return;

    // 1. Generate Pagiantion Dots Dynamically
    if (pagination) {
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Перейти до фото ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          // Scroll to the specific item
          items[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
        
        pagination.appendChild(dot);
      });
    }

    const dots = pagination ? pagination.querySelectorAll('.carousel-dot') : [];

    // 2. Next / Prev Buttons
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        // Scroll left by roughly one item width
        const itemWidth = items[0].getBoundingClientRect().width;
        // Adding gap estimation (using CSS gap or manual padding)
        const gap = parseInt(window.getComputedStyle(track).gap) || 16;
        track.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        // Scroll right by roughly one item width
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(track).gap) || 16;
        track.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
      });
    }

    // 3. Update Dots on Scroll (using Intersection Observer)
    if ('IntersectionObserver' in window && dots.length > 0) {
      // Find which element is closest to the center
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Find index of intersecting item
            const index = Array.from(items).indexOf(entry.target);
            if (index !== -1 && dots[index]) {
              dots.forEach(d => d.classList.remove('active'));
              dots[index].classList.add('active');
            }
          }
        });
      }, {
        root: track,
        rootMargin: '0px',
        // Fire when at least 50% of the item is visible
        threshold: 0.5 
      });

      items.forEach(item => observer.observe(item));
    } else {
      // Fallback: update on manual scroll end
      track.addEventListener('scroll', () => {
        // Simple fallback calculation
        const scrollPosition = track.scrollLeft;
        const totalWidth = track.scrollWidth - track.clientWidth;
        const maxIndex = items.length - 1;
        const index = Math.min(maxIndex, Math.max(0, Math.round((scrollPosition / totalWidth) * maxIndex)));
        
        if (dots.length > 0 && !isNaN(index)) {
          dots.forEach(d => d.classList.remove('active'));
          dots[index].classList.add('active');
        }
      });
    }
  });
}
