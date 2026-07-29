function importHotmart() {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
  document.head.appendChild(link);

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
