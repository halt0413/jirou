import type { User, UserProfile } from "./user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  getProfile(userId: string): Promise<UserProfile | null>;

  create(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<User>;

  updateProfile(userId: string, store: string): Promise<void>;

  incrementReview(userId: string): Promise<void>;
}