import OperationResult from "@nodeidentity/common/build/core/operation/Operation";

export interface ILoginRepository {

    ManagerLogin(username: string, password: string): Promise<OperationResult<string>>;

}