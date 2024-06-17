import { Offre } from "../../entities/Offre";

export interface IOfferRepository {
    execute: (limit: number) => Promise<Offre[]>;
}
