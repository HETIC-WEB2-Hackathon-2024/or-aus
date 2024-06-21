import { Response } from "express";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { GetParametreLocUseCase } from "../ports/GetParametreLocUseCase";

export class GetParametreLocController implements IController {
    public constructor(private readonly _useCase: GetParametreLocUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const results = await this._useCase.execute();
            res.send(results);
        } catch (e) {
            if (e instanceof Error) res.status(400).send({ error: e.message, reason: e });
        }
    }
}
