Welcome to internsheep project

## Getting Started

First, run the local postgres database using docker compose:

```bash
docker-compose up -d
```

Then, sync your database with prisma:

```bash
pnpm prisma db push
```

Finally, run the development server:

```bash
pnpm dev
```
