import { Pool } from "pg";

import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { IUserRepository } from "../core/user/ports/IUserRepository";
import { Offre } from "../core/offre/domain/Offre";
import { TUserId } from "../core/user/domain/Utilisateur";

export class PostgresRepository implements IOfferRepository, IUserRepository {
    public constructor(private readonly _pool: Pool) {}

    async getRegisteredOffers(user_id: TUserId): Promise<Offre[]> {
        throw new Error("Method not implemented.");
    }

    async getUserApplicationsCount(user_id: TUserId): Promise<number> {
        const client = await this._pool.connect();
        try {
            const query =
                "SELECT COUNT(*) as count FROM candidat AS c JOIN candidat_offres AS co ON co.candidat_id = c.id WHERE c.id = $1;";
            const result = await client.query<{ count: number }>(query, [user_id]);
            return result.rows[0].count;
        } finally {
            client.release();
        }
    }

    async getFirsts(limit: number): Promise<Offre[]> {
        const client = await this._pool.connect();
        try {
            const query = "SELECT * FROM offre LIMIT $1;";
            const results = await client.query<Offre>(query, [limit]);
            return results.rows;
        } finally {
            client.release();
        }
    }
}
