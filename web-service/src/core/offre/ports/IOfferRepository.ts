import { Offre } from "../domain/Offre";
import { IOfferFilter } from "../filter/IOfferFilter";
import { TContract } from "../shared/TContract";

export interface IOfferRepository {
    getOffers(limit: number, offset: number, filters: IOfferFilter): Promise<Offre[]>;
    getContractTypes(): Promise<TContract[]>;
    addCandidature(offre_id: number, user_id: number): Promise<void>;
}
