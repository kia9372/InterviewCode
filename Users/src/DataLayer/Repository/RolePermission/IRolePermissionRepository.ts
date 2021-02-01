import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { RolePermissionInfoByRole } from "../../../ViewModel/RolePermissionModel/RolePermissionInfoByRole";
import { SetRolePermissionModel } from "../../../ViewModel/RolePermissionModel/RolePermissionModel";

export interface IRolePermissionRepository{
    SetRolePermission(item: SetRolePermissionModel): Promise<OperationResult<boolean>>;
    GetAllPermissionByRoleId(roleId: any): Promise<OperationResult<RolePermissionInfoByRole>>;
}