import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { FilterViewModel } from "../../../ViewModel/CommonViewModel/FilterViewModel";
import { CreateRoleModel } from "../../../ViewModel/RoleViewModel/CreateRoleviewModel";
import { GetAllRoleFilter } from "../../../ViewModel/RoleViewModel/GetAllRolesFilters";
import { UpdateRoleModel } from "../../../ViewModel/RoleViewModel/UpdateRoleModel";
import { RoleDoc } from "../../Contenxt/Role";

export interface IRoleRepository {
    CreateRole(item: CreateRoleModel): Promise<OperationResult<boolean>>;
    UpdateRole(item: UpdateRoleModel): Promise<OperationResult<boolean>>;
    GetRoleInfo(id: string): Promise<OperationResult<RoleDoc | undefined>>;
    DeleteRole(id: string): Promise<OperationResult<boolean>>;
    GetAllRolesPaging(items: FilterViewModel<GetAllRoleFilter>): Promise<OperationResult<RoleDoc[]>>;
}