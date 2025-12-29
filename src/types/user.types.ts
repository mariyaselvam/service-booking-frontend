export type UserRole = "user" | "vendor" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}
