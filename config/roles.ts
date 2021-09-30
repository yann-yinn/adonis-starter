import { Role } from "App/types";

// note: role "root" is NOT listed here,
// it is a special role.
const roles: Role[] = [
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
