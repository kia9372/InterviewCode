import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import User from "../../../Domain/Aggregate/User/user";
import { FilterViewModel } from "../../../ViewModel/CommonViewModel/FilterViewModel";
import { ChangePassword } from "../../../ViewModel/ManagerModel/ChangePasswordViewModel";
import { CreateUserModel } from "../../../ViewModel/ManagerModel/CreateUSerViewModel";
import { GetAllUserFilter } from "../../../ViewModel/ManagerModel/GetAllUserFilter";
import { UpdateUserAccountViewModel } from "../../../ViewModel/ManagerModel/UpdateUserAccountViewModel";
import { UpdateUserModel } from "../../../ViewModel/ManagerModel/UpdateUserViewModel";
import { UserDoc } from "../../Contenxt/User";

export interface IManagerRepository {

    CreateManager(user: CreateUserModel): Promise<OperationResult<UserDoc>>;
    GetManagerInfo(id: string): Promise<OperationResult<UserDoc | undefined>>;
    UpdateManagerInfo(item: UpdateUserModel): Promise<OperationResult<boolean | undefined>>;
    UpdateManagerAccount(item: UpdateUserAccountViewModel): Promise<OperationResult<boolean>>;
    ChangePassword(item: ChangePassword): Promise<OperationResult<boolean>>;
    GetManagerAccountInfo(id: string): Promise<OperationResult<UpdateUserAccountViewModel>>;
    GetManagerInformation(id: string): Promise<OperationResult<UpdateUserModel>>;
    GetAllManagerPaging(items:FilterViewModel<GetAllUserFilter>): Promise<OperationResult<User[]>>;
}