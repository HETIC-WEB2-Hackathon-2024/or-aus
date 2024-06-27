import { IUseCase } from "../../../shared/IUseCase";
import { ICandidatParametreRepository, TDepartement } from "./ICandidatParametreRepository";

export class GetParametreLocUseCase implements IUseCase<void, TDepartement> {
    public constructor(
        private readonly _candidatParametreRepository: ICandidatParametreRepository,
    ) { }

    async execute(): Promise<TDepartement> {
        const parameters = await this._candidatParametreRepository.getParametreLoc();
        return parameters;
    }
}