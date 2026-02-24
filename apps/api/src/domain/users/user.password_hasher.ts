export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(password: string, hashed: string): Promise<boolean>;
}