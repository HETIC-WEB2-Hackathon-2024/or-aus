import { Request, Response } from "express";
import { RequestWithUserInfo } from "../core/candidat/controllers/GetCandidatInfoMiddleware";

export interface IController {
    handle(req: RequestWithUserInfo, res: Response): Promise<void>;
}
