import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../domain/Candidat";
import { StatsHelper } from "../shared/stats-helper";
import { ICandidatRepository, ICandidatSecteurOffersStatsResponse } from "./ICandidatRepository";

export class GetCandidatSecteurOffersStatsUseCase
    implements IUseCase<TCandidatId, ICandidatSecteurOffersStatsResponse>
{
    public constructor(private readonly _candidatRepository: ICandidatRepository) {}

    async execute(input: TCandidatId): Promise<ICandidatSecteurOffersStatsResponse> {
        const secteurOffersStats = await this._candidatRepository.getCandidatSecteurOffersStats(input);
        const comparison_percentage =
            ((secteurOffersStats.current_month - secteurOffersStats.previous_month) /
                secteurOffersStats.previous_month) *
            100;
        return {
            ...secteurOffersStats,
            comparison_percentage: `${StatsHelper.formatPercentage(comparison_percentage)}%`,
        };
    }
}
