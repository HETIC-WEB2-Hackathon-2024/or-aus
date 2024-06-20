import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../../candidat/domain/Candidat";
import { StatsHelper } from "../../candidat/shared/stats-helper";
import { ICandidatCommuneOffersStatsResponse, ICandidatRepository } from "../../candidat/ports/ICandidatRepository";
import { IDashboardRepository } from "./IDashboardRepository";

export class GetCandidatCommuneOffersStatsUseCase
    implements IUseCase<TCandidatId, ICandidatCommuneOffersStatsResponse>
{
    public constructor(private readonly _candidatRepository: IDashboardRepository) {}

    async execute(input: TCandidatId): Promise<ICandidatCommuneOffersStatsResponse> {
        const communesOffersStats = await this._candidatRepository.getCandidatCommuneOffersStats(input);
        return {
            ...communesOffersStats,
            comparison_percentage: `${StatsHelper.formatPercentage(communesOffersStats)}%`,
        };
    }
}
