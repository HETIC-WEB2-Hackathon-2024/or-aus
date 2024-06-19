import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IController } from "../../../shared/IController";
import { GetCandidatInfoUseCase } from "../ports/GetCandidatInfoUseCase";

export class GetCandidatInfoController implements IController {
    public constructor(private readonly _useCase: GetCandidatInfoUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>
    ): Promise<void> {
        try {
            const token = req.auth?.token as string;
            const userInfo = await this._useCase.execute({ token_id: token });

            res.json(userInfo);
        } catch (error) {
            if (error instanceof Error) res.status(400).json({ error: error.message });
        }
    }
}
