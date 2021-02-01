import { Request, Response, NextFunction } from 'express';
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { BaseController } from '@nodeidentity/common';

export default new class RoleController extends BaseController {

    // Create Role

    async AddRole(req: Request, res: Response, next: NextFunction) {

        const { name, permissionId } = req.body;

        let result = await UnitOfWork.
            RoleRepository.
            CreateRole({ name, permissions: permissionId });
        if (result.success) {
            this.OkObjectResult(res, result.result);
        } else {
            this.BadRerquest(res, result.message);
        }
    }

    // Delete Role

    async DeleteRole(req: Request, res: Response, next: NextFunction) {

        let result = await UnitOfWork.
            RoleRepository.
            DeleteRole(req.params.id);
        if (result.success) {
            this.OkObjectResult(res, result.result);
        } else {
            this.BadRerquest(res, result.message);
        }
    }

    // Update Role

    async UpdateRoleInfo(req: Request, res: Response, next: NextFunction) {

        const { name, permissionId } = req.body;

        let getRoleInfo = await UnitOfWork.RoleRepository.GetRoleInfo(req.params.id);

        if (!getRoleInfo.success) {
            return this.BadRerquest(res, getRoleInfo.message);
        }

        let result = await UnitOfWork.RoleRepository.UpdateRole({
            name: name,
            id: req.params.id,
            permissions: permissionId
        });

        if (result.success) {
            return this.OkObjectResult(res, result.result);
        } else {
            return this.BadRerquest(res, result.message);
        }
    }

    // Get Role Pagination

    async GetAllRolePaging(req: Request, res: Response, next: NextFunction) {

        let Roles = await UnitOfWork.RoleRepository.GetAllRolesPaging(req.body);

        return this.OkObjectResultPager(res, {
            count: Roles.result !== undefined ? Roles.result.length : 0,
            data: Roles.result
        });
    }

    // Get Manager Account Info

    async GetRoleInfo(req: Request, res: Response, next: NextFunction) {

        let getManagerInfo = await UnitOfWork.RoleRepository.GetRoleInfo(req.params.id);

        if (!getManagerInfo.success) {
            return this.BadRerquest(res, getManagerInfo.message);
        }

        if (getManagerInfo.success) {
            return this.OkObjectResult(res, getManagerInfo.result);
        } else {
            return this.BadRerquest(res, getManagerInfo.message);
        }
    }

    // Get All RolePermission

    async GetAllRolePermissionsByRoleId(req: Request, res: Response, next: NextFunction)
    { 
        let getManagerInfo = await UnitOfWork.RolePermissionRepository.GetAllPermissionByRoleId(req.params.id);

        if (getManagerInfo.success) {
            return this.OkObjectResult(res, getManagerInfo.result);
        } else {
            return this.BadRerquest(res, getManagerInfo.message);
        }
    }

}
