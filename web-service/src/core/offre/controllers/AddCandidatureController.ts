import { Response } from "express";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { AddCandidatureUseCase } from "../ports/AddCandidatureUseCase";

export class AddCandidatureController implements IController {
    public constructor(private readonly _useCase: AddCandidatureUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const offre_id = parseInt(req.query.offre_id as string);
            const user_id = req.user?.id;

            if (!offre_id || !user_id) throw new Error("offre_id and token must be set");

            await this._useCase.execute({ offre_id, user_id });
            res.status(201).send({ message: "Candidature appliquée avec succès" });
        } catch (e) {
            if (e instanceof Error) res.status(400).send({ error: e.message, reason: e });
        }
    }
}
