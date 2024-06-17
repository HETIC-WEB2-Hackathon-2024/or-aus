import { ISelectOffer, Offre } from "../../entities/Offre";

export interface IOfferRepository {
    getFirstOffers(limit: number): Promise<ISelectOffer[]>;
}
