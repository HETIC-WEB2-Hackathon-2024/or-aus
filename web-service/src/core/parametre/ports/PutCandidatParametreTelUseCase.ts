import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class PutCandidatParametreTelUseCase implements IUseCase<{ id: number, tel: string }, void> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { id: number, tel: string }): Promise<void> {
        await this._candidatParametreRepository.putCandidatParametreTel(input);
    }
}