/**
 * Lightbox utility for image galleries
 */
export function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  // Create lightbox markup
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Закрити">&times;</button>
      <img class="lightbox-image" src="" alt="">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const openLightbox = (e) => {
    e.preventDefault();
    const link = e.currentTarget;
    const fullImgPath = link.href;
    const imgAlt = link.querySelector('img')?.alt || '';

    lightboxImage.src = fullImgPath;
    lightboxImage.alt = imgAlt;
    lightboxCaption.textContent = imgAlt;

    lightbox.classList.add('is-active');
    document.body.classList.add('lightbox-open');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    document.body.classList.remove('lightbox-open');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      lightboxImage.src = '';
    }, 300);
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', openLightbox);
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}
