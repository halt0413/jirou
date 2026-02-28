import { CreateCallInput } from "@repo/schemas";
import { CallsRepository } from "../../domain/calls/calls.repository";
import { Calls } from "../../domain/calls/calls.entity";

export class CreateCallUseCase {
    constructor( private repo: CallsRepository ) {}

    async execute(input: CreateCallInput, userId: string): Promise<Calls> {
        const call = new Calls(
            undefined,
            userId,
            input.title ?? null,
            input.ninniku ?? null,
            input.yasai ?? null,
            input.abura ?? null,
            input.karame ?? null,
            input.masi ?? null,
            input.masimasi ?? null,
        )
        const id = await this.repo.create(call);
        return new Calls(
            id,
            call.userId,
            call.title,
            call.ninniku,
            call.yasai,
            call.abura,
            call.karame,
            call.masi,
            call.masimasi,
        );
    }
}