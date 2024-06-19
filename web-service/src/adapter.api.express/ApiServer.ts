import cors from "cors";
import express, { Express, Router } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import morgan from "morgan";

export class ApiServer {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(
      auth({
        audience: "api.or.aus.floless.fr",
        issuerBaseURL: "https://or-aus.eu.auth0.com/",
        tokenSigningAlg: "RS256",
      })
    );
  }
  public addRoute(router: Router) {
    this.app.use(router);
  }

  public listen(port: number, fn?: () => void) {
    this.app.listen(port, fn);
  }
}
