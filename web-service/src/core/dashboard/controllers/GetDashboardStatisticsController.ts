import { Response } from "express";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { Dashboard } from "../domain/Dashboard";
import { GetCandidatCommuneOffersStatsUseCase } from "../ports/GetCandidatCommuneOffersStatsUseCase";
import { GetCandidatSecteurOffersStatsUseCase } from "../ports/GetCandidatSecteurOffersStatsUseCase";
import { GetCandidatFavoriteCountUseCase } from "../ports/GetCandidatFavoriteCountUseCase";
import { GetCandidatCandidaturesUseCase } from "../ports/GetCandidatCandidaturesUseCase";

export class GetDashboardStatisticsController implements IController {
    private _candidatureUseCase: GetCandidatCandidaturesUseCase;
    private _communeUseCase: GetCandidatCommuneOffersStatsUseCase;
    private _secteurUseCase: GetCandidatSecteurOffersStatsUseCase;
    private _favoriteUseCase: GetCandidatFavoriteCountUseCase;

    public constructor(
        candidatureUseCase: GetCandidatCandidaturesUseCase,
        communeUseCase: GetCandidatCommuneOffersStatsUseCase,
        secteurUseCase: GetCandidatSecteurOffersStatsUseCase,
        favoriteUseCase: GetCandidatFavoriteCountUseCase
    ) {
        this._candidatureUseCase = candidatureUseCase;
        this._secteurUseCase = secteurUseCase;
        this._communeUseCase = communeUseCase;
        this._favoriteUseCase = favoriteUseCase;

        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const user_id = req.user?.id;
            if (!user_id) throw new Error("token must be set");

            const commune_stats = await this._communeUseCase.execute({ id: user_id });
            const secteur_stats = await this._secteurUseCase.execute({ id: user_id });
            const candidatures_stats = await this._candidatureUseCase.execute({ id: user_id });
            const favorite_stats = await this._favoriteUseCase.execute({ id: user_id });

            res.status(200).json(
                new Dashboard(
                    commune_stats,
                    secteur_stats,
                    candidatures_stats.stats,
                    favorite_stats,
                    candidatures_stats.graph_data
                )
            );
        } catch (e) {
            if (e instanceof Error) {
                res.status(400).send({ error: e.message, reason: e });
            }
        }
    }
}
