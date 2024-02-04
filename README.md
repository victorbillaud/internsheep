# Welcome to Internsheep project 🐑

## Getting Started | HOW TO SETUP 👷‍♂️

The project is currently in **Nuxt.js**; You will need to have pnpm installed to our system.

You can follow this [tuto](https://pnpm.io/fr/next/installation).

or if you are on Windows, try to run this command on a PowerShell : `iwr https://get.pnpm.io/install.ps1 -useb | iex`

## For the Database
First, run the local postgres database using docker compose:

```bash
docker-compose up -d
```
You will have a postegre container running.

Then, **sync** your database with prisma:

```bash
pnpm prisma db push
```

Once you have the __database running__ : 

```bash
npx prisma db seed
```

(⬆️ this command allow to load and initialise the database)

And the last for the database :

```bash
npx prisma generate
```


Finally, run the __development server__:

```bash
pnpm dev
```

If everything running good, you will have our beautiful website ! 🎆

## And for the futur ? 

