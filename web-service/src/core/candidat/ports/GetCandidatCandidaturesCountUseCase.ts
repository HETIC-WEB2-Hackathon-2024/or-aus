import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../domain/Candidat";
import { ICandidatRepository } from "./ICandidatRepository";

export class GetCandidatCandidaturesCountUseCase implements IUseCase<TCandidatId, number> {
    public constructor(private readonly _candidatRepository: ICandidatRepository) {}

    public async execute(input: TCandidatId): Promise<number> {
        const registeredCount = await this._candidatRepository.getCandidatCandidaturesCount({ id: input.id });

        return registeredCount;
    }
}
