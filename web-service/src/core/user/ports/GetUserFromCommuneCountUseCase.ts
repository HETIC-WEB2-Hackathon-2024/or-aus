import { IUseCase } from "../../../shared/IUseCase";
import { IUserRepository } from "./IUserRepository";

interface IGetUserCommuneCountDto {
  candidat_id: number;
}

export class GetUserCommuneCountUseCase
  implements IUseCase<IGetUserCommuneCountDto, number>
{
  public constructor(private readonly _userRepository: IUserRepository) {}

  public async execute(input: IGetUserCommuneCountDto): Promise<number> {
    const communeCount = await this._userRepository.getUserCommuneCount({
      id: input.candidat_id,
    });
    return communeCount;
  }
}
