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
