import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../shared/IController";
import { GetCandidatCandidaturesCountUseCase } from "../ports/GetCandidatCandidaturesCountUseCase";
import { InvalidRequestError } from "express-oauth2-jwt-bearer";
import { RequestWithUserInfo } from "./GetCandidatInfoMiddleware";

export class GetCandidatCandidaturesCountController implements IController {
    public constructor(private readonly _useCase: GetCandidatCandidaturesCountUseCase) {
        this.handle = this.handle.bind(this);
    }
    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const user_id = req.user?.id;
            if (!user_id) throw new Error("token must be set");

            const result = await this._useCase.execute({ id: user_id });
            res.json(result);
        } catch (error) {
            if (error instanceof Error) res.status(400).send({ error: error.message, reason: error });
        }
    }
}
