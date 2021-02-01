import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { CreateUserRoleModel } from "../../../ViewModel/UserRoleModel/UserRoleModel";
import { UserRoleDoc, UserRoleModel } from "../../Contenxt/UserRole";
import { IUserRoleRepository } from "./IUserRoleRepository";


export default class UserRoleRepository implements IUserRoleRepository {


    /*******
    * Set User Role For User
    ******/

    async SetUserRole(item: CreateUserRoleModel): Promise<OperationResult<UserRoleDoc>> {
        console.log(item)
        try {

            let userRole = await UserRoleModel
                .build({ roles: [...item.roles], userId: item.userId })

            await userRole.save();
            return OperationResult.BuildSuccessResult('Operation Success', userRole);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /*******
    * Update User Role For User
    ******/

    async UpdateUserRole(item: CreateUserRoleModel): Promise<OperationResult<boolean>> {

        try {

            await UserRoleModel.updateOne(
                {
                    userId: item.userId,
                },
                { roleId: [...item.roles] });

            return OperationResult.BuildSuccessResult('Operation Success', true);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }


}