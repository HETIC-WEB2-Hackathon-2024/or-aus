import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class PutCandidatParametreLocUseCase implements IUseCase<{ id: number, nom_departement: string, nom_commune: string }, void> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { id: number, nom_departement: string, nom_commune: string }): Promise<void> {
        await this._candidatParametreRepository.putCandidatParametreLoc(input);
    }
}