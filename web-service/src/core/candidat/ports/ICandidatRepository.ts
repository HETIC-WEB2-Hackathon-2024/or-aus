import { Offre } from "../../offre/domain/Offre";
import { TCandidatId } from "../domain/Candidat";

export interface ICandidatSecteurOffersStatsResponse {
    current_month: number;
    previous_month: number;
    comparison_percentage: string;
    secteur: string;
}

export interface ICandidatRepository {
    getRegisteredOffers(user_id: TCandidatId): Promise<Offre[]>;
    getCandidatSecteurOffersStats(
        user_id: TCandidatId
    ): Promise<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">>;
    getCandidatCandidaturesCount(user_id: TCandidatId): Promise<number>;
}
