# Portfolio design

Songket uses warm grey and maroon, inspired by Malaysian woven fabric. The portfolio opens in dark mode and remembers a visitor's choice of light mode.

| Role | Dark | Light |
| --- | --- | --- |
| Page | `#30252a` | `#f0e9e8` |
| Panel | `#403038` | `#fffafa` |
| Text | `#f6edf0` | `#302429` |
| Primary action | `#813b52` | `#702e43` |
| Estimate total | `#e4c484` | `#6a4b1a` |

Edit the color roles and shared controls in [src/index.css](src/index.css). Use the system sans serif, 16–24 px page gutters, 48–64 px section spacing, 6 px controls and media, and 8 px panels. Maroon marks actions and selected controls. Brass marks the estimate total.

Lead with playable project media and keep its original colors. Use plain project summaries when a poster is unavailable. Services are a rate list, the work process is an ordered list, and the estimate presents the scope and total as a quote. Give interactive controls a visible keyboard focus indicator and a minimum height of 44 px.

Run `npm run dev` and check the project reel, project details and estimator in both themes. Use `npm run build` for the production check.
