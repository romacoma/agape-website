/**
 * Utility to fetch and include HTML partials (Header/Footer)
 * Automatically detects language based on the URL.
 */
export async function loadPartials() {
  const isEnglish = window.location.pathname.includes('/en/');
  const langSuffix = isEnglish ? '-en' : '-uk';
  
  // Calculate relative path to root based on path depth
  const basePath = window.location.pathname.includes('/en/') ? '../' : './';

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

    if (headerContainer) headerContainer.innerHTML = headerHtml;
    if (footerContainer) footerContainer.innerHTML = footerHtml;

    // Update dynamically generated year in footer
    const yearEl = document.getElementById('current-year') || document.getElementById('current-year-en');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

  } catch (error) {
    console.error('Error loading partials:', error);
  }
}
