import { IUseCase } from "../../../shared/IUseCase";
import { TUserId } from "../domain/Utilisateur";
import { IUserRepository } from "./IUserRepository";

export class GetUserSecteurOffersCountUseCase implements IUseCase<TUserId, number> {
    public constructor(private readonly _userRepository: IUserRepository) {}

    async execute(input: TUserId): Promise<number> {
        const secteurOffersCount = await this._userRepository.getUserSecteurOffersCount(input);

        return secteurOffersCount;
    }
}
