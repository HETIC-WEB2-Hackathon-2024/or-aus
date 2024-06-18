import { Pool } from "pg";
import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { Offre } from "../core/offre/domain/Offre";
import { pool, query } from "../database";
import Cursor from "pg-cursor";

export class PostgresRepository implements IOfferRepository {
    public constructor(private readonly _pool: Pool) {}

    async getFirsts(limit: number): Promise<Offre[]> {
        const client = await this._pool.connect();
        try {
            const query = `SELECT * FROM offre LIMIT $1;`;
            const results = await client.query<Offre>(query, [limit]);
            return results.rows;
            // }
            // catch(e) {
        } finally {
            client.release();
        }
    }
}
