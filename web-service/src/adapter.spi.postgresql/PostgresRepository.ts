import { Pool } from "pg";

import { Favorite } from "../core/favorite/domains/Favorite.js";
import { IFavoriteRepository } from "../core/favorite/ports/IFavoriteRepository.js";
import { Offre, TOffreId } from "../core/offre/domain/Offre";
import { IOfferFilter } from "../core/offre/filter/IOfferFilter";
import { IOfferRepository } from "../core/offre/ports/IOfferRepository";
import { FilterHelper } from "../core/offre/shared/Filter-helper";
import { TUserId } from "../core/user/domain/Utilisateur";
import { IUserRepository } from "../core/user/ports/IUserRepository";

export class PostgresRepository implements IOfferRepository, IUserRepository, IFavoriteRepository {
    public constructor(private readonly _pool: Pool) { }

    async getUserSecteurOffersCount(input: TUserId): Promise<number> {
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

    async getFavoriteOffers({ id: user_id }: TUserId): Promise<Offre[]> {
        const client = await this._pool.connect();
        try {
            const query = "SELECT * FROM favorite WHERE candidat_id = $1;";
            const result = await client.query<Favorite>(query, [user_id]);
            const offers: Offre[] = [];

            for (const favorite of result.rows) {
                const offre = await this.getOffers(1, { id: favorite.offre_id.toString() });
                offers.push(offre[0]);
            }

            return offers;
        } finally {
            client.release();
        }
    }

    async removeFavoriteOffer({ id: user_id }: TUserId, { id: offer_id }: TOffreId): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getUserApplicationsCount(input: TUserId): Promise<number> {
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

    async getOffers(limit: number, filters: IOfferFilter): Promise<Offre[]> {
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
