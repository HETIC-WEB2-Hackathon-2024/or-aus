import { ISelectOffer, Offre } from "../../core/entities/Offre";
import { IOfferRepository } from "../../core/ports/persistence/IOfferRepository";
import { pool, query } from "../../database";
import Cursor from "pg-cursor";

export class OfferRepository implements IOfferRepository {
    async getFirstOffers(limit: number) {
        const client = await pool.connect();
        try {
            let statement = `SELECT * FROM offre LIMIT $1;`;
            const res = await client.query<ISelectOffer>(statement, [limit]);
            return res.rows;
        } catch (e) {
            console.error("database query failed", e);
            throw e;
        } finally {
            client.release();
        }
    }
}
