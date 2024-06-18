import { Offre } from "../../offre/domain/Offre";
import { TCandidatId } from "../domain/Candidat";

export interface ICandidatRepository {
    getRegisteredOffers(user_id: TCandidatId): Promise<Offre[]>;
    getCandidatSecteurOffersCount(user_id: TCandidatId): Promise<number>;
    getCandidatCandidaturesCount(user_id: TCandidatId): Promise<number>;
}
