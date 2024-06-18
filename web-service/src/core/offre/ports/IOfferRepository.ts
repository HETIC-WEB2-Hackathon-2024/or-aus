import { Offre } from "../domain/Offre";
import { IOfferFilter } from "../filter/IOfferFilter";

export interface IOfferRepository {
    getFirsts(limit: number): Promise<Offre[]>;
    getOffers(limit: number, filters: IOfferFilter): Promise<Offre[]>;
    createOffersQueryWithFilters(limit: number, filters: IOfferFilter): { query: string, options: string[]}
}
