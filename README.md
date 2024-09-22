# Handbook

This is a blog built with svelte

## Developing

Install dependencies with your least hated package manager:

```bash
npm install
```

Setup your [.env] file as [example](.env.example)

> [!INFO]
> `AUTH_SECRET` may be generated with `openssl rand -hex 32`
>
> See more in the [auth.js setup docs](https://authjs.dev/reference/sveltekit)

Testing the project is simple as follows:

```bash
# this will start our database
docker compose up

# this will start our server
npm run dev
```

> [!NOTE]
> You may need to specify the alternative env file to docker compose if you're using `.env.local` or `.env.prod`
>
> In this case any invocations of compose must be followed by `--env-file` as example: `docker compose --env-file .env.local ...`

## Running

To run our server as production:

```bash
# Using .env
docker compose up -d
sudo pnpm dev --host --port 80

# Using .env.prod
docker compose --env-file .env.prod up -d
sudo pnpm dev --host --port 80 --mode prod
```

## Building

To create a production version of the project:

```bash
npm run build
```

You can preview the production build with `sudo npm run preview --host --port 80 --mode prod`.

> To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
