import { ISelectOffer, Offre } from "../../core/entities/Offre";
import { IOfferRepository } from "../../core/ports/persistence/IOfferRepository";
import { pool, query } from "../../database";
import Cursor from "pg-cursor";

export class OfferRepository implements IOfferRepository {
    async execute(limit: number) {
        try {
            let offers: Offre[];

            const client = await pool.connect();
            let statement = `SELECT * FROM offre LIMIT $1;`;
            const res = await client.query<ISelectOffer>(statement, [limit]);
            console.log(res.rows);
            offers = res.rows.map((offerRow: ISelectOffer) => {
                return new Offre(offerRow);
            });

            pool.end();
            return offers;
        } catch (e) {
            console.error("database query failed", e);
            throw e;
        }
    }
}
