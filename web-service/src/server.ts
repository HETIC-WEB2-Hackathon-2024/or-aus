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
import { GetCandidatParametreController } from "./core/parametre/controllers/GetCandidatParametreController";
import { PutCandidatParametreEmailController } from "./core/parametre/controllers/PutCandidatParametreEmailController";
import { PutCandidatParametreInfoController } from "./core/parametre/controllers/PutCandidatParametreInfoController";
import { PutCandidatParametreLocController } from "./core/parametre/controllers/PutCandidatParametreLocController";
import { PutCandidatParametrePasswordController } from "./core/parametre/controllers/PutCandidatParametrePasswordController";
import { PutCandidatParametreTelController } from "./core/parametre/controllers/PutCandidatParametreTelController";
import { GetCandidatParametreUseCase } from "./core/parametre/ports/GetCandidatParametreUseCase";
import { PutCandidatParametreEmailUseCase } from "./core/parametre/ports/PutCandidatParametreEmailUseCase";
import { PutCandidatParametreInfoUseCase } from "./core/parametre/ports/PutCandidatParametreInfoUseCase";
import { PutCandidatParametreLocUseCase } from "./core/parametre/ports/PutCandidatParametreLocUseCase";
import { PutCandidatParametrePasswordUseCase } from "./core/parametre/ports/PutCandidatParametrePasswordUseCase";
import { PutCandidatParametreTelUseCase } from "./core/parametre/ports/PutCandidatParametreTelUseCase";
import { GetSecteursController } from "./core/secteur/controllers/GetSecteursControllers";
import { GetSecteursUseCase } from "./core/secteur/ports/GetSecteursUseCase";
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

    // Secteur 
    const getSecteursUseCase = new GetSecteursUseCase(postgreRepository);
    const getSecteursController = new GetSecteursController(getSecteursUseCase);

    // Parameters
    const getCandidatParametreUseCase = new GetCandidatParametreUseCase(postgreRepository);
    const getCandidatParametreController = new GetCandidatParametreController(getCandidatParametreUseCase);
    const putCandidatParametreInfoUseCase = new PutCandidatParametreInfoUseCase(postgreRepository);
    const putCandidatParametreInfoController = new PutCandidatParametreInfoController(putCandidatParametreInfoUseCase);
    const putCandidatParametreLocUseCase = new PutCandidatParametreLocUseCase(postgreRepository);
    const putCandidatParametreLocController = new PutCandidatParametreLocController(putCandidatParametreLocUseCase);
    const putCandidatParametrePasswordUseCase = new PutCandidatParametrePasswordUseCase(postgreRepository);
    const putCandidatParametrePasswordController = new PutCandidatParametrePasswordController(putCandidatParametrePasswordUseCase);
    const putCandidatParametreEmailUseCase = new PutCandidatParametreEmailUseCase(postgreRepository);
    const putCandidatParametreEmailController = new PutCandidatParametreEmailController(putCandidatParametreEmailUseCase);
    const putCandidatParametreTelUseCase = new PutCandidatParametreTelUseCase(postgreRepository);
    const putCandidatParametreTelController = new PutCandidatParametreTelController(putCandidatParametreTelUseCase);

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
    userRouter.route("/v1/users")
        .post(getCandidatInfoMiddleware.handle, addCandidatController.handle);
    userRouter.route("/v1/users")
        .get(getCandidatInfoMiddleware.handle,);
    userRouter
        .route("/v1/users/dashboard")
        .get(getCandidatInfoMiddleware.handle, getDashboardStatisticsController.handle);

    // Parameter routes
    const parametersRouter = Router();
    parametersRouter.route("/v1/parameters").get(getCandidatInfoMiddleware.handle, getCandidatParametreController.handle);
    parametersRouter.route("/v1/parameters/info").put(getCandidatInfoMiddleware.handle, putCandidatParametreInfoController.handle);
    parametersRouter.route("/v1/parameters/loc").put(getCandidatInfoMiddleware.handle, putCandidatParametreLocController.handle);
    parametersRouter.route("/v1/parameters/password").put(getCandidatInfoMiddleware.handle, putCandidatParametrePasswordController.handle);
    parametersRouter.route("/v1/parameters/email").put(getCandidatInfoMiddleware.handle, putCandidatParametreEmailController.handle);
    parametersRouter.route("/v1/parameters/tel").put(getCandidatInfoMiddleware.handle, putCandidatParametreTelController.handle);

    // Secteur routes
    const secteurRouter = Router();
    secteurRouter.route("/v1/secteurs").get(getSecteursController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);
    app.addRoute(secteurRouter);
    app.addRoute(parametersRouter);
    app.listen(3000);
}

main();
