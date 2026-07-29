(() => {
  'use strict';

  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = 'favicon.svg';
    document.head.appendChild(favicon);
  }

  if (!document.querySelector('script[src="https://plausible.io/js/pa-TMhx3FA17KuWE18ExmuQ0.js"]')) {
    const analytics = document.createElement('script');
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

  const header = document.querySelector('.site-header');
  if (header && !document.querySelector('.announcement-bar')) {
    const bar = document.createElement('aside');
    bar.className = 'announcement-bar';
    bar.setAttribute('aria-label', 'Anuncio de primera edición');
    bar.innerHTML = '<p><span><strong>Primera edición</strong> · Precio especial <strong>S/280 / US$83</strong> <span class="announcement-regular">(regular S/520 / US$172)</span></span><a href="#scholarshipForm">4 becas del 50% disponibles <span aria-hidden="true">→</span></a></p>';
    header.parentNode.insertBefore(bar, header);
  }

  const form = document.getElementById('scholarshipForm');
  const submitButton = document.getElementById('submitButton');
  const buttonLabel = submitButton.querySelector('.button-label');
  const status = document.getElementById('formStatus');
  const successPanel = document.getElementById('successPanel');
  const submittedAt = document.getElementById('submittedAt');
  const formUrl = document.getElementById('formUrl');
  const originalButtonLabel = buttonLabel.textContent;

  document.querySelectorAll('textarea[data-counter]').forEach((textarea) => {
    const counter = document.getElementById(textarea.dataset.counter);
    const updateCounter = () => {
      counter.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
    };
    textarea.addEventListener('input', updateCounter);
    updateCounter();
  });

  const setSubmitting = (isSubmitting) => {
    submitButton.disabled = isSubmitting;
    buttonLabel.textContent = isSubmitting ? 'Enviando…' : originalButtonLabel;
    form.setAttribute('aria-busy', String(isSubmitting));
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    status.classList.remove('error');

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Revisa los campos obligatorios antes de enviar.';
      status.classList.add('error');
      return;
    }

    const honeypot = document.getElementById('website');
    if (honeypot.value) return;

    setSubmitting(true);
    submittedAt.value = new Intl.DateTimeFormat('es-PE', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'America/Lima'
    }).format(new Date());

    formUrl.value = window.location.href;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload._replyto = document.getElementById('email').value.trim();

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      let result = null;
      try { result = await response.json(); } catch (_) { /* respuesta no JSON */ }

      if (!response.ok || (result && result.success === false)) {
        throw new Error('Submission failed');
      }

      form.hidden = true;
      successPanel.classList.add('visible');
      successPanel.focus();
      window.scrollTo({ top: successPanel.offsetTop - 40, behavior: 'smooth' });
    } catch (error) {
      status.innerHTML = 'No pudimos enviar la postulación. Inténtalo nuevamente o escribe a <a href="mailto:miguel@miguelcastro.works">miguel@miguelcastro.works</a>.';
      status.classList.add('error');
      setSubmitting(false);
    }
  });
})();
