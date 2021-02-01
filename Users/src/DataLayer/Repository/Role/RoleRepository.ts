import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { CreateRoleModel } from "../../../ViewModel/RoleViewModel/CreateRoleviewModel";
import { UpdateRoleModel } from "../../../ViewModel/RoleViewModel/UpdateRoleModel";
import { RoleDoc, RoleModel } from './../../../DataLayer/Contenxt/Role';
import { IRoleRepository } from "./IRoleRepository";
import redisManager from '../../../Util/Redis/Redis';
import RedisKey from "../../../Util/Redis/RedisKey";
import { FilterViewModel } from "../../../ViewModel/CommonViewModel/FilterViewModel";
import { GetAllRoleFilter } from '../../../ViewModel/RoleViewModel/GetAllRolesFilters';
import unitOfWork from './../../Repository/UnitOfWork/UnitOfWork';

export default class RoleRepository implements IRoleRepository {

    /**********
    * create Role
    ********/

    async CreateRole(item: CreateRoleModel): Promise<OperationResult<boolean>> {

        try {

            let roleModel = await RoleModel.build({
                name: item.name
            });

            await roleModel.save()
                .then(async (data) => {
                    await unitOfWork.RolePermissionRepository.SetRolePermission({
                        roleId: data.id,
                        permissionId: item.permissions
                    })
                })
            return OperationResult.BuildSuccessResult('Operation Success', true);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /**********
     * Update Role Info
     ********/

    async UpdateRole(item: UpdateRoleModel): Promise<OperationResult<boolean>> {

        try {

            let roleModel = await RoleModel.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                    },
                }
            )
                await unitOfWork.RolePermissionRepository.SetRolePermission({
                    roleId: item.id,
                    permissionId: item.permissions
                })


            await redisManager.ResetSingleItem(RedisKey.RoleInfo + item.id, {
                name: item.name,
                securityStamp: roleModel.securityStamp
            })
            return OperationResult.BuildSuccessResult('', true);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /**********
     * Get Role Info
     ********/
    async GetRoleInfo(id: string): Promise<OperationResult<RoleDoc | undefined>> {

        let redisValue = await redisManager.Get<RoleDoc>(RedisKey.RoleInfo + id);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getRoleInfo = await RoleModel.findById(id);

        if (getRoleInfo) {
            let setRedisValue = await redisManager.Set(RedisKey.RoleInfo + id, getRoleInfo);
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getRoleInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('Role NotFound');
        }
    }

    /**********
    * Delete Role 
    ********/
    async DeleteRole(id: string): Promise<OperationResult<boolean>> {

        try {

            await RoleModel.updateOne(
                { _id: id },
                {
                    $set: {
                        isDelete: true,
                    },
                }
            )

            await redisManager.Remove(RedisKey.RoleInfo + id)
            return OperationResult.BuildSuccessResult('', true);

        } catch (error) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /**********
    * Get All Roles
    ********/
    async GetAllRolesPaging(items: FilterViewModel<GetAllRoleFilter>): Promise<OperationResult<RoleDoc[]>> {

        const query: any = [];

        Object.keys(items.filters).forEach(key => {
            const value = items.filters[key as keyof GetAllRoleFilter];
            if (key === 'name' && value) {
                query.push({ name: { $regex: `(.*)${value}(.*)` } });
            } else {
                query.push({ [key]: value });
            }
        });

        let rolesList = await RoleModel.find(...query).select("name id").skip((items.page - 1) * items.pageSize)
            .limit(items.pageSize)

        return OperationResult.BuildSuccessResult('Operation Success', rolesList);

    }

}