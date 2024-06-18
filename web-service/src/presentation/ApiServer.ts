import cors from "cors";
import express, { Express, Request, Response, Router } from "express";
import { InvalidRequestError, auth } from "express-oauth2-jwt-bearer";

export class ApiServer {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(cors());
        // this.app.use(
        //     auth({
        //         audience: "api.aus.floless.fr",
        //         issuerBaseURL: "https://adopte-un-stagiaire.eu.auth0.com/",
        //         tokenSigningAlg: "RS256",
        //     })
        // );
    }

    public addRoute(router: Router) {
        this.app.use(router);
    }

    public listen(port: number, fn?: () => void) {
        this.app.listen(port, fn);
    }
}
