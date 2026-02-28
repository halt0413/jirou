import type { UserRepository } from "../../domain/users/user.repository";

export class UpdateProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, store: string) {
    await this.userRepository.updateProfile(userId, store);
  }
}