# Simple Image Carousel Design Spec

## Overview
A simple, modern, and lightweight image carousel (slider) for the Rehabilitation page to showcase facilities and processes. The primary architectural constraint is that the HTML structure must be highly compatible with a future migration to WordPress (e.g., easily integrated with ACF Repeater fields or Gutenberg Gallery blocks).

## Goals
- Replace the static gallery grid on the Rehabilitation page with a dynamic carousel.
- Ensure easy future integration into a WordPress PHP template.
- Provide a smooth, accessible user experience on both desktop (arrows/dots) and mobile (touch swipe).

## Proposed Architecture

### 1. WordPress-Ready HTML Structure
The HTML will use a flat, loopable structure. This ensures that a future WordPress developer can simply wrap the inner items in a `foreach` loop (e.g., iterating over post attachments or ACF fields).

```html
<div class="wp-friendly-carousel-wrapper">
  <div class="carousel-track" id="rehabCarouselTrack">
    <!-- WP LOOP START -->
    <div class="carousel-item">
      <img src="photo-1.jpg" alt="Description" loading="lazy">
    </div>
    <div class="carousel-item">
      <img src="photo-2.jpg" alt="Description" loading="lazy">
    </div>
    <!-- WP LOOP END -->
  </div>
  
  <!-- Navigation Controls -->
  <button class="carousel-btn prev" aria-label="Previous image">←</button>
  <button class="carousel-btn next" aria-label="Next image">→</button>
  
  <!-- Pagination Dots (Can be generated dynamically via JS based on item count) -->
  <div class="carousel-pagination"></div>
</div>
```

### 2. Styling (CSS) - `css/components/carousel.css`
- **Scroll Snapping:** We will use native CSS Scroll Snapping (`scroll-snap-type: x mandatory`) on the `.carousel-track`. This is the most modern, performant way to build carousels as it relies on the browser's native scrolling engine (perfect for mobile touch).
- **Responsive:** 
  - Mobile: Shows 1 full image at a time.
  - Desktop: Shows 2 or 3 images at a time depending on the container, or 1 large centered image (we will use CSS custom properties to manage this).

### 3. Logic (Vanilla JS) - `js/components/carousel.js`
- **Minimal Footprint:** No external dependencies (like Slick, Swiper, or jQuery).
- **Functionality:** 
  - Attach click listeners to Next/Prev buttons to scroll the track by `clientWidth`.
  - Automatically calculate and generate the pagination dots based on the number of `.carousel-item` elements (this means WordPress only needs to output the images; the JS handles the UI controls dynamically).
- **Intersection Observer:** An observer can be used to update the "active" pagination dot based on which image is currently snapped into view.

## Integration Plan
1. Create `css/components/carousel.css` and link it in `rehabilitation.html`.
2. Create `js/components/carousel.js` and initialize it in `js/main.js`.
3. Replace the existing `.gallery-grid` markup in `rehabilitation.html` with the new carousel structure and add placeholder images (from Unsplash).
4. Ensure the `.animate-on-scroll` class is applied to the wrapper to maintain consistency with the rest of the page.
