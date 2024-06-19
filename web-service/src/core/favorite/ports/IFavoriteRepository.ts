import { TCandidatId } from "../../candidat/domain/Candidat.js";
import { Offre } from "../../offre/domain/Offre.js";
import { TFavoriteId } from "../domains/Favorite.js";

export interface IFavoriteRepository {
    getFavorites(user_id: TCandidatId): Promise<Offre[]>;
    removeFavorite(input: TFavoriteId): Promise<void>;
}
