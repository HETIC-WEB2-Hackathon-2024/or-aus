import { Request, Response } from "express";
import { GetContractTypesUseCase } from "../ports/GetContractTypesUseCase";
import { IController } from "../../../shared/IController";

export class GetContractTypesController implements IController {
    public constructor(private readonly _useCase: GetContractTypesUseCase) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: Request, res: Response) {
        try {
            const result = await this._useCase.execute();
            const resultArray = result.map((el) => el.contrat);
            res.json(resultArray);
        } catch (error) {
            if (error instanceof Error) res.status(400).send({ error: error.message, reason: error });
        }
    }
}
