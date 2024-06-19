import { Offre } from "../domain/Offre";
import { IOfferFilter } from "../filter/IOfferFilter";

export interface IOfferRepository {
    getOffers(limit: number, offset:number, filters: IOfferFilter): Promise<Offre[]>;
}
