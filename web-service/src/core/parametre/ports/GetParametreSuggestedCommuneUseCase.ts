import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class GetParametreSuggestedCommuneUseCase implements IUseCase<{ nd: string, nc: string }, string[]> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { nd: string, nc: string }): Promise<string[]> {
        const suggestedCommunes = await this._candidatParametreRepository.getParametreSuggestedCommune(input.nd, input.nc);
        return suggestedCommunes;
    }
}