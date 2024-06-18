import { Router } from "express";
import { GetFirstOffersUseCase } from "./core/offre/ports/GetFirstOffersUseCase";
import { pool } from "./database";
import { PostgresRepository } from "./adapter.spi.postgresql/PostgresRepository";
import { ApiServer } from "./presentation/ApiServer";
import { GetFirstOffersController } from "./core/offre/controllers/GetFirstOffersController";
import { GetOffersUseCase } from "./core/offre/ports/GetOffersUseCase";
import { GetOffersController } from "./core/offre/controllers/GetOffersController";

export async function main(): Promise<void> {
    // Inject
    const poolClient = pool;
    const postgreRepository = new PostgresRepository(poolClient);
    const getFirstOffersUseCase = new GetFirstOffersUseCase(postgreRepository);
    const getFirstOffersController = new GetFirstOffersController(getFirstOffersUseCase);

    // Offers
    const getOffersUseCase = new GetOffersUseCase(postgreRepository);
    const getOffersController = new GetOffersController(getOffersUseCase);

    // Routing
    const offersRouter = Router();
    offersRouter.route("/v1/offres").get(getOffersController.handle);

    // Configure and listen
    const app = new ApiServer();
    app.addRoute(offersRouter);

    app.listen(3000);
}

main();
