function importHotmart() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
  document.head.appendChild(link);

  var override = document.createElement('style');
  override.textContent = `
    a.hotmart-fb.hotmart__button-checkout.cta-button-gold,
    a.hotmart-fb.hotmart__button-checkout.cta-button-gold:hover,
    a.hotmart-fb.hotmart__button-checkout.cta-button-gold:focus,
    a.hotmart-fb.hotmart__button-checkout.cta-button-gold:focus-visible,
    a.hotmart-fb.hotmart__button-checkout.cta-button-gold:active {
      background: var(--gold) !important;
      background-image: none !important;
      border: 1px solid var(--gold) !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      filter: none !important;
      text-shadow: none !important;
      transform: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(override);

  var imported = document.createElement('script');
  imported.src = 'https://static.hotmart.com/checkout/widget.min.js';
  imported.onload = function () {
    document.documentElement.classList.add('hotmart-widget-ready');
  };
  imported.onerror = function () {
    document.documentElement.classList.add('hotmart-widget-error');
    console.error('No fue posible cargar el widget de Hotmart.');
  };
  document.head.appendChild(imported);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', importHotmart, { once: true });
} else {
  importHotmart();
}
