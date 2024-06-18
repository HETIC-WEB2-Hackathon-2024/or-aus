import { TUserId } from "../domain/Utilisateur";

export interface IUserRepository {
    getUserSecteurOffersCount(user_id: TUserId): Promise<number>;
    getUserApplicationsCount(user_id: TUserId): Promise<number>;
}
