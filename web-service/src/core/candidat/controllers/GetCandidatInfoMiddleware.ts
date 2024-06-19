import { Request, Response, NextFunction } from "express";
import { GetCandidatInfoUseCase } from "../ports/GetCandidatInfoUseCase";
import { Candidat, TCandidatEmail } from "../domain/Candidat";

export interface RequestWithUserInfo extends Request {
    user?: Candidat;
}

export class GetCandidatInfoMiddleware {
    public constructor(private readonly _useCase: GetCandidatInfoUseCase) {
        this.handle = this.handle.bind(this);
    }

    async handle(req: RequestWithUserInfo, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
        try {
            const token = req.auth?.token as string;
            const { payload, table } = await this._useCase.execute({ token_id: token });

            req.user = {
                ...table,
                ...payload,
            };

            next();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message, reason: error });
            }
        }
    }
}
