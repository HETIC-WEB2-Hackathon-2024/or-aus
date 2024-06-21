import { Response } from "express";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { PutCandidatParametreTelUseCase } from "../ports/PutCandidatParametreTelUseCase";

export class PutCandidatParametreTelController implements IController {
    public constructor(private readonly _useCase: PutCandidatParametreTelUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const candidat_id = req.user?.id;
            if (!candidat_id) throw new Error("Token problem, unable to obtain user ID");
            if (!req.body.tel) throw new Error("You must fill in the necessary information.");
            await this._useCase.execute({ id: candidat_id, tel: req.body.tel });

            res.status(201).json();
        } catch (e) {
            if (e instanceof Error) res.status(400).send({ error: e.message, reason: e });
        }
    }
}
