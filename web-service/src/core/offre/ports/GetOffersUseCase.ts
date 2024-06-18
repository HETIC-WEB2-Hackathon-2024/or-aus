import { Offre } from "../domain/Offre";
import { IUseCase } from "../../../shared/IUseCase";
import { IOfferRepository } from "./IOfferRepository";
import { IOfferFilter } from "./../filter/IOfferFilter";

interface IGetOffersUseCaseDto {
    filters: IOfferFilter;
    limit: number;
}

export class GetOffersUseCase implements IUseCase<IGetOffersUseCaseDto, Offre[]> {
    public constructor(private readonly _offerRepository: IOfferRepository) {}

    public async execute(input: IGetOffersUseCaseDto): Promise<Offre[]> {
        const offersRaw = await this._offerRepository.getOffers(input.limit, input.filters);

        return offersRaw;
    }
}
