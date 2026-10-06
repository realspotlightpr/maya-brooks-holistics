document.getElementById('year').textContent = new Date().getFullYear();

const CHECKOUT_URL = 'https://buy.stripe.com/7sY7sN7TS2va6Qj2OVdZ604';
document.querySelectorAll('.checkout-link').forEach(link => {
  link.href = CHECKOUT_URL;
  link.target = '_blank';
  link.rel = 'noopener';
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
