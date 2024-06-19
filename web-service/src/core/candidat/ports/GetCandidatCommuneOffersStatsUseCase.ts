import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../domain/Candidat";
import { StatsHelper } from "../shared/stats-helper";
import { ICandidatCommuneOffersStatsResponse, ICandidatRepository } from "./ICandidatRepository";

export class GetCandidatCommuneOffersStatsUseCase
    implements IUseCase<TCandidatId, ICandidatCommuneOffersStatsResponse>
{
    public constructor(private readonly _candidatRepository: ICandidatRepository) {}

    async execute(input: TCandidatId): Promise<ICandidatCommuneOffersStatsResponse> {
        const communesOffersStats = await this._candidatRepository.getCandidatCommuneOffersStats(input);
        const comparison_percentage =
            ((communesOffersStats.current_month - communesOffersStats.previous_month) /
                communesOffersStats.previous_month) *
            100;
        return {
            ...communesOffersStats,
            comparison_percentage: `${StatsHelper.formatPercentage(comparison_percentage)}%`,
        };
    }
}
