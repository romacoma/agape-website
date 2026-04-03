/**
 * Utility to fetch and include HTML partials (Header/Footer)
 * Automatically detects language based on the URL.
 */
export async function loadPartials() {
  const path = window.location.pathname;
  const isEnglish = path.includes('/en/');
  const langSuffix = isEnglish ? '-en' : '-uk';
  
  // Simple depth detection to work everywhere (Local, GitHub, etc.)
  const currentDepth = isEnglish ? 1 : 0;
  const basePath = currentDepth > 0 ? '../'.repeat(currentDepth) : './';

  const headerPath = `${basePath}partials/header${langSuffix}.html`;
  const footerPath = `${basePath}partials/footer${langSuffix}.html`;

  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch(headerPath),
      fetch(footerPath)
    ]);

    if (!headerRes.ok) throw new Error(`Failed to load header: ${headerRes.status}`);
    if (!footerRes.ok) throw new Error(`Failed to load footer: ${footerRes.status}`);

    const headerHtml = await headerRes.text();
    const footerHtml = await footerRes.text();

    const headerContainer = document.getElementById('site-header');
    const footerContainer = document.getElementById('site-footer');

    if (headerContainer) {
      headerContainer.innerHTML = headerHtml;
      adjustRelativePaths(headerContainer, basePath);
    }
    if (footerContainer) {
      footerContainer.innerHTML = footerHtml;
      adjustRelativePaths(footerContainer, basePath);
    }

    // Update dynamically generated year in footer
    const yearEl = document.getElementById('current-year') || document.getElementById('current-year-en');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

  } catch (error) {
    console.error('Error loading partials:', error);
  }
}

/**
 * Adjusts relative paths in a container to work from subdirectories
 */
function adjustRelativePaths(container, basePath) {
  if (basePath === './') return; // Already at root

  // Fix links
  container.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('/')) {
      link.setAttribute('href', basePath + href);
    }
  });

  // Fix images
  container.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('/')) {
      img.setAttribute('src', basePath + src);
    }
  });
}
