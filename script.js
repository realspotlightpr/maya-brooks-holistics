document.getElementById('year').textContent = new Date().getFullYear();

// Set after the Stripe Payment Link is created.
const CHECKOUT_URL = 'https://buy.stripe.com/7sY7sN7TS2va6Qj2OVdZ604';

if (CHECKOUT_URL) {
  document.querySelectorAll('.checkout-link').forEach(link => {
    link.href = CHECKOUT_URL;
    link.target = '_blank';
    link.rel = 'noopener';
  });
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('in-view'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach(item => observer.observe(item));
  }
}
