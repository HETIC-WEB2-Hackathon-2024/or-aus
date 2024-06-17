import { Offre } from "../../core/entities/Offre";
import { IGetFirstOffersUseCase } from "../../core/ports/api/IGetFirstOffersUseCase";
import { IOfferRepository } from "../../core/ports/persistence/IOfferRepository";

export class GetFirstOffersUseCase implements IGetFirstOffersUseCase {
    private readonly _offerRepository: IOfferRepository;

    constructor(offerRepository: IOfferRepository) {
        this._offerRepository = offerRepository;
    }

    async execute(limit: number): Promise<Offre[]> {
        const offersRaw = await this._offerRepository.getFirstOffers(limit);
        const offres = offersRaw.map((offerRaw) => new Offre(offerRaw));

        return offres;
    }
}
