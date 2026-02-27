import { Calls } from "../../domain/calls/calls.entity";
import { CallsRepository } from "../../domain/calls/calls.repository";

export class findCallsByUserIdUseCase {
    constructor(private repo: CallsRepository) {}

    async execute(userId: string): Promise<Calls[]> {
        return await this.repo.findByUserId(userId)
    }
}