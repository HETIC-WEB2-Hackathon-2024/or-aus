import { Request, Response } from "express";
import { GetSecteursUseCase } from "../ports/GetSecteursUseCase";

export class GetSecteursController {
    public constructor(private readonly _useCase: GetSecteursUseCase) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: Request, res: Response) {
        try {
            const result = await this._useCase.execute();
            const resultArray = result.map((el) => el.secteur )
            res.json(resultArray);
        } catch (error) {
            if (error instanceof Error) res.status(400).send({ error: error.message, reason: error });
        }
    }
}
