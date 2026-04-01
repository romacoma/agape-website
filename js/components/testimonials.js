/**
 * Testimonials Carousel Logic
 */
export function initTestimonials() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.testimonial-arrow--next');
  const prevButton = document.querySelector('.testimonial-arrow--prev');
  const dotsContainer = document.querySelector('.testimonial-dots');
  
  if (slides.length <= 1) return; // No need for carousel

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayInterval;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    if (index === 0) dot.classList.add('is-active');
    
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
    
    dotsContainer.appendChild(dot);
  });
  
  const dots = Array.from(dotsContainer.children);

  const updateClasses = () => {
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });
    
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('is-active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('is-active');
        dot.removeAttribute('aria-current');
      }
    });
  };

  const goToSlide = (index) => {
    // Handle wrapping
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    // Move track. Each slide is 100% width
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateClasses();
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }
  
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Autoplay functionality
  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  };
  
  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };
  
  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Pause on hover/focus
  const carouselContainer = document.querySelector('.testimonials-slider');
  carouselContainer.addEventListener('mouseenter', stopAutoplay);
  carouselContainer.addEventListener('mouseleave', startAutoplay);
  carouselContainer.addEventListener('focusin', stopAutoplay);
  carouselContainer.addEventListener('focusout', startAutoplay);

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });
  
  carouselContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });
  
  const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide(); // Swiped left
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide(); // Swiped right
    }
  };

  // Initialize
  updateClasses();
  startAutoplay();
}
