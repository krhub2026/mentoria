(() => {
  'use strict';

  const WHATSAPP_NUMBER = '558193034159';
  const dialog = document.querySelector('#registration');
  const trigger = document.querySelector('.registration-trigger');
  const form = document.querySelector('#registration-form');
  const submit = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status');
  const fields = form.elements;

  function updateValidation() {
    fields.fullName.setCustomValidity(fields.fullName.value.trim().split(/\s+/).length >= 2 ? '' : 'Informe seu nome e sobrenome.');
    const digits = fields.phone.value.replace(/\D/g, '');
    const phoneIsValid = /^(?:55)?[1-9][0-9][0-9]{8,9}$/.test(digits);
    const phoneCharactersAreValid = /^[+\d\s().-]+$/.test(fields.phone.value);
    fields.phone.setCustomValidity(phoneIsValid && phoneCharactersAreValid ? '' : 'Informe um telefone com DDD (10 ou 11 dígitos), com +55 opcional.');
    for (const name of ['store', 'sales']) {
      fields[name].setCustomValidity(fields[name].value.trim() ? '' : 'Preencha este campo.');
    }
    const valid = [...form.querySelectorAll('input')].every(input => input.validity.valid);
    submit.disabled = !valid;
    status.textContent = valid ? 'Tudo pronto! Continue para o WhatsApp.' : 'Preencha todos os campos e escolha a forma de pagamento.';
  }

  trigger.addEventListener('click', () => {
    dialog.showModal();
    document.body.classList.add('modal-open');
    updateValidation();
  });
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled)')].filter(element => {
      if (element.type !== 'radio') return true;
      const group = [...form.querySelectorAll(`input[name="${element.name}"]`)];
      return element === (group.find(radio => radio.checked) || group[0]);
    });
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  let backdropPointerDown = false;
  const outsideDialog = event => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener('pointerdown', event => { backdropPointerDown = event.target === dialog && outsideDialog(event); });
  dialog.addEventListener('click', event => {
    if (backdropPointerDown && event.target === dialog && outsideDialog(event)) dialog.close();
    backdropPointerDown = false;
  });
  form.addEventListener('input', updateValidation);
  form.addEventListener('change', updateValidation);
  window.addEventListener('pageshow', updateValidation);
  form.addEventListener('submit', event => {
    event.preventDefault();
    updateValidation();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    const message = `Olá, meu nome é ${value('fullName')} e trabalho na ${value('store')}. Número: ${value('phone')} e e-mail: ${value('email')}.\n\nMinha média de vendas é ${value('sales')}.\n\nTenho interesse em me cadastrar na mentoria DNA de Vendas, no valor de R$ 497,00, com pagamento por ${value('payment')}.`;
    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  });
  updateValidation();
})();
