import { ISelectOffer, Offre } from "../../entities/Offre";
import { OffersMapper } from "../../mappers/OffersMapper";

export interface IOfferRepository {
    getFirstOffers(limit: number): Promise<OffersMapper[]>;
}
