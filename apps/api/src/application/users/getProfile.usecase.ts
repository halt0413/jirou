import { UserRepository } from "../../domain/users/user.repository";

export class GetProfileUseCase {
    constructor(private repo: UserRepository) {}

    async execute(userId: string) {
        const user = await this.repo.getProfile(userId);

        if (!user) {
            throw new Error("ユーザーが存在しません")
        }

        return user;
    }
}