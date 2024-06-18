import { Pool } from "pg";

import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { ICandidatRepository } from "../core/candidat/ports/ICandidatRepository";
import { Offre } from "../core/offre/domain/Offre";
import { IOfferFilter } from "../core/offre/filter/IOfferFilter";
import { FilterHelper } from "../core/offre/shared/Filter-helper";
import { TCandidatId } from "../core/candidat/domain/Candidat";

export class PostgresRepository implements IOfferRepository, ICandidatRepository {
    public constructor(private readonly _pool: Pool) {}

    async getCandidatSecteurOffersCount(input: TCandidatId): Promise<number> {
        const client = await this._pool.connect();
        try {
            const query =
                "SELECT COUNT(*) FROM candidat_secteurs AS cs JOIN offre AS o ON cs.secteur_id = o.secteur_id WHERE cs.candidat_id = $1;";
            const result = await client.query<{ count: number }>(query, [input.id]);
            return result.rows[0].count;
        } finally {
            client.release();
        }
    }

    async getRegisteredOffers(input: TCandidatId): Promise<Offre[]> {
        throw new Error("Method not implemented.");
    }

    async getCandidatCandidaturesCount(input: TCandidatId): Promise<number> {
        const client = await this._pool.connect();
        try {
            const query =
                "SELECT COUNT(*) as count FROM candidat AS c JOIN candidat_offres AS co ON co.candidat_id = c.id WHERE c.id = $1;";
            const result = await client.query<{ count: number }>(query, [input.id]);
            return result.rows[0].count;
        } finally {
            client.release();
        }
    }

    async getOffers(limit: number, filters: IOfferFilter) {
        const client = await this._pool.connect();
        try {
            const queryWithFilters = FilterHelper.createOffersQueryWithFilters(limit, filters);
            const results = await client.query<Offre>(queryWithFilters.query, queryWithFilters.options);
            return results.rows;
        } finally {
            client.release();
        }
    }
}
