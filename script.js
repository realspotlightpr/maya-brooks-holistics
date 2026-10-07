document.getElementById('year').textContent = new Date().getFullYear();

const LEAD_ENDPOINT = 'https://docs.google.com/forms/d/e/1FAIpQLSdgw2I84Jf9KI2oSHvNcEKnSr4JYQXYg5jDxCvrJFYu8XBrTA/formResponse';
const LEAD_FIELDS = {
  firstName: 'entry.389109833',
  email: 'entry.123344667',
  goal: 'entry.970079197',
};
const leadDialog = document.getElementById('lead-dialog');
const leadForm = document.getElementById('lead-form');
const leadError = document.getElementById('lead-error');

function openLeadDialog() {
  if (!leadDialog) return;
  if (typeof leadDialog.showModal === 'function') leadDialog.showModal();
  else leadDialog.setAttribute('open', '');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => leadForm?.elements.firstName?.focus(), 120);
}

function closeLeadDialog() {
  if (!leadDialog) return;
  if (typeof leadDialog.close === 'function') leadDialog.close();
  else leadDialog.removeAttribute('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.checkout-link').forEach(link => {
  link.href = '#get-started';
  link.addEventListener('click', event => {
    event.preventDefault();
    openLeadDialog();
  });
});

leadDialog?.querySelector('.lead-close')?.addEventListener('click', closeLeadDialog);
leadDialog?.addEventListener('click', event => {
  if (event.target === leadDialog) closeLeadDialog();
});

leadForm?.addEventListener('submit', async event => {
  event.preventDefault();
  leadError.hidden = true;
  if (!leadForm.checkValidity()) {
    leadError.hidden = false;
    leadForm.reportValidity();
    return;
  }

  const submit = leadForm.querySelector('button[type="submit"]');
  const data = new FormData();
  Object.entries(LEAD_FIELDS).forEach(([name, entry]) => data.append(entry, leadForm.elements[name].value.trim()));
  submit.disabled = true;
  submit.firstChild.textContent = 'Saving your spot ';

  try {
    await fetch(LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', body: data });
  } catch (error) {
    console.warn('Lead submission could not be confirmed', error);
  } finally {
    sessionStorage.setItem('mayaLeadName', leadForm.elements.firstName.value.trim());
    window.location.href = 'checkout.html';
  }
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal, .float-title');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  revealItems.forEach(item => observer.observe(item));
}

const nav = document.querySelector('.nav');
const progress = document.querySelector('.progress');
let scrollTicking = false;
function updateScrollEffects() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  nav?.classList.toggle('scrolled', window.scrollY > 24);
  if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  if (!reduceMotion && window.matchMedia('(min-width: 901px)').matches) {
    const image = document.querySelector('.parallax-image');
    if (image) image.style.transform = `translateY(${Math.min(window.scrollY * 0.025, 14)}px) scale(1.02)`;
  }
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollEffects);
}, { passive: true });
updateScrollEffects();

document.querySelectorAll('.method-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const component = tab.closest('.method-component');
    component.querySelectorAll('.method-tab').forEach(item => item.setAttribute('aria-selected', String(item === tab)));
    component.querySelectorAll('.method-panel').forEach(panel => {
      panel.hidden = panel.dataset.panel !== tab.dataset.tab;
    });
  });
});

if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.magnet').forEach(button => {
    button.addEventListener('pointermove', event => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}
