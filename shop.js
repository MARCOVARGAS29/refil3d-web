(() => {
  const quantity = document.querySelector('#roll-quantity');
  const total = document.querySelector('#roll-total');
  const feedback = document.querySelector('#order-feedback');
  const pricePerRoll = 570;
  if (!quantity || !total) return;

  const formatBs = value => `Bs ${new Intl.NumberFormat('es-BO', { maximumFractionDigits: 0 }).format(value)}`;
  const getQuantity = () => Math.max(1, Math.floor(Number(quantity.value) || 1));
  const update = () => {
    quantity.value = String(getQuantity());
    total.textContent = formatBs(getQuantity() * pricePerRoll);
    if (feedback) feedback.textContent = '';
  };

  quantity.addEventListener('input', update);
  document.querySelector('#qty-minus')?.addEventListener('click', () => {
    quantity.value = String(Math.max(1, getQuantity() - 1));
    update();
  });
  document.querySelector('#qty-plus')?.addEventListener('click', () => {
    quantity.value = String(getQuantity() + 1);
    update();
  });
  document.querySelector('#add-roll')?.addEventListener('click', () => {
    if (feedback) feedback.textContent = `${getQuantity()} ${getQuantity() === 1 ? 'rollo agregado' : 'rollos agregados'} · ${formatBs(getQuantity() * pricePerRoll)}. Coordina tu pedido con ReFil.`;
  });

  const selectedColor = document.querySelector('#selected-color');
  document.querySelectorAll('.color-option').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.color-option').forEach(option => {
      const selected = option === button;
      option.classList.toggle('selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    if (selectedColor) selectedColor.textContent = button.dataset.color;
  }));
  update();
})();
