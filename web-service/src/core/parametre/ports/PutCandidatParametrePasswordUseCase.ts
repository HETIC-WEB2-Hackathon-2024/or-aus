import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class PutCandidatParametrePasswordUseCase implements IUseCase<{ id: number }, void> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { id: number }): Promise<void> {
        await this._candidatParametreRepository.putCandidatParametrePassword(input);
    }
}