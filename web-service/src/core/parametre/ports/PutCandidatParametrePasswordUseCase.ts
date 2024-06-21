import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class PutCandidatParametrePasswordUseCase implements IUseCase<{ id: number, password: string }, void> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { id: number, password: string }): Promise<void> {
        await this._candidatParametreRepository.putCandidatParametrePassword(input);
    }
}