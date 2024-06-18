import { Offre } from "../domain/Offre";

export interface IOfferRepository {
    getFirsts(limit: number): Promise<Offre[]>;
}
