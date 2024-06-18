import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../domain/Candidat";
import { ICandidatRepository } from "./ICandidatRepository";

export class GetCandidatSecteurOffersCountUseCase implements IUseCase<TCandidatId, number> {
    public constructor(private readonly _userRepository: ICandidatRepository) {}

    async execute(input: TCandidatId): Promise<number> {
        const secteurOffersCount = await this._userRepository.getCandidatSecteurOffersCount(input);

        return secteurOffersCount;
    }
}
