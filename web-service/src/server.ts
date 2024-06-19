import { Router } from "express";
import { ApiServer } from "./adapter.api.express/ApiServer";
import { Auth0Repository } from "./adapter.spi.postgresql/Auth0Repository";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { GetCandidatCandidaturesCountController } from "./core/candidat/controllers/GetCandidatCandidaturesCountController";
import { GetCandidatCommuneOffersStatsController } from "./core/candidat/controllers/GetCandidatCommuneOffersStatsController";
import { GetCandidatInfoController } from "./core/candidat/controllers/GetCandidatInfoController";
import { GetCandidatSecteurOffersStatsController } from "./core/candidat/controllers/GetCandidatSecteurOffersStatsController";
import { GetCandidatCandidaturesCountUseCase } from "./core/candidat/ports/GetCandidatCandidaturesCountUseCase";
import { GetCandidatCommuneOffersStatsUseCase } from "./core/candidat/ports/GetCandidatCommuneOffersStatsUseCase";
import { GetCandidatInfoUseCase } from "./core/candidat/ports/GetCandidatInfoUseCase";
import { GetCandidatSecteurOffersStatsUseCase } from "./core/candidat/ports/GetCandidatSecteurOffersStatsUseCase";
import { GetFavoriteController } from "./core/favorite/controllers/GetFavoriteController";
import { RemoveFavoriteController } from "./core/favorite/controllers/RemoveFavoriteControllers";
import { GetFavoritesUseCase } from "./core/favorite/ports/GetFavoritesUseCase";
import { RemoveFavoriteUseCase } from "./core/favorite/ports/RemoveFavoriteUseCase";
import { GetOffersController } from "./core/offre/controllers/GetOffersController";
import { GetOffersUseCase } from "./core/offre/ports/GetOffersUseCase";
import { pool } from "./database";

export async function main(): Promise<void> {
    // Inject
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);
    const auth0Repository = new Auth0Repository();

    // Get application stats
    const getCandidatCandidaturesCountUseCase = new GetCandidatCandidaturesCountUseCase(postgreRepository);
    const getCandidatCandidaturesCountController = new GetCandidatCandidaturesCountController(
        getCandidatCandidaturesCountUseCase
    );

    const getCandidatCommuneOffersStatsUseCase = new GetCandidatCommuneOffersStatsUseCase(postgreRepository);
    const getCandidatCommuneOffersStatsController = new GetCandidatCommuneOffersStatsController(
        getCandidatCommuneOffersStatsUseCase
    );

    const getCandidatInfoUseCase = new GetCandidatInfoUseCase(auth0Repository);
    const getCandidatInfoController = new GetCandidatInfoController(getCandidatInfoUseCase);

    const getCandidatSecteurOffersStatsUseCase = new GetCandidatSecteurOffersStatsUseCase(postgreRepository);
    const getCandidatSecteurOffersStatsController = new GetCandidatSecteurOffersStatsController(
        getCandidatSecteurOffersStatsUseCase
    );

    // Offers
    const getOffersUseCase = new GetOffersUseCase(postgreRepository);
    const getOffersController = new GetOffersController(getOffersUseCase);

    // Favorite
    const removeFavoriteUseCase = new RemoveFavoriteUseCase(postgreRepository);
    const removeFavoriteController = new RemoveFavoriteController(removeFavoriteUseCase);
    const getFavoriteUseCase = new GetFavoritesUseCase(postgreRepository);
    const getFavoriteController = new GetFavoriteController(getFavoriteUseCase);

    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getOffersController.handle);
    offersRouter.route("/v1/offres/favorite").delete(removeFavoriteController.handle);
    offersRouter.route("/v1/offres/favorite").get(getFavoriteController.handle);
    const userRouter = Router();
    userRouter.route("/v1/users/getApplicationCount").get(getCandidatCandidaturesCountController.handle);
    userRouter.route("/v1/users/getSecteurOffersStats").get(getCandidatSecteurOffersStatsController.handle);
    userRouter.route("/v1/users/getCommuneOffersStats").get(getCandidatCommuneOffersStatsController.handle);
    userRouter.route("/v1/users/me").get(getCandidatInfoController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);

    app.listen(3000);
}

main();
