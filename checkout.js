const CHECKOUT_URL = 'https://buy.stripe.com/7sY7sN7TS2va6Qj2OVdZ604';
const CHECKOUT_API = 'https://maya-brooks-checkout.marquemedialtd.workers.dev/create-checkout-session';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51RsTAUPZw1UaVJNEvHDyKdEzSsLEE4TijQoZkMK1G8YzyjqAZFv76C89iBKTn7vFYXBjzD50m7WRTr4HkIMRzdmj00Jy9oQhSp';
document.getElementById('year').textContent = new Date().getFullYear();
const savedName = sessionStorage.getItem('mayaLeadName');
if (savedName) document.getElementById('lead-greeting').textContent = `${savedName}, you’re one step away.`;
const status = document.getElementById('checkout-status');
const fallback = document.getElementById('checkout-fallback');
async function mountCheckout() {
  try {
    if (!window.Stripe) throw new Error('Stripe.js unavailable');
    const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
    const checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret: async () => {
        const response = await fetch(CHECKOUT_API, { method: 'POST' });
        const data = await response.json();
        if (!response.ok || !data.clientSecret) throw new Error(data.error || 'Checkout unavailable');
        return data.clientSecret;
      },
      onComplete: () => {
        status.textContent = 'Payment complete. Your Stripe receipt is on its way.';
        document.getElementById('embedded-checkout').hidden = true;
      },
    });
    status.textContent = '';
    checkout.mount('#embedded-checkout');
  } catch (error) {
    console.error('Embedded checkout failed', error);
    status.textContent = '';
    fallback.hidden = false;
    fallback.querySelector('a').href = CHECKOUT_URL;
  }
}
mountCheckout();
