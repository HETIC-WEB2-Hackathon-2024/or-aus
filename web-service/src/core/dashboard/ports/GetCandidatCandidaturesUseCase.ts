import { IUseCase } from "../../../shared/IUseCase";
import { TCandidatId } from "../../candidat/domain/Candidat";
import { ICandidatRepository } from "../../candidat/ports/ICandidatRepository";
import { StatsHelper } from "../../candidat/shared/stats-helper";
import { IDashboardRepository, IGraphData } from "./IDashboardRepository";

export interface IResponse {}
export class GetCandidatCandidaturesUseCase implements IUseCase<TCandidatId, IGraphData> {
    public constructor(private readonly _candidatRepository: IDashboardRepository) {}

    public async execute(input: TCandidatId): Promise<IGraphData> {
        const graphique_stats = await this._candidatRepository.getCandidatCandidatures({
            id: input.id,
        });

        return {
            ...graphique_stats,
            stats: {
                ...graphique_stats.stats,
                comparison_percentage: `${StatsHelper.formatPercentage(graphique_stats.stats)}%`,
            },
        };
    }
}
