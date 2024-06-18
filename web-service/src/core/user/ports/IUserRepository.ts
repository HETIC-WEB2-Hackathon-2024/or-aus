import { TUserId } from "../domain/Utilisateur";

export interface IUserRepository {
    getUserApplicationsCount(user_id: TUserId): Promise<number>;
}
