import type { UserRepository } from "../../domain/users/user.repository";

export class UpdateProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    userId: string,
    data: {
      store?: string | null;
      review?: number | null;
    }
  ) {
    await this.userRepository.updateProfile(userId, data);
  }
}