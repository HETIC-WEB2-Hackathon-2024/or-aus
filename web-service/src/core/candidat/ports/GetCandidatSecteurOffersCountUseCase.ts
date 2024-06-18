import { IUseCase } from "../../../shared/IUseCase";
import { TUserId } from "../domain/Candidat";
import { IUserRepository } from "./ICandidatRepository";

export class GetCandidatSecteurOffersCountUseCase implements IUseCase<TUserId, number> {
    public constructor(private readonly _userRepository: IUserRepository) {}

    async execute(input: TUserId): Promise<number> {
        const secteurOffersCount = await this._userRepository.getCandidatSecteurOffersCount(input);

        return secteurOffersCount;
    }
}
