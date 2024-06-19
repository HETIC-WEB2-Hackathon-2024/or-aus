import { TCandidatId } from "../../candidat/domain/Candidat.js";
import { Offre } from "../../offre/domain/Offre.js";

export interface IFavoriteRepository {
    getFavoriteOffers(user_id: TCandidatId): Promise<Offre[]>;
}