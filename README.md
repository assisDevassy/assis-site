# assisdevassy.com

Asi Devassy, marketing engineer. I build AI agents that do your marketing busywork.

Static site: `index.html` with inline CSS, self-hosted fonts in `fonts/`. No framework. Deployed by Netlify from this repo root.

## Brand

Agentic Growth: cream `#F5F5DE`, ink `#141414`, Fraunces (stand-in for Cooper BT) and Inter. Bricks are drawn in code, and each colour means one job:

| Brick | Job |
| --- | --- |
| Yellow | Script: same steps every time |
| Blue | Agent: calls that need judgment |
| Red | Human: signs off on anything risky |
| Green | Files: voice rules, metric rules, history |
| Orange | Schedule: runs on its own |

## Editing

Edit `tools/index.src.html`, never `index.html` by hand. Then build:

```bash
SITE_EMAIL=you@yourdomain.com python3 tools/bricks.py
```

`{{brick:<colour>:<studs>:<unit>}}` tokens become inline SVG bricks (colours `y b r g o c`). `{{email}}` becomes `SITE_EMAIL`.

## Copy rules

No em dashes, no arrows, no invented numbers. The h1 says what is sold. Every button is a verb and an object. Two "X, not Y" contrasts per page at most.
