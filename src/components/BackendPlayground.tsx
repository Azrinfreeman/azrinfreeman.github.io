import { useState } from 'react';
import { StripeSandbox } from './StripeSandbox';
import {
  createMockApi,
  PLAYGROUND_REQUESTS,
  type PlaygroundEndpoint,
  type PlaygroundResponse,
} from '../data/backend-playground';

const endpoints = Object.keys(PLAYGROUND_REQUESTS) as PlaygroundEndpoint[];

function sampleJson(endpoint: PlaygroundEndpoint) {
  return JSON.stringify(PLAYGROUND_REQUESTS[endpoint].example, null, 2);
}

export function BackendPlayground() {
  const [api, setApi] = useState(createMockApi);
  const [endpoint, setEndpoint] = useState<PlaygroundEndpoint>('login');
  const [body, setBody] = useState(() => sampleJson('login'));
  const [result, setResult] = useState<PlaygroundResponse>();
  const request = PLAYGROUND_REQUESTS[endpoint];
  const events = api.events();

  function selectEndpoint(nextEndpoint: PlaygroundEndpoint) {
    setEndpoint(nextEndpoint);
    setBody(sampleJson(nextEndpoint));
    setResult(undefined);
  }

  function resetPlayground() {
    setApi(createMockApi());
    selectEndpoint('login');
  }

  return (
    <section id="playground" className="page-width page-section" aria-labelledby="playground-title">
      <h2 id="playground-title" className="section-title">Backend playground</h2>
      <p className="supporting-text mt-2 max-w-2xl">
        Try a simulated API for sign-in, appointments and Stripe Checkout. Requests stay in this tab. Use sample data.
      </p>

      <div className="panel mt-5 grid min-w-0 md:grid-cols-2">
        <form
          className="grid min-w-0 content-start gap-3 p-4 sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setResult(api.send(endpoint, body));
          }}
        >
          <label htmlFor="playground-request" className="text-sm font-semibold">Request</label>
          <select
            id="playground-request"
            className="field-input w-full"
            value={endpoint}
            onChange={(event) => selectEndpoint(event.target.value as PlaygroundEndpoint)}
          >
            {endpoints.map((item) => <option key={item} value={item}>{PLAYGROUND_REQUESTS[item].label}</option>)}
          </select>
          <code className="break-all text-sm font-semibold">POST {request.path}</code>
          {(endpoint === 'appointment' || endpoint === 'checkout') && (
            <p className="supporting-text text-sm">{api.signedIn() ? 'The demo session token will be attached.' : 'Send the sign-in request first.'}</p>
          )}
          {endpoint === 'webhook' && (
            <p className="supporting-text text-sm">Create a checkout session first, then use its ID here.</p>
          )}
          <label htmlFor="playground-body" className="text-sm font-semibold">JSON body</label>
          <textarea
            id="playground-body"
            className="field-input w-full resize-y font-mono text-sm"
            rows={6}
            maxLength={4000}
            spellCheck={false}
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button type="submit" className="button button-primary">Send request</button>
            <button type="button" className="button" onClick={() => setBody(sampleJson(endpoint))}>Restore sample</button>
            <button type="button" className="text-link" onClick={resetPlayground}>Reset session</button>
          </div>
        </form>

        <div className="divider min-w-0 border-t p-4 sm:p-6 md:border-t-0 md:border-l">
          <h3 className="font-bold">Response</h3>
          <div role="status" className="mt-2 text-sm">
            {result ? (
              <>
                <p className="font-mono font-semibold">{result.status} {result.reason}</p>
                <p className="supporting-text mt-2">{result.explanation}</p>
              </>
            ) : (
              <p className="supporting-text">Send a request to see its status, headers and JSON response.</p>
            )}
          </div>
          {result && (
            <>
              <p className="supporting-text mt-4 break-all font-mono text-sm">Content-Type: application/json</p>
              <pre className="divider mt-2 max-h-64 overflow-auto rounded-md border bg-[var(--bg-canvas)] p-3 text-sm whitespace-pre-wrap break-words" tabIndex={0} aria-label="JSON response">
                {JSON.stringify(result.body, null, 2)}
              </pre>
            </>
          )}
          <h3 className="divider mt-5 border-t pt-4 font-bold">Webhook events</h3>
          {events.length ? (
            <ol className="mt-2 space-y-2 break-all font-mono text-sm">
              {events.map((event) => <li key={event.id}>{event.type} · {event.id} · {event.sessionId}</li>)}
            </ol>
          ) : (
            <p className="supporting-text mt-2 text-sm">No events recorded.</p>
          )}
        </div>
      </div>
      <StripeSandbox />
    </section>
  );
}
