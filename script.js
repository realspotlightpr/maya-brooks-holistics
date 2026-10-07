document.getElementById('year').textContent = new Date().getFullYear();

const CHECKOUT_URL = 'https://buy.stripe.com/7sY7sN7TS2va6Qj2OVdZ604';
const CHECKOUT_API = 'https://maya-brooks-checkout.marquemedialtd.workers.dev/create-checkout-session';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51RsTAUPZw1UaVJNEvHDyKdEzSsLEE4TijQoZkMK1G8YzyjqAZFv76C89iBKTn7vFYXBjzD50m7WRTr4HkIMRzdmj00Jy9oQhSp';
const checkoutDialog = document.getElementById('checkout-dialog');
const checkoutStatus = document.getElementById('checkout-status');
const checkoutFallback = document.getElementById('checkout-fallback');
let embeddedCheckout;
let checkoutLoading = false;

function openCheckoutDialog() {
  if (!checkoutDialog) return;
  if (typeof checkoutDialog.showModal === 'function') checkoutDialog.showModal();
  else checkoutDialog.setAttribute('open', '');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutDialog() {
  if (!checkoutDialog) return;
  if (typeof checkoutDialog.close === 'function') checkoutDialog.close();
  else checkoutDialog.removeAttribute('open');
  document.body.style.overflow = '';
}

async function startEmbeddedCheckout() {
  if (embeddedCheckout || checkoutLoading) return;
  checkoutLoading = true;
  checkoutStatus.textContent = 'Preparing secure checkout…';
  checkoutFallback.hidden = true;

  try {
    if (!window.Stripe) throw new Error('Stripe.js unavailable');
    const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
    embeddedCheckout = await stripe.initEmbeddedCheckout({
      fetchClientSecret: async () => {
        const response = await fetch(CHECKOUT_API, { method: 'POST' });
        const data = await response.json();
        if (!response.ok || !data.clientSecret) throw new Error(data.error || 'Checkout unavailable');
        return data.clientSecret;
      },
      onComplete: () => {
        checkoutStatus.textContent = 'Payment complete. A Stripe receipt is on its way to your email.';
        document.getElementById('embedded-checkout').hidden = true;
      },
    });
    checkoutStatus.textContent = '';
    embeddedCheckout.mount('#embedded-checkout');
  } catch (error) {
    console.error('Embedded checkout failed', error);
    checkoutStatus.textContent = '';
    checkoutFallback.hidden = false;
  } finally {
    checkoutLoading = false;
  }
}

document.querySelectorAll('.checkout-link').forEach(link => {
  link.href = CHECKOUT_URL;
  link.addEventListener('click', event => {
    event.preventDefault();
    openCheckoutDialog();
    startEmbeddedCheckout();
  });
});

checkoutDialog?.querySelector('.checkout-close')?.addEventListener('click', closeCheckoutDialog);
checkoutDialog?.addEventListener('click', event => {
  if (event.target === checkoutDialog) closeCheckoutDialog();
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
