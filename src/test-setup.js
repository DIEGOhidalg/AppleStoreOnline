/* eslint-env jasmine, browser */
/* global spyOn */

// src/test-setup.js

// 1) Evita que un <a href="/algo"> provoque navegación real en el runner.
document.addEventListener('click', (e) => {
  const a = e.target?.closest?.('a[href]');
  const href = a?.getAttribute?.('href') || '';
  if (href.startsWith('/')) {
    e.preventDefault();
  }
});

// 2) Blinda APIs de navegación que podrían recargar la página.
try {
  // Evita recargas
  if (typeof window.location.reload === 'function') {
    // eslint-disable-next-line no-empty-function
    window.location.reload = () => {};
  }
} catch {}

try {
  // Evita reemplazos duros de URL
  if (typeof window.location.replace === 'function') {
    // eslint-disable-next-line no-empty-function
    window.location.replace = () => {};
  }
} catch {}

// 3) Evita nuevas ventanas/pestañas reales en tests.
try {
  if (typeof window.open === 'function') {
    spyOn(window, 'open').and.returnValue(null);
  }
} catch {}

// 4) Evita mutaciones reales del histórico del navegador.
try {
  if (typeof history.pushState === 'function') {
    spyOn(history, 'pushState').and.callFake(() => {});
  }
  if (typeof history.replaceState === 'function') {
    spyOn(history, 'replaceState').and.callFake(() => {});
  }
} catch {}
