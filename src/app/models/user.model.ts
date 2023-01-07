import { Address } from "./address.model";
import { Role } from "./role.enum";

export interface User {

  id?: string;
  username: string;
  password: string;
  email: string;

  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: Address;

  role?: Role;

  createAt?: Date;
  updateAt?: Date;

  isActive?: boolean;
}