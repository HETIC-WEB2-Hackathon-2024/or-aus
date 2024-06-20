import { TCandidatId } from "../../candidat/domain/Candidat";
import {
    ICandidatSecteurOffersStatsResponse,
    ICandidatCommuneOffersStatsResponse,
    ICandidatureStatsResponse,
} from "../../candidat/ports/ICandidatRepository";

export type TGraphValue = {
    date: Date;
    value: number;
};

export interface IGraphData {
    graph_data: TGraphValue[];
    stats: ICandidatureStatsResponse;
}

export interface IDashboardRepository {
    getCandidatSecteurOffersStats(
        user_id: TCandidatId
    ): Promise<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">>;
    getCandidatCommuneOffersStats(
        user_id: TCandidatId
    ): Promise<Omit<ICandidatCommuneOffersStatsResponse, "comparison_percentage">>;
    getCandidatCandidatures(user_id: TCandidatId): Promise<IGraphData>;
    getCandidatFavoriteCount(user_id: TCandidatId): Promise<number>;
}
