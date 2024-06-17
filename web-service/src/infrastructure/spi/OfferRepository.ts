import { ISelectOffer, Offre } from "../../core/entities/Offre";
import { IOfferRepository } from "../../core/ports/persistence/IOfferRepository";
import { OffersMapper } from "../../core/mappers/OffersMapper";
import { pool, query } from "../../database";
import Cursor from "pg-cursor";

export class OfferRepository implements IOfferRepository {
    async getFirstOffers(limit: number) {
        try {
            let statement = `SELECT * FROM offre
            JOIN metier ON metier.id = offre.metier_id
            JOIN secteur ON secteur.id = offre.secteur_id
            LIMIT $1`;
            const res = await query(statement, [limit.toString()]);
            return res;
        } catch (e) {
            console.error("database query failed", e);
            throw e;
        }
    }
}
