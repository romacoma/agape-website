/**
 * Lightbox Gallery Component
 */
export function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  // Create lightbox DOM
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('role', 'dialog');
  
  lightbox.innerHTML = `
    <div class="lightbox__content">
      <button class="lightbox__close" aria-label="Close Lightbox">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
      <img src="" alt="" class="lightbox__image">
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">
        <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
      </button>
      <button class="lightbox__nav lightbox__nav--next" aria-label="Next image">
        <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  
  const lightboxImg = lightbox.querySelector('.lightbox__image');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  
  let currentIndex = 0;
  const itemsArray = Array.from(galleryItems);
  
  // Get high-res image source
  const getHighResSrc = (item) => {
    return item.getAttribute('href') || item.querySelector('img').getAttribute('src');
  };
  
  const openLightbox = (index) => {
    currentIndex = index;
    const item = itemsArray[currentIndex];
    const src = getHighResSrc(item);
    const alt = item.querySelector('img').getAttribute('alt') || 'Gallery Image';
    
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };
  
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  
  const showNext = () => {
    currentIndex = (currentIndex + 1) % itemsArray.length;
    openLightbox(currentIndex);
  };
  
  const showPrev = () => {
    currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
    openLightbox(currentIndex);
  };
  
  // Event Listeners
  itemsArray.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });
  
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  
  // Close on click outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__content')) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
