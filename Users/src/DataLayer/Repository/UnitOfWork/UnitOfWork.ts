import { ILoginRepository } from "../Login/ILoginRepository";
import LoginRepository from "../Login/LoginRepository";
import { IPermissionRepository } from "../Permission/IPermissionRepository";
import PermissionRepository from "../Permission/PermissionRepository";
import { IRoleRepository } from "../Role/IRoleRepository";
import RoleRepository from "../Role/RoleRepository";
import { IRolePermissionRepository } from "../RolePermission/IRolePermissionRepository";
import RolePermissionRepository from "../RolePermission/RolePermissionRepository";
import { IManagerRepository } from "../Manager/IManagerRepository";
import UserRepository from "../Manager/ManagerRepository";
import { IUserRoleRepository } from "../UserRole/IUserRoleRepository";
import UserRoleRepository from "../UserRole/UserRoleRepository";
import IUnitOfWork from "./IUnitOfWork";

export default new class UnitOfWork implements IUnitOfWork {

    ManagerRepository: IManagerRepository;
    LoginRepository: ILoginRepository;
    RoleRepository: IRoleRepository;
    PermissionRepository: IPermissionRepository;
    RolePermissionRepository: IRolePermissionRepository;
    UserRoleRepository: IUserRoleRepository;

    constructor() {
        this.ManagerRepository = new UserRepository();
        this.LoginRepository = new LoginRepository();
        this.RoleRepository = new RoleRepository();
        this.PermissionRepository = new PermissionRepository();
        this.RolePermissionRepository = new RolePermissionRepository();
        this.UserRoleRepository = new UserRoleRepository();
    }

}