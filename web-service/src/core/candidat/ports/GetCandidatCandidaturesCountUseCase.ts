import { IUseCase } from "../../../shared/IUseCase";
import { IGetRegisteredCandidaturesDto } from "../shared/RegisteredCandidatures.dto";
import { ICandidatRepository } from "./ICandidatRepository";

export class GetCandidatCandidaturesCountUseCase implements IUseCase<IGetRegisteredCandidaturesDto, number> {
    public constructor(private readonly _candidatRepository: ICandidatRepository) {}

    public async execute(input: IGetRegisteredCandidaturesDto): Promise<number> {
        const registeredCount = await this._candidatRepository.getCandidatCandidaturesCount({ id: input.user_id });

        return registeredCount;
    }
}
