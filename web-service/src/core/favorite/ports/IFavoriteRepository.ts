import { Offre } from "../../offre/domain/Offre.js";
import { TUserId } from "../../user/domain/Utilisateur.js";

export interface IFavoriteRepository {
    getFavoriteOffers(user_id: TUserId): Promise<Offre[]>;
}