# Portfolio design

Soft Pastel uses a cream canvas, brown ink and peach-tinted sections. Cream is the default, and the Cocoa switch remembers the visitor's choice. Pastels sit behind the project reel. Project screenshots keep their original colours.

| Role | Token | Cream | Cocoa |
| --- | --- | --- | --- |
| Page | `--bg-canvas` | `#fff4ec` | `#211713` |
| Panel | `--bg-surface` | `#fffcf8` | `#31221b` |
| Tinted or raised surface | `--bg-elevated` | `#fae5d7` | `#3e2b23` |
| Text | `--text-primary` | `#3a2418` | `#fff0e4` |
| Supporting text | `--text-secondary` | `#75533e` | `#d4b7a5` |
| Links and focus | `--accent-text` | `#3a2418` | `#fff0e4` |
| Primary and selected controls | `--accent-fill` | `#3a2418` | `#ffe2cb` |
| Text on filled controls | `--accent-on` | `#fff4ec` | `#362118` |

Edit the colour roles and shared layouts in [src/index.css](src/index.css). Use Fraunces for display headings and prices, DM Sans for body copy and controls, and monospace for JSON and HTTP examples. Font loading and the initial theme are set in [index.html](index.html). The layout uses 16–32 px gutters, 48–72 px section padding, pill buttons, 14 px fields and 20 px cards. Give text at least 4.5:1 contrast and control outlines at least 3:1 contrast.

Lead with playable project media. The tilted hero card has a warm shadow and a dashed divider above the demo links. Cards without a poster start with the project summary. Services use a rate list, the work process uses an ordered list, and the estimator uses a tinted section with a separate quote panel. Keep controls at least 44 px high with a visible keyboard focus indicator.

Keep live demo controls beside the project media. The playground uses one panel with request and response columns that stack on smaller screens. Status colours support the written HTTP codes and explanations.

Run `npm run dev` and check the project reel, project details and estimator in both themes. Use `npm run build` for the production check.
