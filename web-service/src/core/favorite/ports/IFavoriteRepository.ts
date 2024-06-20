import { TCandidatId } from "../../candidat/domain/Candidat";
import { Offre } from "../../offre/domain/Offre";
import { RemoveFavoriteDto } from "./RemoveFavoriteUseCase";

export interface IFavoriteRepository {
    getFavorites(user_id: TCandidatId, withDependancies?: boolean): Promise<Offre[]>;
    removeFavorite(input: RemoveFavoriteDto): Promise<void>;
    addFavorite(candidatId: number, offreId: number): Promise<void>;
}
