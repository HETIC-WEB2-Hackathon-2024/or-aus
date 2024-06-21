import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository, TDepAndCo } from "./ICandidatParametreRepository";

export class GetParametreLocUseCase implements IUseCase<void, TDepAndCo> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(): Promise<TDepAndCo> {
        const parameters = await this._candidatParametreRepository.getParametreLoc();
        return parameters;
    }
}