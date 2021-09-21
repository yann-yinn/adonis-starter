/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from "@ioc:Adonis/Addons/Bouncer";
import User from "App/Models/User";
import Post from "App/Models/Post";
import { RoleId } from "App/types";

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
function userHasRoles(roles: RoleId[], user: User) {
  let authorized = false;
  for (const role of roles) {
    if (user.roles.includes(role)) {
      authorized = true;
    }
  }
  return authorized;
}

export const { actions } = Bouncer
  // === USERS ADMINISTRATION ===
  .define("adminListUsers", (user: User) => {
    return userHasRoles(["admin"], user);
  })
  .define("adminCreateUser", (user: User) => {
    return userHasRoles(["admin"], user);
  })
  .define("adminEditUser", (user: User) => {
    return userHasRoles(["admin"], user);
  })
  .define("adminDeleteUser", (user: User) => {
    return userHasRoles(["admin"], user);
  })
  // === POSTS ADMINISTRATION ===
  .define("adminViewPosts", (user: User) => {
    return userHasRoles(["admin"], user);
  })
  .define("adminListPosts", (user: User) => {
    return userHasRoles(["admin", "member"], user);
  })
  .define("adminCreatePost", (user: User) => {
    return userHasRoles(["admin", "member"], user);
  })
  .define("adminEditPost", (user: User, post: Post) => {
    if (userHasRoles(["admin"], user)) {
      return true;
    }
    if (userHasRoles(["member"], user) && user.id === post.userId) {
      return true;
    }
    return false;
  })
  .define("adminDeletePost", (user: User, post: Post) => {
    if (userHasRoles(["admin"], user)) {
      return true;
    }
    if (userHasRoles(["member"], user) && user.id === post.userId) {
      return true;
    }
    return false;
  })
  // === PROFILE ===
  .define("viewProfile", (user: User, profile: User) => {
    return userHasRoles(["admin"], user) || user.id === profile.id;
  })
  .define("editProfile", (user: User, profile: User) => {
    return userHasRoles(["admin"], user) || user.id === profile.id;
  });

/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({});
