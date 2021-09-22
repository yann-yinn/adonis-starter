# AdonisJS 5 starter (monolith)

AdonisJS 5 _monolith_ starter (100% node.js) with ready-to-use signup / signin form, user administration, roles.

Classic HTML templating using Adonis Edge templates with Bootstrap CSS.

<img src="https://github.com/yann-yinn/adonis-starter/blob/main/screen.png"/>

## Installation

Prérequis:

- ⚠️ latest release of Node.js 14, along with npm >= 6.0.0.
- une base de données Postgres

```
# check node.js version
node -v
# check npm version
npm -v

git clone git@github.com:yann-yinn/adonis-starter.git

npm install

cp env.example .env

# edit your .env file !

# create tables
node ace migration:run --force
```

## Features

Done:

- [x] Sign up Form
- [x] Sign in form
- [x] Log out
- [x] User profile page / profile page edition
- [x] User avatar
- [x] Authenticated users can create "posts" in the admin as an example entity
- [x] Role and permissions with bouncers.

Planned:

- [ ] Send email on account creation
- [ ] Forgot password

## FAQ

SSL issue with postgres sql on Heroku: configurer `rejectUnauthorized` in your `config/database.ts` config file.

```json
connections: {
  pg: {
    client: "pg",
    connection: {
      ssl: {
        rejectUnauthorized: Env.get("NODE_ENV") === "production" ? true : false,
      },
      // ...
```
