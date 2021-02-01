import { ILoginRepository } from "../Login/ILoginRepository";
import { IPermissionRepository } from "../Permission/IPermissionRepository";
import { IRoleRepository } from "../Role/IRoleRepository";
import { IRolePermissionRepository } from "../RolePermission/IRolePermissionRepository";
import { IManagerRepository } from "../Manager/IManagerRepository";
import UserRepository from "../Manager/ManagerRepository";

export default interface IUnitOfWork{
     ManagerRepository:IManagerRepository;
     LoginRepository:ILoginRepository;
     RoleRepository:IRoleRepository;
     PermissionRepository:IPermissionRepository;
     RolePermissionRepository:IRolePermissionRepository;
}