# Portfolio design

Ink and Cobalt uses neutral slate surfaces, near-white or near-black ink, and one cobalt blue for actions. Project media supplies the rest of the colour. The portfolio opens in dark mode and remembers a visitor's choice of light mode.

| Role | Token | Dark | Light |
| --- | --- | --- | --- |
| Page | `--bg-canvas` | `#111317` | `#f8f9fb` |
| Panel | `--bg-surface` | `#181b21` | `#ffffff` |
| Raised or hover | `--bg-elevated` | `#21252d` | `#eef1f5` |
| Text | `--text-primary` | `#eceef2` | `#1a1d23` |
| Supporting text | `--text-secondary` | `#a9b2bf` | `#4b5463` |
| Links and focus | `--accent-text` | `#79b8ff` | `#1a52b3` |
| Primary action | `--accent-fill` | `#2260cc` | `#2260cc` |
| Selected control | `--accent-soft` | `#172a47` | `#e3edfc` |

Edit the color roles and shared controls in [src/index.css](src/index.css); the favicon in [public/favicon.svg](public/favicon.svg) repeats the dark values. Use the system sans serif, 16–24 px page gutters, 48–64 px section spacing, 6 px controls and media, and 8 px panels. Cobalt marks links, actions and selected controls only. The estimate total uses primary ink, large bold type and tabular numerals instead of a second accent. Keep text pairs at 4.5:1 or higher and control borders at 3:1 or higher in both themes.

Lead with playable project media and keep its original colors. Use plain project summaries when a poster is unavailable. Services are a rate list, the work process is an ordered list, and the estimate presents the scope and total as a quote. Give interactive controls a visible keyboard focus indicator and a minimum height of 44 px.

Keep live demo controls beside the existing project media. The playground uses one panel with request and response columns, stacked on smaller screens. Use system sans for labels and monospace for JSON, HTTP paths and status codes.

Run `npm run dev` and check the project reel, project details and estimator in both themes. Use `npm run build` for the production check.
