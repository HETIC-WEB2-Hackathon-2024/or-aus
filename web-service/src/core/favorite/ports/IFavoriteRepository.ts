import { TCandidatId } from "../../candidat/domain/Candidat.js";
import { Offre } from "../../offre/domain/Offre.js";

export interface IFavoriteRepository {
    getFavorites(user_id: TCandidatId): Promise<Offre[]>;
}
