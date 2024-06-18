import { IUseCase } from "../../../shared/IUseCase";
import { IGetRegisteredApplicationsDto } from "../shared/RegisteredApplications.dto";
import { IUserRepository } from "./IUserRepository";

export class GetUserApplicationsCountUseCase implements IUseCase<IGetRegisteredApplicationsDto, number> {
    public constructor(private readonly _userRepository: IUserRepository) {}

    public async execute(input: IGetRegisteredApplicationsDto): Promise<number> {
        const registeredCount = await this._userRepository.getUserApplicationsCount(input.user_id);

        return registeredCount;
    }
}
