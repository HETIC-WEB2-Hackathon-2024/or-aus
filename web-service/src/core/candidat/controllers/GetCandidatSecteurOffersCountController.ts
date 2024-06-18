import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../shared/IController";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { GetCandidatSecteurOffersCountUseCase } from "../ports/GetCandidatSecteurOffersCountUseCase";

export class GetCandidatSecteurOffersCountController implements IController {
    public constructor(private readonly _useCase: GetCandidatSecteurOffersCountUseCase) {
        this.handle = this.handle.bind(this);
    }
    async handle(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): Promise<void> {
        try {
            const user_id = parseInt(req.query.user_id as string);
            if (!user_id) throw new InvalidRequestError("user_id must be set");

            const result = await this._useCase.execute({ id: user_id });
            res.json(result);
        } catch (error) {
            if (error instanceof InvalidRequestError)
                res.status(parseInt(error.code)).send({ error: error.message, reason: error });
            else if (error instanceof Error) {
                console.error(error);
                res.status(500).send({ error: error.message, reason: error });
            }
        }
    }
}
