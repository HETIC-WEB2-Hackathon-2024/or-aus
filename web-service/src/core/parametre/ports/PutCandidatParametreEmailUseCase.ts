import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class PutCandidatParametreEmailUseCase implements IUseCase<{ id: number, email: string }, void> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { id: number, email: string }): Promise<void> {
        await this._candidatParametreRepository.putCandidatParametreEmail(input);
    }
}