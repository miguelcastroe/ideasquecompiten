function importSiteIcon() {
  if (document.querySelector('link[rel="icon"]')) return;

  var favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = 'favicon.svg';
  document.head.appendChild(favicon);
}

function importPlausible() {
  if (!document.querySelector('script[src="https://plausible.io/js/pa-TMhx3FA17KuWE18ExmuQ0.js"]')) {
    var analytics = document.createElement('script');
    analytics.async = true;
    analytics.src = 'https://plausible.io/js/pa-TMhx3FA17KuWE18ExmuQ0.js';
    document.head.appendChild(analytics);
  }

  window.plausible = window.plausible || function () {
    (plausible.q = plausible.q || []).push(arguments);
  };
  plausible.init = plausible.init || function (options) {
    plausible.o = options || {};
  };
  plausible.init();
}

function importAwardsStyles() {
  if (document.querySelector('link[href="styles-components-awards.css"]')) return;

  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'styles-components-awards.css';
  document.head.appendChild(stylesheet);
}

function insertAnnouncementBar() {
  if (document.querySelector('.announcement-bar')) return;

  var header = document.querySelector('.site-header');
  if (!header) return;

  var bar = document.createElement('aside');
  bar.className = 'announcement-bar';
  bar.setAttribute('aria-label', 'Anuncio de primera edición');
  bar.innerHTML = '<p><span><strong>Primera edición</strong> · Precio especial <strong>S/280 / US$83</strong> <span class="announcement-regular">(regular S/520 / US$172)</span></span><a href="postulacion-beca.html">4 becas del 50% disponibles <span aria-hidden="true">→</span></a></p>';
  header.parentNode.insertBefore(bar, header);
}

function insertAwardsCarousel() {
  if (document.querySelector('.profile-awards')) return;

  var profile = document.getElementById('miguel');
  var profileCopy = profile && profile.querySelector('.prose');
  if (!profileCopy) return;

  var assetBase = 'https://raw.githubusercontent.com/miguelcastroe/workshop/main/';
  var awards = [
    { file: 'awards_clio.svg', name: 'CLIO', className: 'profile-award-clio' },
    { file: 'awards_cannes.svg', name: 'Cannes Lions', className: 'profile-award-cannes' },
    { file: 'awards_oneshow.svg', name: 'The One Show', className: 'profile-award-oneshow' },
    { file: 'awards_ojo.svg', name: 'El Ojo de Iberoamérica', className: 'profile-award-ojo' },
    { file: 'awards_newyork.svg', name: 'New York Festivals', className: 'profile-award-newyork' },
    { file: 'awards_lia.svg', name: 'LIA', className: 'profile-award-lia' },
    { file: 'awards_dad.svg', name: 'D&AD', className: 'profile-award-dad' }
  ];

  function renderGroup(hidden) {
    var images = awards.map(function (award) {
      var alt = hidden ? '' : award.name;
      return '<img class="profile-award-logo ' + award.className + '" src="' + assetBase + award.file + '" alt="' + alt + '" loading="lazy" decoding="async">';
    }).join('');

    return '<div class="profile-awards-group"' + (hidden ? ' aria-hidden="true"' : '') + '>' + images + '</div>';
  }

  var carousel = document.createElement('div');
  carousel.className = 'profile-awards';
  carousel.setAttribute('aria-label', 'Premios y reconocimientos');
  carousel.innerHTML =
    '<p class="profile-awards-label">Premios y reconocimientos</p>' +
    '<div class="profile-awards-marquee">' +
      '<div class="profile-awards-track">' + renderGroup(false) + renderGroup(true) + '</div>' +
    '</div>';

  profileCopy.insertAdjacentElement('afterend', carousel);
}

function configureCheckoutLinks() {
  var checkoutUrl = 'https://pay.hotmart.com/L106815370Q?checkoutMode=2';
  ['payment_button_top', 'payment_button_bottom'].forEach(function (id) {
    var link = document.getElementById(id);
    if (link) link.href = checkoutUrl;
  });
}

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

function startSite() {
  importAwardsStyles();
  insertAnnouncementBar();
  insertAwardsCarousel();
  configureCheckoutLinks();
  importHotmart();
}

importSiteIcon();
importPlausible();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startSite, { once: true });
} else {
  startSite();
}
