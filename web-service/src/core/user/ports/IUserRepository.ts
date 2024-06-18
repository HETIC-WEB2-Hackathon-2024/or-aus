import { Offre } from "../../offre/domain/Offre";
import { TUserId } from "../domain/Utilisateur";

export interface IUserRepository {
    getRegisteredOffers(user_id: TUserId): Promise<Offre[]>;
    getUserApplicationsCount(user_id: TUserId): Promise<number>;
}
