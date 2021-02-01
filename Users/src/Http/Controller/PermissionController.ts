import { Request, Response, NextFunction } from 'express';
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { BaseController } from '@nodeidentity/common';

export default new class PermissionController extends BaseController {

    // Create Permission

    async AddPermission(req: Request, res: Response, next: NextFunction) {

        const { name, permissionId, parentId } = req.body;

        let result = await UnitOfWork.
            PermissionRepository.
            CreatePermission({ name: name, permissionId: permissionId, parentId: parentId });
        if (result.success) {
            this.OkObjectResult(res, result.result);
        } else {
            this.BadRerquest(res, result.message);
        }
    }

    // Delete Permission

    async DeletePermission(req: Request, res: Response, next: NextFunction) {

        let result = await UnitOfWork.
            PermissionRepository.
            DeletePermission(req.params.id);
        if (result.success) {
            this.OkObjectResult(res, result.result);
        } else {
            this.BadRerquest(res, result.message);
        }
    }

    // Update Permission

    async UpdatePermissionInfo(req: Request, res: Response, next: NextFunction) {

        const { name, permissionId, parentId } = req.body;
        console.log(permissionId)

        let getPermissionInfo = await UnitOfWork.PermissionRepository.GetPermissionInfo(req.params.id);

        if (!getPermissionInfo.success) {
            return this.BadRerquest(res, getPermissionInfo.message);
        }

        let result = await UnitOfWork.PermissionRepository.UpdatePermission({
            name: name,
            id: req.params.id,
            permissionId: permissionId,
            parentId: parentId
        });
        if (result.success) {
            return this.OkObjectResult(res, result.result);
        } else {
            return this.BadRerquest(res, result.message);
        }
    }

    // Get Permission Pagination

    async GetAllPermissionPaging(req: Request, res: Response, next: NextFunction) {

        let permissions = await UnitOfWork.PermissionRepository.GetAllPermissionsPaging();

        return this.OkObjectResult(res, permissions.result);
    }

    // Get Manager Account Info

    async GetPermissionInfo(req: Request, res: Response, next: NextFunction) {

        let getManagerInfo = await UnitOfWork.PermissionRepository.GetPermissionInfo(req.params.id);

        if (!getManagerInfo.success) {
            return this.BadRerquest(res, getManagerInfo.message);
        }

        if (getManagerInfo.success) {
            return this.OkObjectResult(res, getManagerInfo.result);
        } else {
            return this.BadRerquest(res, getManagerInfo.message);
        }
    }

}
