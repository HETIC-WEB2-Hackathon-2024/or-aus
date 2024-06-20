import { TCandidatId } from "../../candidat/domain/Candidat";
import {
    ICandidatSecteurOffersStatsResponse,
    ICandidatCommuneOffersStatsResponse,
} from "../../candidat/ports/ICandidatRepository";

export interface IDashboardRepository {
    getCandidatSecteurOffersStats(
        user_id: TCandidatId
    ): Promise<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">>;
    getCandidatCommuneOffersStats(
        user_id: TCandidatId
    ): Promise<Omit<ICandidatCommuneOffersStatsResponse, "comparison_percentage">>;
    getCandidatCandidaturesCount(user_id: TCandidatId): Promise<number>;
}
