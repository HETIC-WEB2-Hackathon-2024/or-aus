import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../shared/IController";
import { GetCandidatCommuneOffersStatsUseCase } from "../ports/GetCandidatCommuneOffersStatsUseCase";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { RequestWithUserInfo } from "./GetCandidatInfoMiddleware";

export class GetCandidatCommuneOffersStatsController implements IController {
    public constructor(private readonly _useCase: GetCandidatCommuneOffersStatsUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.user?.id) throw new Error("Token must be set");

            const result = await this._useCase.execute({ id: req.user?.id });
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) res.status(400).send({ error: error.message, reason: error });
            else if (error instanceof Error) {
                console.error(error);
                res.status(500).send({ error: error.message, reason: error });
            }
        }
    }
}
