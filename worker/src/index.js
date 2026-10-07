const PRICE_ID = "price_1UNYFOPZw1UaVJNElbCRYicY";
const ALLOWED_ORIGINS = new Set([
  "https://realspotlightpr.github.io",
  "https://mayaholistics.world",
  "https://www.mayaholistics.world",
]);

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST" || new URL(request.url).pathname !== "/create-checkout-session") {
      return json({ error: "Not found" }, 404, origin);
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return json({ error: "Origin not allowed" }, 403, origin);
    }

    if (!env.STRIPE_SECRET_KEY) {
      return json({ error: "Checkout is not configured" }, 503, origin);
    }

    const returnUrl = `${origin}/maya-brooks-holistics/checkout.html?checkout=return&session_id={CHECKOUT_SESSION_ID}`;
    const form = new URLSearchParams({
      mode: "payment",
      ui_mode: "embedded",
      "line_items[0][price]": PRICE_ID,
      "line_items[0][quantity]": "1",
      return_url: returnUrl,
      redirect_on_completion: "if_required",
      "automatic_tax[enabled]": "true",
    });

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    });

    const session = await stripeResponse.json();
    if (!stripeResponse.ok || !session.client_secret) {
      console.error("Stripe session error", session.error?.type, session.error?.code);
      return json({ error: "Unable to start checkout" }, 502, origin);
    }

    return json({ clientSecret: session.client_secret }, 200, origin);
  },
};
