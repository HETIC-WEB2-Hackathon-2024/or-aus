import { Router } from "express";
import { pool } from "./database";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { ApiServer } from "./adapter.api.express/ApiServer";
import { GetCandidatCandidaturesCountController } from "./core/candidat/controllers/GetCandidatCandidaturesCountController";
import { GetCandidatCandidaturesCountUseCase } from "./core/candidat/ports/GetCandidatCandidaturesCountUseCase";
import { GetOffersUseCase } from "./core/offre/ports/GetOffersUseCase";
import { GetOffersController } from "./core/offre/controllers/GetOffersController";
import { GetCandidatSecteurOffersStatsController } from "./core/candidat/controllers/GetCandidatSecteurOffersStatsController";
import { GetCandidatSecteurOffersStatsUseCase } from "./core/candidat/ports/GetCandidatSecteurOffersStatsUseCase";

export async function main(): Promise<void> {
    // Inject
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);

    // Get application stats
    const getCandidatCandidaturesCountUseCase = new GetCandidatCandidaturesCountUseCase(postgreRepository);
    const getCandidatCandidaturesCountController = new GetCandidatCandidaturesCountController(
        getCandidatCandidaturesCountUseCase
    );

    const getCandidatSecteurOffersStatsUseCase = new GetCandidatSecteurOffersStatsUseCase(postgreRepository);
    const getCandidatSecteurOffersStatsController = new GetCandidatSecteurOffersStatsController(
        getCandidatSecteurOffersStatsUseCase
    );

    // Offers
    const getOffersUseCase = new GetOffersUseCase(postgreRepository);
    const getOffersController = new GetOffersController(getOffersUseCase);

    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getOffersController.handle);
    const userRouter = Router();
    userRouter.route("/v1/users/getApplicationCount").get(getCandidatCandidaturesCountController.handle);
    userRouter.route("/v1/users/getSecteurOffersCount").get(getCandidatSecteurOffersStatsController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);

    app.listen(3000);
}
