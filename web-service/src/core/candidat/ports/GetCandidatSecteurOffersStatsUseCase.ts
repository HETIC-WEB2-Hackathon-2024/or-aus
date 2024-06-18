import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../domain/Candidat";
import { ICandidatRepository, ICandidatSecteurOffersStatsResponse } from "./ICandidatRepository";

export class GetCandidatSecteurOffersStatsUseCase
    implements IUseCase<TCandidatId, ICandidatSecteurOffersStatsResponse>
{
    public constructor(private readonly _userRepository: ICandidatRepository) {}

    async execute(input: TCandidatId): Promise<ICandidatSecteurOffersStatsResponse> {
        const secteurOffersStats = await this._userRepository.getCandidatSecteurOffersStats(input);

        return secteurOffersStats;
    }
}
