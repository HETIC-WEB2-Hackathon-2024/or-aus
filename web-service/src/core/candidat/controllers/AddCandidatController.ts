import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "./GetCandidatInfoMiddleware";
import { AddCandidatUseCase } from "../ports/AddCandidatUseCase";

export class AddCandidatController implements IController {
    public constructor(private readonly _useCase: AddCandidatUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.user) throw new Error("No user payload");
            const result = await this._useCase.execute({ email: req.user.email } as any);

            res.status(201).json();
        } catch (e) {
            if (e instanceof Error) res.status(400).send({ error: e.message, reason: e });
        }
    }
}
