# A Node.js MVP starter, built upon Adonis JS

A Node.js / TypeScript / postgres SQL starter built upon [Adonis JS](https://adonisjs.com) framework, with ready-to-use users management system, to focus on building your ideas.

🔋 Batteries included:

- User registration, login, logout, forgot password, profile picture
- Roles and permissions (`start/bouncers.ts`)
- Users administration (add, delete, edit existing users)

<img src="https://github.com/yann-yinn/adonis-starter/blob/main/screen.png"/>

## Installation

Requirements:

- ⚠️ latest release of Node.js 14, along with npm >= 6.0.0.
- a Postgres database.

```sh
# check your node version
node -v
# check your npm version
npm -v

# clone the repo
git clone git@github.com:yann-yinn/mvp-starter.git

# install dependencies
npm install

# create the .env file and set required env vars.
cp env.example .env

# create postgres tables
node run migration-up

# launch dev server !
npm run dev
```

## Contribute

Fork **dev** branch and make a PR againts the **dev** branch.

## FAQ

### POSTGRES SSL AND HEROKU

Fix SSL issue in development with postgres hosted with Heroku: configure `rejectUnauthorized` in your `config/database.ts` config file.

```js
// config/database.ts
connections: {
  pg: {
    client: "pg",
    connection: {
      ssl: {
        rejectUnauthorized: Env.get("NODE_ENV") === "production" ? true : false,
      },
      // ...
```
