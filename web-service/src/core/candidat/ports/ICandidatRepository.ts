import { Offre } from "../../offre/domain/Offre";
import { TUserId } from "../domain/Candidat";

export interface IUserRepository {
    getRegisteredOffers(user_id: TUserId): Promise<Offre[]>;
    getCandidatSecteurOffersCount(user_id: TUserId): Promise<number>;
    getCandidatCandidaturesCount(user_id: TUserId): Promise<number>;
}
