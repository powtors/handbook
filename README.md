# Handbook

This is a blog built with svelte

## Developing

Install dependencies with your least hated package manager:

```bash
npm install
```

Setup your [.env] file as [example](.env.example)

> [!NOTE]
> `AUTH_SECRET` may be generated with `openssl rand -hex 32`
> See more in the [auth.js setup docs](https://authjs.dev/reference/sveltekit)


Running the project is simple as follows:

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
