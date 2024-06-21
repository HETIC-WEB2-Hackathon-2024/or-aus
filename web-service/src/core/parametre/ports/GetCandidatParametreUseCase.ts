import { IUseCase } from "../../../shared/IUseCase";
import { CandidatParametre } from "../domains/CandidatParametre";
import { ICandidatParametreRepository } from "./ICandidatParametreRepository";

export class GetCandidatParametreUseCase implements IUseCase<{ id: number }, CandidatParametre> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(input: { id: number }): Promise<CandidatParametre> {
        const parameters = await this._candidatParametreRepository.getCandidatParametre(input);
        return parameters;
    }
}