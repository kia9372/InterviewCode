import User from "../../../Domain/Aggregate/User/user";
import { CreateUserModel, Gender } from "../../../ViewModel/ManagerModel/CreateUSerViewModel";
import { UserModel, UserDoc } from '../../Contenxt/User';
import { IManagerRepository } from "./IManagerRepository";
import bcrypte from 'bcrypt';
import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { UpdateUserModel } from "../../../ViewModel/ManagerModel/UpdateUserViewModel";
import UtilService from '../../../Util/Util';
import redisManager from '../../../Util/Redis/Redis';
import { UpdateUserAccountViewModel } from "../../../ViewModel/ManagerModel/UpdateUserAccountViewModel";
import { ChangePassword } from "../../../ViewModel/ManagerModel/ChangePasswordViewModel";
import RedisKey from "../../../Util/Redis/RedisKey";
import { FilterViewModel } from "../../../ViewModel/CommonViewModel/FilterViewModel";
import { GetAllUserFilter } from "../../../ViewModel/ManagerModel/GetAllUserFilter";
import unitofWork from './../UnitOfWork/UnitOfWork';

export default class ManagerRepository implements IManagerRepository {

    /**********
     * Create Manager
     ********/
    async CreateManager(userModel: CreateUserModel): Promise<OperationResult<UserDoc>> {

        try {

            let password = await bcrypte.hash(userModel.password, 5);
            let user = new User(userModel.firstName, userModel.lastName, userModel.phoneNumber, password, userModel.gender);
            let addUserModel = await UserModel.build({
                confirmPhoneNumber: user.ConfirmPhoneNumber,
                accountFail: user.Accountfail,
                phoneNumber: user.PhoneNumber,
                firstName: user.firstName,
                gender: user.Gender,
                isActive: user.isActive,
                towFactorEnabled: false,
                isAdmin: true,
                avatar: undefined,
                lastName: user.lastName,
                locked: user.Locked,
                password: user.password,
                securityStamp: user.SecurityStamp,
                lockedDate: user.LockedDate
            });
            let addUserRole = await unitofWork.UserRoleRepository.SetUserRole({
                userId: addUserModel._id,
                roles: userModel.roles
            });
            addUserModel.userRole = addUserRole.result?._id!;

            addUserModel.save();
            await redisManager.Set(RedisKey.UserInfo + addUserModel._id, addUserModel);
            return OperationResult.BuildSuccessResult('operation result', addUserModel);
        } catch (error) {
            return OperationResult.BuildFailur(error.messsage);
        }
    }

    /**********
     * Get Manager Info
     ********/
    async GetManagerInfo(id: string): Promise<OperationResult<UserDoc | undefined>> {

        let redisValue = await redisManager.Get<UserDoc>(RedisKey.UserInfo + id);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getUserInfo = await UserModel.findById(id);

        if (getUserInfo) {
            let setRedisValue = await redisManager.Set(RedisKey.UserInforamtion + id, getUserInfo);
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getUserInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('User NotFound');
        }
    }

    /**********
     * Update Manager Info
     ********/
    async UpdateManagerInfo(item: UpdateUserModel): Promise<OperationResult<boolean>> {

        let avatarUrl = undefined;
        try {

            if (item.file) {
                avatarUrl = UtilService.getDirectoryImage(
                    `${item.file.destination}/${item.file.originalname}`
                );
            }
            await UserModel.updateOne(
                { _id: item.userId },
                {
                    $set: {
                        firstName: item.firstName,
                        gender: Gender[item.gender],
                        lastName: item.lastName,
                        avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
                    },
                }
            )
            await redisManager.ResetSingleItem(RedisKey.UserInforamtion + item.userId, {
                firstName: item.firstName,
                id: item.userId,
                gender: Gender[item.gender],
                lastName: item.lastName,
                avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
            })
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * Update Manager Account
    ********/
    async UpdateManagerAccount(item: UpdateUserAccountViewModel): Promise<OperationResult<boolean>> {

        try {
            await UserModel.updateOne(
                { _id: item.userId },
                {
                    $set: {
                        phoneNumber: item.phoneNumber,
                        isActive: item.isActive,
                    },
                }
            );
            await redisManager.ResetSingleItem(RedisKey.UserAccount + item.userId, {
                phoneNumber: item.phoneNumber,
                id: item.userId,
                isActive: item.isActive,
            })
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * ChangePassword
    ********/
    async ChangePassword(item: ChangePassword): Promise<OperationResult<boolean>> {

        try {
            let password = await bcrypte.hash(item.password, 5);

            await UserModel.updateOne(
                { _id: item.userId },
                {
                    $set: {
                        password: password
                    },
                }
            );
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * Get Manager Account Info
    ********/
    async GetManagerAccountInfo(id: string): Promise<OperationResult<UpdateUserAccountViewModel>> {

        let redisValue = await redisManager.Get<UpdateUserAccountViewModel>(RedisKey.UserAccount + id);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getUserInfo = await UserModel.findById(id).select('phoneNumber isActive id');

        if (getUserInfo) {
            let setRedisValue = await redisManager.Set(RedisKey.UserAccount + id,
                {
                    phoneNumber: getUserInfo.phoneNumber,
                    id: getUserInfo.id,
                    isActive: getUserInfo.isActive
                });
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getUserInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('User NotFound');
        }

    }

    /**********
    * Get Manager Info
    ********/
    async GetManagerInformation(id: string): Promise<OperationResult<UpdateUserModel>> {

        let redisValue = await redisManager.Get<UpdateUserModel>(RedisKey.UserInforamtion + id);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getUserInfo = await UserModel.findById(id).select('firstName avatar lastName gender id');

        if (getUserInfo) {
            let setRedisValue = await redisManager.Set(RedisKey.UserInforamtion + id,
                {
                    firstName: getUserInfo.firstName,
                    id: getUserInfo.id,
                    gender: Gender[getUserInfo.gender],
                    lastName: getUserInfo.lastName,
                    avatar: getUserInfo.avatar
                });
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getUserInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('User NotFound');
        }

    }

    /**********
     * Get All Manager
     ********/
    async GetAllManagerPaging(items: FilterViewModel<GetAllUserFilter>): Promise<OperationResult<User[]>> {


        const query: any = [];

        Object.keys(items.filters).forEach(key => {
            const value = items.filters[key as keyof GetAllUserFilter];
            if (key === 'phoneNumber' && value) {
                query.push({ phoneNumber: { $regex: `(.*)${value}(.*)` } });
            } else {
                query.push({ [key]: value }); // ex: { blocked: true }
            }
        });

        console.log(...query)
        let userList = await UserModel.find(...query).where({ isAdmin: true }).skip((items.page - 1) * items.pageSize)
            .limit(items.pageSize)

        return OperationResult.BuildSuccessResult('Operation Success', userList);

    }

}