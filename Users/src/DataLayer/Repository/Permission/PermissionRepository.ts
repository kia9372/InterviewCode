import { IPermissionRepository } from "./IPermissionRepository";
import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { CreateRoleModel } from "../../../ViewModel/RoleViewModel/CreateRoleviewModel";
import { UpdateRoleModel } from "../../../ViewModel/RoleViewModel/UpdateRoleModel";
import { PermissionDoc, PermissionModel } from './../../../DataLayer/Contenxt/Permission';
import { CreatePermissionModel } from "../../../ViewModel/PermissionViewModel/PermissionModel";
import { UpdatePermissionModel } from "../../../ViewModel/PermissionViewModel/UpdatePermissionModel";

export default class PermissionRepository implements IPermissionRepository {



    /*******
      * Create Permission
      ******/
    async CreatePermission(item: CreatePermissionModel): Promise<OperationResult<boolean>> {
        try {
            let permissionModel = await PermissionModel.build({
                name: item.name,
                parentId: item.parentId,
                permissionId: item.permissionId
            });

            await permissionModel.save();
            return OperationResult.BuildSuccessResult('Operation Success', true);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /*******
      * Update Permission
      *******/
    async UpdatePermission(item: UpdatePermissionModel): Promise<OperationResult<boolean>> {
     
        try {
            await PermissionModel.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        parentId: item.parentId,
                        permissionId: item.permissionId
                    },
                }
            )
            return OperationResult.BuildSuccessResult('', true);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /*******
     * Delete Permission
     *******/
    async DeletePermission(id: string): Promise<OperationResult<boolean>> {
        try {

            await PermissionModel.updateOne(
                { _id: id },
                {
                    $set: {
                        isDelete: true,
                    },
                }
            )

            return OperationResult.BuildSuccessResult('', true);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }
    /*******
     * GetAll Permission
     *******/
    async GetAllPermissionsPaging(): Promise<OperationResult<boolean>> {
        try {
            let permissions = await PermissionModel.find({})
                .where("isDelete")
                .equals(false)
                .select("name parentId permissionId");

            return OperationResult.BuildSuccessResult('Operation success', permissions);
        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }
    /****
   *
   * Get ById Permission
   *
   ****/
    async GetPermissionInfo(id: string): Promise<OperationResult<boolean>> {

        let getRoleInfo = await PermissionModel.findById(id);

        if (getRoleInfo) {
            return OperationResult.BuildSuccessResult('Operation Success', getRoleInfo);

        } else {
            return OperationResult.BuildFailur('Role NotFound');
        }
    }



}