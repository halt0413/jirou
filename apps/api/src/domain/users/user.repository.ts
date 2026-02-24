import type { User } from "./user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(
  name: string,
  email: string,
  hashedPassword: string
): Promise<User>;
}