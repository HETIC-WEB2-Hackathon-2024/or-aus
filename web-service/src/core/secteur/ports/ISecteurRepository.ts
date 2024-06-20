import { Secteur } from "../domain/Secteur";

export interface ISecteurRepository {
    getSecteursDistinct(): Promise<Secteur[]>;
}
