import { CallsRepository } from "../../domain/calls/calls.repository";

export class DeleteCallUseCase {
    constructor(private repo: CallsRepository) {}

    async execute(userId: string, callId: number): Promise<void> {
        await this.repo.delete(callId, userId)
    }
}