# MVP starter (node monolith)

MVP starter is Node _monolith_ starter built upon Adonis JS framework, with ready-to-use signup, signin form, user administration, roles.

It uses classic HTML templating using Adonis Edge templates with Bootstrap CSS.

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

## Features

- [x] Sign up Form
- [x] Sign in form
- [x] Log out
- [x] Reset password
- [x] Send emails on account creation / reset password
- [x] User profile with edition
- [x] User avatar
- [x] Roles and permissions with bouncers.
- [x] Authenticated users can create "posts" in the admin as an example entity

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
