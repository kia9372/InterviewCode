import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { CreateUserRoleModel } from "../../../ViewModel/UserRoleModel/UserRoleModel";
import { UserRoleDoc } from "../../Contenxt/UserRole";


export interface IUserRoleRepository{
    SetUserRole(item: CreateUserRoleModel): Promise<OperationResult<UserRoleDoc>>;
    UpdateUserRole(item: CreateUserRoleModel): Promise<OperationResult<boolean>>
}