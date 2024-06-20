import { Candidat, TCandidatEmail, TCandidatId } from "../domain/Candidat";
import { TUserPayload } from "./GetCandidatInfoUseCase";

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

export interface ICandidatureStatsResponse extends OfferStats {}

export interface ICandidatRepository {
    getCandidatInfo(input: TCandidatEmail): Promise<Candidat>;
    addCandidat(input: Pick<TUserPayload, "email">): Promise<void>;
}

export interface IAuth0Repository {
    getUserInfo(token_id: string): Promise<TUserPayload>;
}
