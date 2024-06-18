import { IUseCase } from "../../../shared/IUseCase";
import { IGetRegisteredCandidaturesDto } from "../shared/RegisteredCandidatures.dto";
import { IUserRepository } from "./ICandidatRepository";

export class GetCandidatCandidaturesCountUseCase implements IUseCase<IGetRegisteredCandidaturesDto, number> {
    public constructor(private readonly _userRepository: IUserRepository) {}

    public async execute(input: IGetRegisteredCandidaturesDto): Promise<number> {
        const registeredCount = await this._userRepository.getCandidatCandidaturesCount({ id: input.user_id });

        return registeredCount;
    }
}
