import { BaseController } from "@nodeidentity/common";
import { Request, Response, NextFunction } from 'express';
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class ManagerController extends BaseController {


    async AdminLogin(req: Request, res: Response, next: NextFunction) {

        const { username, password } = req.body;

        let result = await UnitOfWork.LoginRepository.ManagerLogin(username, password);
        if (result.success) {
            return this.OkObjectResult(res, result.message);
        }
        return this.BadRerquest(res, result.message);

    }


}
