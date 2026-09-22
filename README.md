# xfree.in

Clean snapshot of the XFree marketing website:

- **`next-app/`** — the Next.js 16 app serving [www.xfree.in](https://www.xfree.in) (Vercel project `xfree-web`, root directory `next-app`).

This repo starts from a single clean commit — no prior history, no stale branches, no experimental prototypes. It carries over only what's needed to build and serve the marketing site above. XFree Studio (app.xfree.in) is a separate app and lives elsewhere.

This replaces `CodesbyFebin/xfree` as the source repo for the `xfree-web` Vercel project. That older repo still exists but is no longer deployed from for this site.

Deployments require GitHub-verified commits (Vercel project setting: Require Verified Commits). A plain `git push` to `main` will be built but then automatically canceled if the commit isn't verified — merge changes in through a pull request instead, so the merge commit (which GitHub verifies) is what lands on `main`.

## Development

```bash
cd next-app
npm install
npm run dev
```

See [next-app/AGENTS.md](next-app/AGENTS.md) for editor/agent notes on this subtree.
