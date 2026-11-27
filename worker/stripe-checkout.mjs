const STRIPE_SESSIONS = 'https://api.stripe.com/v1/checkout/sessions';
const CHECKOUT_ORIGIN = 'https://checkout.stripe.com';
const SESSION_FORMAT = /^cs_test_[a-zA-Z0-9]+$/;

function getCheckoutUrl(value) {
  if (typeof value !== 'string') {
    return null;
  }
  try {
    const url = new URL(value);
    if (url.origin === CHECKOUT_ORIGIN && !url.username && !url.password) {
      return url.href;
    }
  } catch {
    return null;
  }
  return null;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const headers = { 'Cache-Control': 'no-store', Vary: 'Origin' };
    const reply = (body, status) => Response.json(body, { status, headers });
    if (!origin || origin !== env.PORTFOLIO_ORIGIN) {
      return reply({ error: 'Origin is outside the portfolio.' }, 403);
    }
    headers['Access-Control-Allow-Origin'] = origin;

    const url = new URL(request.url);
    if (url.pathname !== '/stripe/checkout') {
      return reply({ error: 'Route not found.' }, 404);
    }
    if (request.method === 'OPTIONS') {
      headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== 'POST' && request.method !== 'GET') {
      headers.Allow = 'GET, POST, OPTIONS';
      return reply({ error: 'Method not allowed.' }, 405);
    }

    const key = env.STRIPE_TEST_KEY;
    const priceId = env.STRIPE_TEST_PRICE_ID;
    if (!/^rk_test_[a-zA-Z0-9]+$/.test(key ?? '') || !/^price_[a-zA-Z0-9]+$/.test(priceId ?? '')) {
      return reply({ error: 'The Stripe sandbox is unavailable.' }, 503);
    }
    const address = request.headers.get('CF-Connecting-IP');
    if (!address || !env.CHECKOUT_LIMIT) {
      return reply({ error: 'The Stripe sandbox is unavailable.' }, 503);
    }

    const createSession = request.method === 'POST';
    const sessionId = url.searchParams.get('session_id');
    if (!createSession && !SESSION_FORMAT.test(sessionId ?? '')) {
      return reply({ error: 'Enter a Stripe test session ID.' }, 400);
    }

    try {
      const limit = await env.CHECKOUT_LIMIT.limit({ key: address });
      if (!limit.success) {
        headers['Retry-After'] = '60';
        return reply({ error: 'Too many requests. Try again in a minute.' }, 429);
      }

      const options = {
        method: request.method,
        headers: { Authorization: `Bearer ${key}` },
        redirect: 'error',
        signal: AbortSignal.timeout(10000),
      };
      let stripeUrl = STRIPE_SESSIONS;

      if (createSession) {
        options.body = new URLSearchParams({
          mode: 'subscription',
          'line_items[0][price]': priceId,
          'line_items[0][quantity]': '1',
          'payment_method_types[0]': 'card',
          'metadata[portfolio_demo]': 'true',
          success_url: `${origin}/?stripe_demo={CHECKOUT_SESSION_ID}#playground`,
          cancel_url: `${origin}/#playground`,
        });
      } else {
        stripeUrl = `${STRIPE_SESSIONS}/${sessionId}`;
      }

      const upstream = await fetch(stripeUrl, options);
      if (upstream.status === 404 && !createSession) {
        return reply({ error: 'Demo session not found.' }, 404);
      }
      if (!upstream.ok) {
        return reply({ error: 'Stripe could not complete the request.' }, 502);
      }
      const session = await upstream.json();
      if (session.livemode !== false || !SESSION_FORMAT.test(session.id ?? '') || session.metadata?.portfolio_demo !== 'true') {
        return reply({ error: 'The response was outside the Stripe sandbox demo.' }, 502);
      }

      if (createSession) {
        const checkoutUrl = getCheckoutUrl(session.url);
        if (!checkoutUrl) {
          return reply({ error: 'Stripe did not return a usable Checkout URL.' }, 502);
        }
        return reply({ id: session.id, checkoutUrl }, 201);
      }

      return reply({ id: session.id, status: session.status, paymentStatus: session.payment_status }, 200);
    } catch {
      return reply({ error: 'The Stripe sandbox could not be reached.' }, 502);
    }
  },
};
