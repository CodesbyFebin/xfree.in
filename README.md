# xfree.in

Clean snapshot of the XFree marketing website:

- **`next-app/`** — the Next.js 16 app serving [www.xfree.in](https://www.xfree.in) (Vercel project `xfree-web`, root directory `next-app`).

This repo starts from a single clean commit — no prior history, no stale branches, no experimental prototypes. It carries over only what's needed to build and serve the marketing site above. XFree Studio (app.xfree.in) is a separate app and lives elsewhere.

## Development

```bash
cd next-app
npm install
npm run dev
```

See [next-app/AGENTS.md](next-app/AGENTS.md) for editor/agent notes on this subtree.
