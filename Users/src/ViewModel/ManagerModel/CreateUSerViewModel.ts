export interface CreateUserModel {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    gender: number;
    roles: string[];
}

export enum Gender {
    Male = 1,
    Female = 2,
    Trans = 3
}