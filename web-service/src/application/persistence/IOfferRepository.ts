import { Offre } from "../../core/Offre";

export interface IOfferRepository {
    getFirsts(limit: number): Promise<Offre[]>;
}
