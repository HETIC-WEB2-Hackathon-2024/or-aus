import { IUseCase } from "../../../shared/IUseCase";
import { Offre } from "../../offre/domain/Offre";
import { IGetRegisteredApplicationsDto } from "../shared/RegisteredApplications.dto";
import { IUserRepository } from "./IUserRepository";

export class GetRegisteredApplicationsUseCase implements IUseCase<IGetRegisteredApplicationsDto, Offre[]> {
    public constructor(private readonly _userRepository: IUserRepository) {}

    execute(input: IGetRegisteredApplicationsDto): Promise<Offre[]> {
        throw new Error("Method not implemented.");
    }
}
