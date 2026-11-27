import { useEffect, useState } from 'react';

function readWorkerEndpoint() {
  try {
    const address = import.meta.env.VITE_STRIPE_DEMO_WORKER;
    const url = new URL(address);
    if (url.protocol === 'https:' && !url.username && !url.password) {
      return new URL('/stripe/checkout', url).href;
    }
  } catch {
    return null;
  }
  return null;
}

const workerEndpoint = readWorkerEndpoint();

export function StripeSandbox() {
  const [returnSessionId] = useState(() => new URLSearchParams(window.location.search).get('stripe_demo'));
  const [checkoutUrl, setCheckoutUrl] = useState<string>();
  const [checkoutId, setCheckoutId] = useState<string>();
  const [creating, setCreating] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!workerEndpoint || !returnSessionId || !/^cs_test_[a-zA-Z0-9]+$/.test(returnSessionId)) {
      return;
    }

    const controller = new AbortController();
    const url = new URL(workerEndpoint);
    url.searchParams.set('session_id', returnSessionId);
    async function readStatus() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        const payload = await response.json();
        if (!response.ok) {
          setStatus(payload.error ?? 'Could not check the test session.');
        } else if (payload.status === 'complete' && payload.paymentStatus === 'paid') {
          setStatus('Stripe confirmed the test payment.');
        } else {
          setStatus('Stripe has no completed test payment for this session.');
        }
      } catch {
        if (!controller.signal.aborted) {
          setStatus('Could not check the test session.');
        }
      }
    }
    void readStatus();
    return () => controller.abort();
  }, [returnSessionId]);

  async function createCheckout() {
    if (!workerEndpoint || creating) {
      return;
    }
    setCreating(true);
    setCheckoutUrl(undefined);
    setCheckoutId(undefined);
    setStatus('');
    try {
      const response = await fetch(workerEndpoint, { method: 'POST' });
      const payload = await response.json();
      if (!response.ok) {
        setStatus(payload.error ?? 'Could not create the test session.');
        return;
      }
      const url = new URL(payload.checkoutUrl);
      if (url.origin !== 'https://checkout.stripe.com' || url.username || url.password) {
        setStatus('Stripe returned an unexpected Checkout URL.');
        return;
      }
      setCheckoutUrl(url.href);
      setCheckoutId(payload.id);
      setStatus('Stripe created a test Checkout session.');
    } catch {
      setStatus('Could not create the test session.');
    } finally {
      setCreating(false);
    }
  }

  if (!workerEndpoint) {
    return null;
  }

  return (
    <section className="divider mt-6 border-t pt-5" aria-labelledby="stripe-sandbox-title">
      <h3 className="font-bold" id="stripe-sandbox-title">Stripe test checkout</h3>
      <p className="supporting-text mt-2 text-sm">Use test card 4242 4242 4242 4242, any future expiry date and any three-digit CVC. Use fictional contact details.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="button" onClick={createCheckout} disabled={creating}>
          {creating ? 'Creating test session…' : 'Create a test session'}
        </button>
        {checkoutUrl && <a href={checkoutUrl} rel="noreferrer" className="button button-primary">Continue to Stripe</a>}
      </div>
      <p role="status" className="supporting-text mt-2 text-sm">{status}</p>
      {checkoutId && <code className="mt-1 block break-all text-sm">{checkoutId}</code>}
    </section>
  );
}
