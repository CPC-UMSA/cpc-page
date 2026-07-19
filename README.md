# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

Plain SCSS (`app/global.scss`) plus the `@juki-team/base-ui` component library — there is no Tailwind in this project.

## Division 2 registration (Prisma + Neon)

The `/division-2` page's inscription form is backed by a Postgres database via [Prisma](https://www.prisma.io/) and [Neon](https://neon.tech).

1. Create a free Postgres database on [Neon](https://neon.tech).
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — the **pooled** connection string from your Neon dashboard (used by the app at runtime).
   - `DIRECT_DATABASE_URL` — the **unpooled/direct** connection string (used only by Prisma Migrate; if you don't have one, you can reuse `DATABASE_URL`).
3. Apply the migration:
   ```sh
   pnpm exec prisma migrate deploy
   ```
4. (Re)generate the Prisma client after any schema change:
   ```sh
   pnpm exec prisma generate
   ```

Uploaded matrícula PDFs are stored on local disk under `public/uploads/division-2` by default (only the public URL is saved in the database). Override the location with `DIVISION_2_UPLOADS_DIR` / `DIVISION_2_UPLOADS_PUBLIC_PATH` in `.env` if you deploy somewhere with an ephemeral filesystem and swap in real object storage.
