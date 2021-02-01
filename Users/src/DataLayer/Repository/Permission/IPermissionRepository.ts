import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { CreatePermissionModel } from "../../../ViewModel/PermissionViewModel/PermissionModel";
import { UpdatePermissionModel } from "../../../ViewModel/PermissionViewModel/UpdatePermissionModel";


export interface IPermissionRepository{
    GetPermissionInfo(id: string): Promise<OperationResult<boolean>>;
    CreatePermission(item: CreatePermissionModel): Promise<OperationResult<boolean>>;
    DeletePermission(id: string): Promise<OperationResult<boolean>>;
    GetAllPermissionsPaging(): Promise<OperationResult<boolean>>;
    UpdatePermission(item: UpdatePermissionModel): Promise<OperationResult<boolean>>;
}