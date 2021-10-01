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
# check your node version
node -v
# check your npm version
npm -v

# clone the repo
git clone git@github.com:yann-yinn/mvp-starter.git

# install dependencies
npm install

# DO NOT FORGET: create the .env file and set required env vars.
cp env.example .env

# create postgres tables
 npm run migrate-up

# launch dev server !
npm run dev
```

## Contribute

Fork **dev** branch and make a PR againts the **dev** branch.

## Roles and Permissions

### Adding new role

You can add new roles inside `config/roles.ts` file. By default, there is only an "admin" and "member" roles.

```js
import { Role } from "App/types";

const roles: Role[] = [
  // root is a special role and can do anything.
  {
    id: "root",
    label: "Root",
  },
  {
    id: "member",
    label: "Member",
  },
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
@can('adminEditPost', entity)
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
