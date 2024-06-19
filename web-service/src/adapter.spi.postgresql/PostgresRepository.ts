import { Pool } from "pg";

import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import {
    ICandidatCommuneOffersStatsResponse,
    ICandidatRepository,
    ICandidatSecteurOffersStatsResponse,
} from "../core/candidat/ports/ICandidatRepository";
import { Offre } from "../core/offre/domain/Offre";
import { IOfferFilter } from "../core/offre/filter/IOfferFilter";
import { FilterHelper } from "../core/offre/shared/Filter-helper";
import { TCandidatId } from "../core/candidat/domain/Candidat";

export class PostgresRepository implements IOfferRepository, ICandidatRepository {
    public constructor(private readonly _pool: Pool) { }
    getCandidatCandidaturesCount(user_id: TCandidatId): Promise<number> {
        throw new Error("Method not implemented.");
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

    async getRegisteredOffers(input: TCandidatId): Promise<Offre[]> {
        throw new Error("Method not implemented.");
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

    async removeFavorite(offre_id: number, candidat_id: number): Promise<void> {
        const client = await this._pool.connect();
        try {
            await client.query("DELETE FROM favorite WHERE offre_id = $1 AND candidat_id = $2", [offre_id, candidat_id]);
        } finally {
            client.release();
        }
    }
}
