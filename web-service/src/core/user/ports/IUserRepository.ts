import { Offre } from "../../offre/domain/Offre";

export interface IUserRepository {
    getRegisteredOffers(user_id: number): Promise<Offre[]>;
    getUserApplicationsCount(user_id: number): Promise<number>;
}
