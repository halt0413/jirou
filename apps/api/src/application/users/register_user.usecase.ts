import type { UserRepository } from "../../domain/users/user.repository";
import type { PasswordHasher } from "../../domain/users/user.password_hasher";

export class RegisterUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute(name: string, email: string, password: string) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await this.passwordHasher.hash(password);

    const user = await this.userRepository.create(name, email, hashed);

    return user;
  }
}
