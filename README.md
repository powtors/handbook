# Handbook

This is a blog built with svelte

## Developing

Install dependencies with your least hated package manager:

```bash
pnpm i
```

Setup your `.env` or `.env.prod` file as [example](.env.example)

> [!INFO]
> `AUTH_SECRET` may be generated with `openssl rand -hex 32`
>
> See more in the [auth.js setup docs](https://authjs.dev/reference/sveltekit)

Testing the project is simple as follows:

```bash
docker compose up
pnpm dev
```

> [!NOTE]
> You may need to specify the alternative env file to docker compose if you're using`.env.prod`
>
> In this case any invocations of compose must be followed by `--env-file` as example: `docker compose --env-file .env.prod ...`

## Testing

To test our server:

```bash
docker compose up -d
sudo pnpm dev
```

## Running

Create a production build:

```bash
pnpm build
```

Start database:

```bash
docker compose --env-file .env.prod up -d
```

Run it with `sudo node --env-file .env.prod build`.
