import { TCandidatId } from "../domain/Candidat";

export interface OfferStats {
    current_month: number;
    previous_month: number;
    comparison_percentage: string;
}
export interface ICandidatSecteurOffersStatsResponse extends OfferStats {
    secteur: string;
}

export interface ICandidatCommuneOffersStatsResponse extends OfferStats {
    commune: string;
    code_postal: string;
}

export interface ICandidatRepository {
    getCandidatSecteurOffersStats(
        user_id: TCandidatId
    ): Promise<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">>;
    getCandidatCommuneOffersStats(
        user_id: TCandidatId
    ): Promise<Omit<ICandidatCommuneOffersStatsResponse, "comparison_percentage">>;
    getCandidatCandidaturesCount(user_id: TCandidatId): Promise<number>;
}

export interface IAuth0Repository {
    getUserInfo(token_id: string): Promise<any>;
}
