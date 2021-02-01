export interface RolePermissionInfoByRole {
    roleName: string;
    roleId: string;
    claims: ClaimsManager[];
}

export interface ClaimsManager {
    id: string;
    isChilde: boolean;
    parentId: string;
    selected: boolean;
    name: string;
}