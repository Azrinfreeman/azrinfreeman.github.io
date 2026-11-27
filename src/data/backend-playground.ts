export const DEMO_EMAIL = 'demo@example.com';
export const DEMO_PASSWORD = 'portfolio-demo';
const DEMO_TOKEN = 'demo-session';

export const PLAYGROUND_REQUESTS = {
  login: {
    label: 'Laravel sign-in',
    path: '/api/login',
    example: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
  },
  appointment: {
    label: 'Book an appointment',
    path: '/api/appointments',
    example: { customer: 'Nur Aina', starts_at: '2027-04-15T02:00:00Z' },
  },
  checkout: {
    label: 'Create a Stripe Checkout session',
    path: '/api/checkout/sessions',
    example: { plan: 'monthly' },
  },
  webhook: {
    label: 'Replay a Stripe webhook',
    path: '/api/stripe/webhook',
    example: { id: 'evt_demo_001', type: 'checkout.session.completed', session_id: 'cs_demo_1' },
  },
};

export type PlaygroundEndpoint = keyof typeof PLAYGROUND_REQUESTS;

const STATUS_LABELS = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Content',
};

function response(status: keyof typeof STATUS_LABELS, body: object, explanation: string) {
  return { status, reason: STATUS_LABELS[status], body, explanation };
}

export type PlaygroundResponse = ReturnType<typeof response>;

export interface WebhookEvent {
  id: string;
  sessionId: string;
  type: string;
}

export function createMockApi() {
  const appointments = new Set<number>();
  const sessions = new Set<string>();
  const events = new Map<string, WebhookEvent>();
  let signedIn = false;

  return {
    events: () => Array.from(events.values()),
    signedIn: () => signedIn,
    send(endpoint: PlaygroundEndpoint, json: string): PlaygroundResponse {
      let payload: unknown;
      try {
        payload = JSON.parse(json);
      } catch {
        return response(400, { message: 'Malformed JSON.' }, 'Check quotation marks, brackets and trailing commas.');
      }

      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        return response(422, { message: 'Send a JSON object.' }, 'The request body must contain named fields.');
      }
      const fields = payload as Record<string, unknown>;

      if (endpoint === 'login') {
        if (fields.email !== DEMO_EMAIL || fields.password !== DEMO_PASSWORD) {
          return response(401, { message: 'Invalid demo credentials.' }, 'Restore the sample request to sign in.');
        }
        signedIn = true;
        return response(200, { token: DEMO_TOKEN, token_type: 'Bearer' }, 'The simulator will attach this session token to appointments and checkout.');
      }

      if (endpoint === 'webhook') {
        const { id, type, session_id: sessionId } = fields;
        if (typeof id !== 'string' || !id.trim() || type !== 'checkout.session.completed' || typeof sessionId !== 'string') {
          return response(422, { message: 'Provide an event ID, a checkout.session.completed type and a session ID.' }, 'Choose the sample payload for a checkout completion event.');
        }
        if (events.has(id)) {
          return response(200, { received: true, duplicate: true }, 'The event ID was processed earlier, so the subscription was left as-is.');
        }
        if (!sessions.has(sessionId)) {
          return response(404, { message: 'Checkout session not found.' }, 'Create a checkout session first and use its ID in session_id.');
        }
        events.set(id, { id, type, sessionId });
        return response(200, { received: true, subscription: 'active' }, 'The simulator recorded the event and returned the subscription status.');
      }

      if (!signedIn) {
        return response(401, { message: 'Sign-in required.' }, 'Send the Laravel sign-in request to start a session.');
      }

      if (endpoint === 'appointment') {
        const startsAt = fields.starts_at;
        const customer = fields.customer;
        const time = typeof startsAt === 'string' ? Date.parse(startsAt) : NaN;
        const isoDateTime = typeof startsAt === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(startsAt);
        if (typeof customer !== 'string' || !customer.trim() || !isoDateTime || !Number.isFinite(time)) {
          return response(422, { message: 'Provide a customer name and a UTC start time in ISO 8601 format.' }, 'Use the sample request to see the expected fields and format.');
        }
        const normalizedTime = new Date(time).toISOString().replace('.000Z', 'Z');
        if (normalizedTime !== startsAt) {
          return response(422, { message: 'Provide a valid calendar date and time.' }, 'Use a valid UTC date for the appointment.');
        }
        if (appointments.has(time)) {
          return response(409, { message: 'That appointment slot is already booked.' }, 'Choose a different start time or reset the session.');
        }
        appointments.add(time);
        return response(201, { id: `appt_demo_${appointments.size}`, customer: customer.trim(), starts_at: normalizedTime }, 'The simulator reserved the slot. Sending the same time again returns a conflict.');
      }

      if (fields.plan !== 'monthly') {
        return response(422, { message: 'Choose the monthly demo plan.' }, 'The checkout example accepts the monthly plan.');
      }
      const sessionId = `cs_demo_${sessions.size + 1}`;
      sessions.add(sessionId);
      return response(201, { id: sessionId, mode: 'subscription', status: 'open' }, 'Use this session ID in the webhook request to simulate a completed checkout.');
    },
  };
}
