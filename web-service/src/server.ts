import { Router } from "express"
import { pool } from "./database";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { ApiServer } from "./adapter.api.express/ApiServer";
import { GetCandidatCandidaturesCountController } from "./core/candidat/controllers/GetCandidatCandidaturesCountController";
import { GetCandidatCandidaturesCountUseCase } from "./core/candidat/ports/GetCandidatCandidaturesCountUseCase";
import { GetOffersUseCase } from "./core/offre/ports/GetOffersUseCase";
import { GetOffersController } from "./core/offre/controllers/GetOffersController";
import { GetCandidatSecteurOffersStatsController } from "./core/candidat/controllers/GetCandidatSecteurOffersStatsController";
import { GetCandidatSecteurOffersStatsUseCase } from "./core/candidat/ports/GetCandidatSecteurOffersStatsUseCase";
import { GetCandidatCommuneOffersStatsUseCase } from "./core/candidat/ports/GetCandidatCommuneOffersStatsUseCase";
import { GetCandidatCommuneOffersStatsController } from "./core/candidat/controllers/GetCandidatCommuneOffersStatsController";
import { AddFavoriteUseCase } from "./core/favorite/ports/AddFavoriteUseCase";
import { AddFavoriteController } from "./core/favorite/controllers/AddFavoriteController";
import { RemoveFavoriteController } from "./core/favorite/controllers/RemoveFavoriteControllers";
import { RemoveFavoriteUseCase } from "./core/favorite/ports/RemoveFavoriteUseCase";

export async function main(): Promise<void> {
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);

    // Get application stats
    const getCandidatCandidaturesCountUseCase = new GetCandidatCandidaturesCountUseCase(postgreRepository);
    const getCandidatCandidaturesCountController = new GetCandidatCandidaturesCountController(
        getCandidatCandidaturesCountUseCase
    );

    const getCandidatCommuneOffersStatsUseCase = new GetCandidatCommuneOffersStatsUseCase(postgreRepository);
    const getCandidatCommuneOffersStatsController = new GetCandidatCommuneOffersStatsController(
        getCandidatCommuneOffersStatsUseCase
    );

    const getCandidatSecteurOffersStatsUseCase = new GetCandidatSecteurOffersStatsUseCase(postgreRepository);
    const getCandidatSecteurOffersStatsController = new GetCandidatSecteurOffersStatsController(
        getCandidatSecteurOffersStatsUseCase
    );

    // Offers
    const getOffersUseCase = new GetOffersUseCase(postgreRepository);
    const getOffersController = new GetOffersController(getOffersUseCase);

    // Favorite
    const addFavoriteUseCase = new AddFavoriteUseCase(postgreRepository);
    const addFavoriteController = new AddFavoriteController(addFavoriteUseCase);

    const removeFavoriteUseCase = new RemoveFavoriteUseCase(postgreRepository);
    const removeFavoriteController = new RemoveFavoriteController(removeFavoriteUseCase);
    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getOffersController.handle);

    const userRouter = Router();
    userRouter.route("/v1/users/getApplicationCount").get(getCandidatCandidaturesCountController.handle);
    userRouter.route("/v1/users/getSecteurOffersStats").get(getCandidatSecteurOffersStatsController.handle);
    userRouter.route("/v1/users/getCommuneOffersStats").get(getCandidatCommuneOffersStatsController.handle);
    userRouter.route('/v1/users/RemoveFavorite').delete(removeFavoriteController.handle)
    userRouter.route("/v1/users/AddFavorite").post(addFavoriteController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);

    app.listen(3000);
}

main();
    