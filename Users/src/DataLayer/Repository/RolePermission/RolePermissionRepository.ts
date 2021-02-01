import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { RolePermissionInfoByRole } from "../../../ViewModel/RolePermissionModel/RolePermissionInfoByRole";
import { SetRolePermissionModel } from "../../../ViewModel/RolePermissionModel/RolePermissionModel";
import { RoleDoc } from "../../Contenxt/Role";
import { RolePermissionDoc, RolePermissionModel } from "../../Contenxt/RolePermission";
import { PermissionDoc, PermissionModel } from "../../Contenxt/Permission";
import { IRolePermissionRepository } from "./IRolePermissionRepository";


export default class RolePermissionRepository implements IRolePermissionRepository {

    /******
     *  Set Role Permission
     *****/

    async SetRolePermission(item: SetRolePermissionModel): Promise<OperationResult<boolean>> {
        try {

            let resilt = await this.GetRolePermissionByRoleId(item.roleId);
            if (resilt.result?.permissionId.length! > 0) {

                await RolePermissionModel.updateOne(
                    {
                        roleId: item.roleId
                    },
                    { $set: { permissionId: [...item.permissionId] } }
                );

            } else {

                let rolePermission = await RolePermissionModel
                    .build({ roleId: item.roleId, permissionId: [...item.permissionId] })

                await rolePermission.save();
            }

            return OperationResult.BuildSuccessResult('Operation Success', true)

        } catch (error) {
            return OperationResult.BuildFailur(error.message)
        }


    }

    /******
       *  Get RolePermission By RoleId
       *****/
    async GetRolePermissionByRoleId(roleId: any): Promise<OperationResult<RolePermissionDoc>> {

        try {

            let rolePermission = await RolePermissionModel.findOne({ roleId: roleId });

            return OperationResult.BuildSuccessResult('Operation Result', rolePermission);
        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /******
     *  Get RolePermission By RoleId
     *****/
    async GetAllPermissionByRoleId(roleId: any): Promise<OperationResult<RolePermissionInfoByRole>> {

        let model = {} as RolePermissionInfoByRole;
        model.claims=[];
        try {

            let permissions = await PermissionModel.find({})
                .where("isDelete")
                .equals(false);

            let rolePermissionInfo = await RolePermissionModel.findOne({ roleId: roleId, isDelete: false })
                .populate(
                    {
                        path: 'roleId',
                        model: 'Role',
                        select: 'name'
                    })
                .populate({
                    path: 'permissionId',
                    model: 'Permission',
                    select: 'name id parentId'
                })

            model.roleId = rolePermissionInfo.roleId.id;
            model.roleName = rolePermissionInfo.roleId.name;

            permissions.forEach((permission: any) => {
                rolePermissionInfo.permissionId.forEach((elment: any) => {
                    console.log('permission',permission,'el',elment)
                    model.claims.push({
                        id: permission._id,
                        isChilde: false,
                        parentId: permission.parentId,
                        selected:
                        rolePermissionInfo.permissionId.indexOf(permission._id) !== -1 ? true : false,
                        name: permission.name,
                    })
                });
            });

            return OperationResult.BuildSuccessResult('Operation Result', model);
        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }




}