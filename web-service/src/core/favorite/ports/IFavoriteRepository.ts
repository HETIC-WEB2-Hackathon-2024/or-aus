import { TCandidatEmail, TCandidatId } from "../../candidat/domain/Candidat";
import { Offre } from "../../offre/domain/Offre";
import { TFavoriteId } from "../domains/Favorite";

export interface IFavoriteRepository {
    getFavorites(user_email: TCandidatEmail): Promise<Offre[]>;
    removeFavorite(input: TFavoriteId): Promise<void>;
    addFavorite(candidatId: number, offreId: number, candidatEmail: string): Promise<void>;
}
