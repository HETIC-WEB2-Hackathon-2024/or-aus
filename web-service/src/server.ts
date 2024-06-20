import { Router } from "express";
import { ApiServer } from "./adapter.api.express/ApiServer";
import { Auth0Repository } from "./adapter.spi.postgresql/Auth0Repository";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { AddCandidatController } from "./core/candidat/controllers/AddCandidatController";
import { GetCandidatInfoMiddleware } from "./core/candidat/controllers/GetCandidatInfoMiddleware";
import { AddCandidatUseCase } from "./core/candidat/ports/AddCandidatUseCase";
import { GetCandidatInfoUseCase } from "./core/candidat/ports/GetCandidatInfoUseCase";
import { GetDashboardStatisticsController } from "./core/dashboard/controllers/GetDashboardStatisticsController";
import { GetCandidatCandidaturesCountUseCase } from "./core/dashboard/ports/GetCandidatCandidaturesCountUseCase";
import { GetCandidatCommuneOffersStatsUseCase } from "./core/dashboard/ports/GetCandidatCommuneOffersStatsUseCase";
import { GetCandidatSecteurOffersStatsUseCase } from "./core/dashboard/ports/GetCandidatSecteurOffersStatsUseCase";
import { AddFavoriteController } from "./core/favorite/controllers/AddFavoriteController";
import { GetFavoriteController } from "./core/favorite/controllers/GetFavoriteController";
import { RemoveFavoriteController } from "./core/favorite/controllers/RemoveFavoriteControllers";
import { AddFavoriteUseCase } from "./core/favorite/ports/AddFavoriteUseCase";
import { GetFavoritesUseCase } from "./core/favorite/ports/GetFavoritesUseCase";
import { RemoveFavoriteUseCase } from "./core/favorite/ports/RemoveFavoriteUseCase";
import { GetContractTypesController } from "./core/offre/controllers/GetContractTypesController";
import { GetOffersController } from "./core/offre/controllers/GetOffersController";
import { GetContractTypesUseCase } from "./core/offre/ports/GetContractTypesUseCase";
import { GetOffersUseCase } from "./core/offre/ports/GetOffersUseCase";
import { pool } from "./database";

export async function main(): Promise<void> {
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);
    const auth0Repository = new Auth0Repository();

    // Candidat
    const getCandidatInfoUseCase = new GetCandidatInfoUseCase(auth0Repository, postgreRepository);
    const getCandidatInfoMiddleware = new GetCandidatInfoMiddleware(getCandidatInfoUseCase);
    const addCandidatUseCase = new AddCandidatUseCase(postgreRepository);
    const addCandidatController = new AddCandidatController(addCandidatUseCase);

    // Dashboard
    const getCandidatCandidaturesCountUseCase = new GetCandidatCandidaturesCountUseCase(postgreRepository);
    const getCandidatCommuneOffersStatsUseCase = new GetCandidatCommuneOffersStatsUseCase(postgreRepository);
    const getCandidatSecteurOffersStatsUseCase = new GetCandidatSecteurOffersStatsUseCase(postgreRepository);

    const getDashboardStatisticsController = new GetDashboardStatisticsController(
        getCandidatCandidaturesCountUseCase,
        getCandidatCommuneOffersStatsUseCase,
        getCandidatSecteurOffersStatsUseCase
    );

    // Offers
    const getOffersUseCase = new GetOffersUseCase(postgreRepository);
    const getOffersController = new GetOffersController(getOffersUseCase);
    const getContractTypesUseCase = new GetContractTypesUseCase(postgreRepository);
    const getContractTypesController = new GetContractTypesController(getContractTypesUseCase);

    // Favorite
    const addFavoriteUseCase = new AddFavoriteUseCase(postgreRepository);
    const addFavoriteController = new AddFavoriteController(addFavoriteUseCase);

    const removeFavoriteUseCase = new RemoveFavoriteUseCase(postgreRepository);
    const removeFavoriteController = new RemoveFavoriteController(removeFavoriteUseCase);

    const getFavoriteUseCase = new GetFavoritesUseCase(postgreRepository);
    const getFavoriteController = new GetFavoriteController(getFavoriteUseCase);

    // Routing

    //Offers routes
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getOffersController.handle);
    offersRouter.route("/v1/offres/favorite").delete(getCandidatInfoMiddleware.handle, removeFavoriteController.handle);
    offersRouter.route("/v1/offres/favorite").get(getCandidatInfoMiddleware.handle, getFavoriteController.handle);
    offersRouter.route("/v1/offres/favorite").post(getCandidatInfoMiddleware.handle, addFavoriteController.handle);
    offersRouter.route("/v1/offres/contractTypes").get(getContractTypesController.handle);

    // User routes
    const userRouter = Router();
    userRouter.route("/v1/users").post(getCandidatInfoMiddleware.handle, addCandidatController.handle);
    userRouter
        .route("/v1/users/dashboard")
        .get(getCandidatInfoMiddleware.handle, getDashboardStatisticsController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);
    app.listen(3000);
}

main();
