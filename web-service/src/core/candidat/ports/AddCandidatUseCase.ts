import { IUseCase } from "../../../shared/IUseCase";
import { TUserPayload } from "./GetCandidatInfoUseCase";
import { ICandidatRepository } from "./ICandidatRepository";

export class AddCandidatUseCase implements IUseCase<Pick<TUserPayload, "email">, void> {
    public constructor(private readonly _candidatRepository: ICandidatRepository) {}

    public async execute(input: Pick<TUserPayload, "email">): Promise<void> {
        await this._candidatRepository.addCandidat(input);
    }
}
