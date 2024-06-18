import { IUseCase } from "../../../shared/IUseCase";
import { Offre } from "../../offre/domain/Offre";
import { IGetRegisteredCandidaturesDto } from "../shared/RegisteredCandidatures.dto";
import { IUserRepository } from "./ICandidatRepository";

export class GetRegisteredApplicationsUseCase implements IUseCase<IGetRegisteredCandidaturesDto, Offre[]> {
    public constructor(private readonly _userRepository: IUserRepository) {}

    execute(input: IGetRegisteredCandidaturesDto): Promise<Offre[]> {
        throw new Error("Method not implemented.");
    }
}
