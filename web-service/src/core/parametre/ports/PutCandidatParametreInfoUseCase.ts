import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class PutCandidatParametreInfoUseCase implements IUseCase<{ id: number, nom: string, prenom: string, date_naissance: string }, void> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { id: number, nom: string, prenom: string, date_naissance: string }): Promise<void> {
        await this._candidatParametreRepository.putCandidatParametreInfo(input);
    }
}