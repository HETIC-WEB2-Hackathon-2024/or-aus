import { TCandidatId } from "../../candidat/domain/Candidat.js";
import { Offre } from "../../offre/domain/Offre.js";

export interface IFavoriteRepository {
    addFavorite(candidatId: number, offreId: number): Promise<void>;
    getFavoriteOffers(user_id: TCandidatId): Promise<Offre[]>;
}