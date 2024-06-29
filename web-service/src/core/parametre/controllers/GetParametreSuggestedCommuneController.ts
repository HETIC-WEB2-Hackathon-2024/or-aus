import { Response } from "express";
import { IController } from "../../../shared/IController";
import { RequestWithUserInfo } from "../../candidat/controllers/GetCandidatInfoMiddleware";
import { GetParametreSuggestedCommuneUseCase } from "../ports/GetParametreSuggestedCommuneUseCase";

export class GetParametreSuggestedCommuneController implements IController {
    public constructor(private readonly _useCase: GetParametreSuggestedCommuneUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.body.nom_departement || !req.body.nom_commune) throw Error('Need more information');
            const results = await this._useCase.execute({ nd: req.body.nom_departement, nc: req.body.nom_commune });
            console.log(results)
            res.send(results);
        } catch (e) {
            if (e instanceof Error) res.status(400).send({ error: e.message, reason: e });
        }
    }
}
