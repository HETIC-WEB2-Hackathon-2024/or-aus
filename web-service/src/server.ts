import { Router } from "express";
import { GetFirstOffersUseCase } from "./core/offre/ports/GetFirstOffersUseCase";
import { pool } from "./database";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { ApiServer } from "./presentation/ApiServer";
import { GetFirstOffersController } from "./core/offre/controllers/GetFirstOffersController";
import { GetUserApplicationsCountController } from "./core/user/controllers/GetUserApplicationsCountController";
import { GetUserApplicationsCountUseCase } from "./core/user/ports/GetUserApplicationsCountUseCase";

export async function main(): Promise<void> {
    // Inject
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);
    const getFirstOffersUseCase = new GetFirstOffersUseCase(postgreRepository);
    const getFirstOffersController = new GetFirstOffersController(getFirstOffersUseCase);

    const getUserApplicationsCountUseCase = new GetUserApplicationsCountUseCase(postgreRepository);
    const getUserApplicationsCountController = new GetUserApplicationsCountController(getUserApplicationsCountUseCase);

    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getFirstOffersController.handle);

    const userRouter = Router();
    userRouter.route("/v1/users/getApplicationCount").get(getUserApplicationsCountController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);
    app.addRoute(userRouter);

    app.listen(3000);
}

main();
