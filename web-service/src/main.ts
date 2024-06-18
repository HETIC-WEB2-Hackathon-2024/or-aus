import { Router } from "express";
import { pool } from "./database";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { ApiServer } from "./adapter.api.express/ApiServer";
import { GetCandidatCandidaturesCountController } from "./core/candidat/controllers/GetCandidatCandidaturesCountController";
import { GetCandidatCandidaturesCountUseCase } from "./core/candidat/ports/GetCandidatCandidaturesCountUseCase";
import { GetOffersUseCase } from "./core/offre/ports/GetOffersUseCase";
import { GetOffersController } from "./core/offre/controllers/GetOffersController";
import { GetCandidatSecteurOffersCountController } from "./core/candidat/controllers/GetCandidatSecteurOffersCountController";
import { GetCandidatSecteurOffersCountUseCase } from "./core/candidat/ports/GetCandidatSecteurOffersCountUseCase";

export async function main(): Promise<void> {
    // Inject
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);

    // Get application stats
    const getCandidatCandidaturesCountUseCase = new GetCandidatCandidaturesCountUseCase(postgreRepository);
    const getCandidatCandidaturesCountController = new GetCandidatCandidaturesCountController(
        getCandidatCandidaturesCountUseCase
    );

    const getCandidatSecteurOffersCountUseCase = new GetCandidatSecteurOffersCountUseCase(postgreRepository);
    const getCandidatSecteurOffersCountController = new GetCandidatSecteurOffersCountController(
        GetCandidatSecteurOffersCountUseCase
    );

    // Offers
    const getOffersUseCase = new GetOffersUseCase(postgreRepository);
    const getOffersController = new GetOffersController(getOffersUseCase);

    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getOffersController.handle);
    const userRouter = Router();
    userRouter.route("/v1/users/getApplicationCount").get(GetCandidatCandidaturesCountController.handle);
    userRouter.route("/v1/users/getSecteurOffersCount").get(GetCandidatSecteurOffersCountController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);

    app.listen(3000);
}
