import { Offre } from "../../entities/Offre";

export interface IGetFirstOffersUseCase {
    execute(limit: number): Promise<Offre[]>;
}
