import { Router } from "express";
import { pool } from "./database";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { ApiServer } from "./presentation/ApiServer";
import { GetUserApplicationsCountController } from "./core/user/controllers/GetUserApplicationsCountController";
import { GetUserApplicationsCountUseCase } from "./core/user/ports/GetUserApplicationsCountUseCase";
import { GetOffersUseCase } from "./core/offre/ports/GetOffersUseCase";
import { GetOffersController } from "./core/offre/controllers/GetOffersController";
import { GetUserSecteurOffersCountUseCase } from "./core/user/ports/GetUserSecteurOffersCountUseCase";
import { GetUserSecteurOffersCountController } from "./core/user/controllers/GetUserSecteurOffersCountController";

export async function main(): Promise<void> {
    // Inject
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);

    // Get application stats
    const getUserApplicationsCountUseCase = new GetUserApplicationsCountUseCase(postgreRepository);
    const getUserApplicationsCountController = new GetUserApplicationsCountController(getUserApplicationsCountUseCase);

    const getUserSecteurOffersCountUseCase = new GetUserSecteurOffersCountUseCase(postgreRepository);
    const getUserSecteurOffersCountController = new GetUserSecteurOffersCountController(
        getUserSecteurOffersCountUseCase
    );

    // Offers
    const getOffersUseCase = new GetOffersUseCase(postgreRepository);
    const getOffersController = new GetOffersController(getOffersUseCase);

    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getOffersController.handle);
    const userRouter = Router();
    userRouter.route("/v1/users/getApplicationCount").get(getUserApplicationsCountController.handle);
    userRouter.route("/v1/users/getSecteurOffersCount").get(getUserSecteurOffersCountController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);

    app.listen(3000);
}

main();
