# MVP starter

A Node.js, TypeScript & postgres SQL starter built upon [Adonis JS](https://adonisjs.com) framework, with **ready-to-use users management system**, to focus on building your new ideas.

🔋 Batteries included:

- [x] Sign up form
- [x] Sign in form
- [x] Logout
- [x] List / create / delete users in admin page
- [x] Forgot password
- [x] Email verification
- [x] Roles and permissions with AdonisJS bouncers

<img src="https://github.com/yann-yinn/adonis-starter/blob/main/screen.png"/>

## Installation

Requirements:

- ⚠️ Latest release of Node.js 14, along with npm >= 6.0.0.
- A Postgres database.
- An STMP server to send emails (you might use, for example, Mailgun, Sparkpot, Amazon SES)

```sh
# Check your node version
node -v
# Check your npm version
npm -v

# Clone the repo
# stable branch, to start a new project
git clone -b main git@github.com:yann-yinn/adonis-starter.git
# If you want to contribute: clone dev branch instead of main.
# git clone -b dev git@github.com:yann-yinn/mvp-starter.git

# Install dependencies
npm install

# Configure your environment variables:
#
# 1) Generate your unique app id, you need this value for APP_KEY env var in .env.
node ace generate:key
# 2) copy env.example file to create a ".env" file
# edit the env file and set required env vars.
cp env.example .env

# Create postgres tables
 npm run migrate-up

# Launch dev server !
npm run dev
```

## Contribute

Fork **dev** branch and make a PR againts the **dev** branch.

## Roles and Permissions

### Adding new role

You can add new roles inside `config/roles.ts` file. By default, there is only "root", "admin" and "member" roles. Root role is special and MUST NOT be deleted. First created user became automatically a "root" user.

```js
import { Role } from "App/types";

const roles: Role[] = [
  // root is a special role and has all authorizations.
  {
    id: "root",
    label: "Root",
  },
  // Member is the default role when someone creates a new account.
  {
    id: "member",
    label: "Member",
  },
  // Admin can create / delete users, except the root user.
  {
    id: "admin",
    label: "Administrator",
  },
];
export default roles;
```

### Definining authorizations

MVP starter is using "bouncers" from Adonis JS framework to define authorizations.

See `start/bouncer.ts` File for predefined authorizations or to add new authorizations.

Example bouncer: "Admin role can edit any post. Member can only edit their own posts":

```ts
.define("editPost", (user: User, post: Post) => {
  if (userHasRoles(["admin"], user)) {
    return true;
  }
  if (userHasRoles(["member"], user) && user.id === post.userId) {
    return true;
  }
  return false;
})
```

Then, in your controller, use the defined bouncer like so (don't forget the **await** keyword!)

```ts
public async edit({ view, request, bouncer }: HttpContextContract) {
  const entity = await this.entityModel.findOrFail(request.param("id"));
  await bouncer.authorize("editPost", entity);
  // etc
}
```

You can control authorizations in the templates too:

```html
@can('editPost', entity)
  <a href="{{entity._editLink}}">Edit</a> </td>
@end
```

See adonis docs on "bouncers" for more details: [https://docs.adonisjs.com/guides/authorization](https://docs.adonisjs.com/guides/authorization)

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

## Changelog

- 5 oct. Add "root" role, (default role for the very first registered user)
- 5 otc. Add password validations rules
- 5 oct. Show / Hide password (thanks @Sreejit7)
- 5 oct. When user upload a new profile picture, delete the old one (thanks @Yoann-TYT)
- nov. forgot password and mail verification (thanks @HugoLd)