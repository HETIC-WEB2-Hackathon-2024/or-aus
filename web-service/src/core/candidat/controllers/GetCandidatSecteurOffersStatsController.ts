import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../shared/IController";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { GetCandidatSecteurOffersStatsUseCase } from "../ports/GetCandidatSecteurOffersStatsUseCase";
import { RequestWithUserInfo } from "./GetCandidatInfoMiddleware";

export class GetCandidatSecteurOffersStatsController implements IController {
    public constructor(private readonly _useCase: GetCandidatSecteurOffersStatsUseCase) {
        this.handle = this.handle.bind(this);
    }
    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const user_id = req.user?.id;
            if (!user_id) throw new Error("token must be set");

            const result = await this._useCase.execute({ id: user_id });
            res.json(result);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                res.status(400).send({ error: error.message, reason: error });
            }
        }
    }
}
