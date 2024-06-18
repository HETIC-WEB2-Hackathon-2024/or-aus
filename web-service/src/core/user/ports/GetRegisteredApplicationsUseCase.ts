import { IUseCase } from "../../../shared/IUseCase";
import { Utilisateur } from "../domain/Utilisateur";
import { IUserRepository } from "./IUserRepository";

interface IGetRegisteredApplicationsDto {
    user_id: Pick<Utilisateur, "id">;
}

export class GetRegisteredApplicationsUseCase implements IUseCase<IGetRegisteredApplicationsDto, number> {
    public constructor(private readonly _userRepository: IUserRepository) {}

    execute(input: IGetRegisteredApplicationsDto): Promise<number> {
        throw new Error("Method not implemented.");
    }
}
