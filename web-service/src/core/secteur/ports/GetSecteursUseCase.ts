import { IUseCase } from "../../../shared/IUseCase";
import { ISecteurRepository } from "./ISecteurRepository";
import { TSecteur } from "../shared/TSecteur"

export class GetSecteursUseCase implements IUseCase<{}, TSecteur[]> {
    public constructor(private readonly _offerRepository: ISecteurRepository) {}

    public async execute(): Promise<TSecteur[]> {
        const secteurs = await this._offerRepository.getSecteursDistinct();
        return secteurs;
    }
}
