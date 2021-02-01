import { Request, Response, NextFunction } from 'express';
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { BaseController } from '@nodeidentity/common';

export default new class ManagerController extends BaseController {

    // Create Manager

    async AddManager(req: Request, res: Response, next: NextFunction) {

        const { firstName, lastName, phoneNumber, password, gender, roles } = req.body;

        let result = await UnitOfWork.
            ManagerRepository.
            CreateManager({ firstName, lastName, phoneNumber, password, gender, roles });
        if (result.success) {
            this.OkObjectResult(res, result.result);
        } else {
            this.BadRerquest(res, result.message);
        }
    }

    // Update Manager

    async UpdateManagerInfo(req: Request, res: Response, next: NextFunction) {

        const { firstName, lastName, gender } = req.body;

        let getManagerInfo = await UnitOfWork.ManagerRepository.GetManagerInfo(req.params.id);

        if (!getManagerInfo.success) {
            return this.BadRerquest(res, getManagerInfo.message);
        }

        let result = await UnitOfWork.ManagerRepository.UpdateManagerInfo({
            userId: req.params.id,
            exAvatarUrl: getManagerInfo.result?.avatar,
            file: req.file,
            firstName: firstName,
            lastName: lastName,
            gender: gender
        });
        if (result.success) {
            return this.OkObjectResult(res, result.result);
        } else {
            return this.BadRerquest(res, result.message);
        }
    }

    // Update Manager Account

    async UpdateManagerAccount(req: Request, res: Response, next: NextFunction) {

        const { phoneNumber, confirmPhoneNumber, isActive } = req.body;

        let getManagerInfo = await UnitOfWork.ManagerRepository.GetManagerInfo(req.params.id);

        if (!getManagerInfo.success) {
            return this.BadRerquest(res, getManagerInfo.message);
        }

        let result = await UnitOfWork.ManagerRepository.UpdateManagerAccount({
            confirmPhoneNumber: confirmPhoneNumber,
            isActive: isActive,
            phoneNumber: phoneNumber,
            userId: getManagerInfo.result?.id
        });

        if (result.success) {
            return this.OkObjectResult(res, result.result);
        } else {
            return this.BadRerquest(res, result.message);
        }
    }

    // Update Manager Account

    async ChangePassword(req: Request, res: Response, next: NextFunction) {

        const { password, confirmPassword } = req.body;

        let getManagerInfo = await UnitOfWork.ManagerRepository.GetManagerInfo(req.params.id);

        if (!getManagerInfo.success) {
            return this.BadRerquest(res, getManagerInfo.message);
        }

        let result = await UnitOfWork.ManagerRepository.ChangePassword({
            password: password,
            userId: getManagerInfo.result?._id
        });
        if (result.success) {
            return this.OkObjectResult(res, result.result);
        } else {
            return this.BadRerquest(res, result.message);
        }
    }

    // Get Manager Account Info

    async GetManagerAccountInfo(req: Request, res: Response, next: NextFunction) {

        let getManagerInfo = await UnitOfWork.ManagerRepository.GetManagerAccountInfo(req.params.id);

        if (!getManagerInfo.success) {
            return this.BadRerquest(res, getManagerInfo.message);
        }

        if (getManagerInfo.success) {
            return this.OkObjectResult(res, getManagerInfo.result);
        } else {
            return this.BadRerquest(res, getManagerInfo.message);
        }
    }

    // Get Manager Information

    async GetManagerInformation(req: Request, res: Response, next: NextFunction) {

        let getManagerInfo = await UnitOfWork.ManagerRepository.GetManagerInformation(req.params.id);

        if (!getManagerInfo.success) {
            return this.BadRerquest(res, getManagerInfo.message);
        }

        if (getManagerInfo.success) {
            return this.OkObjectResult(res, getManagerInfo.result);
        } else {
            return this.BadRerquest(res, getManagerInfo.message);
        }
    }

    // Get Manager Pagination

    async GetAllManagerPaging(req: Request, res: Response, next: NextFunction) {

        let Managers = await UnitOfWork.ManagerRepository.GetAllManagerPaging(req.body);

        return this.OkObjectResultPager(res, {
            count: Managers.result !== undefined ? Managers.result.length : 0,
            data: Managers.result
        });
    }
}
