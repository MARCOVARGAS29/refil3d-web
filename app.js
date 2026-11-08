(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  const input = document.querySelector('#kilos');
  const amount = document.querySelector('#amount');
  // Example pilot rate. Replace with the amount established by the ReFil project.
  const bolivianosPerKg = 2;
  if (input && amount) {
    const money = new Intl.NumberFormat('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const updateEstimate = () => {
      const kg = Math.max(0, Math.min(10000, Number(input.value) || 0));
      amount.textContent = `Bs ${money.format(kg * bolivianosPerKg)}`;
    };
    input.addEventListener('input', updateEstimate);
    document.querySelectorAll('[data-kg]').forEach(button => button.addEventListener('click', () => {
      input.value = button.dataset.kg;
      updateEstimate();
      input.focus();
    }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.13 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }
})();
