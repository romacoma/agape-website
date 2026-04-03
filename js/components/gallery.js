/**
 * Lightbox Gallery Component
 */
export function initGallery() {
  const allGalleryItems = document.querySelectorAll('.gallery-item');
  if (allGalleryItems.length === 0) return;

  // Create lightbox DOM (Singleton)
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
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
  }

  const lightboxImg = lightbox.querySelector('.lightbox__image');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  
  let currentItems = [];
  let currentIndex = 0;

  const openLightbox = (items, index) => {
    currentItems = items;
    currentIndex = index;
    const item = currentItems[currentIndex];
    const src = item.getAttribute('href') || item.querySelector('img').getAttribute('src');
    const alt = item.querySelector('img').getAttribute('alt') || 'Gallery Image';
    
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    if (currentItems.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentItems.length;
    openLightbox(currentItems, currentIndex);
  };

  const showPrev = () => {
    if (currentItems.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    openLightbox(currentItems, currentIndex);
  };

  // Setup listeners and grouping
  allGalleryItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const groupName = item.getAttribute('data-gallery');
      let groupItems;
      
      if (groupName) {
        groupItems = Array.from(document.querySelectorAll(`.gallery-item[data-gallery="${groupName}"]`));
      } else {
        // Find items in the same container if no group name is provided
        const parent = item.closest('.gallery-grid, .carousel-track') || document.body;
        groupItems = Array.from(parent.querySelectorAll('.gallery-item:not([data-gallery])'));
      }
      
      const indexWithinGroup = groupItems.indexOf(item);
      openLightbox(groupItems, indexWithinGroup);
    });
  });

  closeBtn.onclick = closeLightbox;
  nextBtn.onclick = showNext;
  prevBtn.onclick = showPrev;

  lightbox.onclick = (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox__content')) {
      closeLightbox();
    }
  };

  document.onkeydown = (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  };
}
