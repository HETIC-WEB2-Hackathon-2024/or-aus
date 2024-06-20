import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../../candidat/domain/Candidat";
import { StatsHelper } from "../../candidat/shared/stats-helper";
import { ICandidatRepository, ICandidatSecteurOffersStatsResponse } from "../../candidat/ports/ICandidatRepository";
import { IDashboardRepository } from "./IDashboardRepository";

export class GetCandidatSecteurOffersStatsUseCase
    implements IUseCase<TCandidatId, ICandidatSecteurOffersStatsResponse>
{
    public constructor(private readonly _candidatRepository: IDashboardRepository) {}

    async execute(input: TCandidatId): Promise<ICandidatSecteurOffersStatsResponse> {
        const secteurOffersStats = await this._candidatRepository.getCandidatSecteurOffersStats(input);
        return {
            ...secteurOffersStats,
            comparison_percentage: `${StatsHelper.formatPercentage(secteurOffersStats)}%`,
        };
    }
}
