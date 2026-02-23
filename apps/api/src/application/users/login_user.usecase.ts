import type { UserRepository } from "../../domain/users/user.repository";
import type { PasswordHasher } from "../../domain/users/user.password_hasher";
import type { TokenProvider } from "../../domain/users/user.token_provider";

import { sign } from "hono/jwt";

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private tokenProvider: TokenProvider
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await this.passwordHasher.compare(
      password,
      user.password
    );

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = await this.tokenProvider.generate(user.id);

    return { accessToken: token };
  }
}