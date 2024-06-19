import { Client, Pool } from "pg";

import { Candidat, TCandidatEmail, TCandidatId } from "../core/candidat/domain/Candidat";
import {
    ICandidatCommuneOffersStatsResponse,
    ICandidatRepository,
    ICandidatSecteurOffersStatsResponse,
} from "../core/candidat/ports/ICandidatRepository";
import { Favorite, TFavoriteId } from "../core/favorite/domains/Favorite";
import { IFavoriteRepository } from "../core/favorite/ports/IFavoriteRepository";
import { Offre } from "../core/offre/domain/Offre";
import { IOfferFilter } from "../core/offre/filter/IOfferFilter";
import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { FilterHelper } from "../core/offre/shared/Filter-helper";
import { TContract } from "../core/offre/shared/TContract";

export class PostgresRepository implements IOfferRepository, ICandidatRepository {
    public constructor(private readonly _pool: Pool) {}
    async getCandidatInfo(input: TCandidatEmail): Promise<Candidat> {
        const client = await this._pool.connect();
        try {
            const query = `SELECT * FROM candidat WHERE candidat.email = $1`;
            const {
                rows: [result],
            } = await client.query<Candidat>(query, [input.email]);

            if (!result) throw new Error(`Candidat ${input.email} not found`);

            return result;
        } finally {
            client.release();
        }
    }

    async getCandidatCandidaturesCount(input: TCandidatId): Promise<number> {
        const client = await this._pool.connect();
        try {
            const query = `SELECT 
                        COUNT(*) AS nombre
                        FROM 
                        public.offre AS o
                        JOIN 
                        public.candidat_communes AS c ON c.commune_id = o.commune_id
                        WHERE c.candidat_id = $1`;
            const {
                rows: [result],
            } = await client.query<{ nombre: number }>(query, [input.id]);

            return result.nombre;
        } finally {
            client.release();
        }
    }

    async getCandidatSecteurOffersStats(
        input: TCandidatId
    ): Promise<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">> {
        const client = await this._pool.connect();
        try {
            const query = `
                SELECT
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE) THEN 1 END) AS current_month,
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month') THEN 1 END) AS previous_month,
                    s.secteur
                FROM candidat_secteurs AS cs
                JOIN offre AS o ON cs.secteur_id = o.secteur_id
                JOIN secteur AS s ON cs.secteur_id = s.id
                WHERE cs.candidat_id = $1
                GROUP BY s.secteur`;

            const {
                rows: [result],
            } = await client.query<Omit<ICandidatSecteurOffersStatsResponse, "comparison_percentage">>(query, [
                input.id,
            ]);

            return {
                current_month: +result.current_month,
                previous_month: +result.previous_month,
                secteur: result.secteur,
            };
        } finally {
            client.release();
        }
    }

    async getFavorites(input: TCandidatId): Promise<Offre[]> {
        const client = await this._pool.connect();

        try {
            const query = "SELECT * FROM favorite WHERE candidat_id = $1;";
            const result = await client.query<Favorite>(query, [input.id]);
            const offers: Offre[] = [];

            for (const favorite of result.rows) {
                const offre = await this.getOffers(1, 0, { id: favorite.offre_id.toString() });
                offers.push(offre[0]);
            }

            return offers;
        } finally {
            client.release();
        }
    }

    async getCandidatCommuneOffersStats(
        input: TCandidatId
    ): Promise<Omit<ICandidatCommuneOffersStatsResponse, "comparison_percentage">> {
        const client = await this._pool.connect();
        try {
            const query = `
                SELECT 
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE) THEN 1 END) AS current_month,
                    COUNT(CASE WHEN date_trunc('month', o.date) = date_trunc('month', CURRENT_DATE - INTERVAL '1 month') THEN 1 END) AS previous_month,
                    co.nom_commune AS commune,
                    co.code_postal AS code_postal
                FROM candidat AS ca
                JOIN candidat_communes AS cc ON ca.id = cc.candidat_id
                JOIN commune AS co ON cc.commune_id = co.id
                JOIN offre AS o ON co.id = o.commune_id
                WHERE ca.id = $1
                GROUP BY co.nom_commune, co.code_postal;
                `;

            const {
                rows: [result],
            } = await client.query<Omit<ICandidatCommuneOffersStatsResponse, "comparison_percentage">>(query, [
                input.id,
            ]);

            return {
                current_month: +result.current_month,
                previous_month: +result.previous_month,
                commune: result.commune,
                code_postal: result.code_postal,
            };
        } finally {
            client.release();
        }
    }

    async getOffers(limit: number, offset: number, filters: IOfferFilter): Promise<Offre[]> {
        const client = await this._pool.connect();
        try {
            const queryWithFilters = FilterHelper.createOffersQueryWithFilters(limit, offset, filters);
            const results = await client.query<Offre>(queryWithFilters.query, queryWithFilters.options);
            return results.rows;
        } finally {
            client.release();
        }
    }
    async removeFavorite(input: TFavoriteId): Promise<void> {
        const client = await this._pool.connect();
        try {
            await client.query("DELETE FROM favorite WHERE offre_id = $1 AND candidat_id = $2", [
                input.offre_id,
                input.candidat_id,
            ]);
        } finally {
            client.release();
        }
    }
    async addFavorite(candidatId: number, offreId: number): Promise<void> {
        const client = await this._pool.connect();
        try {
            const query = `
                    INSERT INTO favorite (candidat_id, offre_id, add_date)
                    VALUES ($1, $2, current_timestamp);`;
            await client.query(query, [candidatId, offreId]);
        } finally {
            client.release();
        }
    }

    async getContractTypes(): Promise<TContract[]> {
        const client = await this._pool.connect();
        try {
            const results = await client.query("SELECT DISTINCT contrat FROM offre", []);
            return results.rows;
        } finally {
            client.release();
        }
    }
}
