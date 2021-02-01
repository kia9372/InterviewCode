import { ValidateEmailConfrim } from './ValidatoinPattern/ValidateEmailConfirm';
import OperationResult from "@nodeidentity/common/build/core/operation/Operation";
import { ILoginRepository } from "./ILoginRepository";
import { UserDoc, UserModel } from './../../../DataLayer/Contenxt/User';
import { ValidateIsAdmin } from "./ValidatoinPattern/ValidateIsAdmin";
import { ValidateBlocked } from "./ValidatoinPattern/ValidateBlocked";
import { IHandler } from './ValidatoinPattern/IHandler';
import { ValidationContext } from './ValidatoinPattern/ValidationContext';
import bcrypte from 'bcrypt';
import { ValidatePassword } from './ValidatoinPattern/ValidatePassword';
import { ValidateTowFactor } from './ValidatoinPattern/ValidateTowFactor';

export default class LoginRepository implements ILoginRepository {

    // Login Special for login

    async ManagerLogin(username: string, password: string): Promise<OperationResult<string>> {

        let user = await UserModel.findOne({ phoneNumber: username });
        if (user) {

            const isAdmin = new ValidateIsAdmin();
            const isBlocked = new ValidateBlocked();
            const isEmailComfirmed = new ValidateEmailConfrim();
            const isValidatePassword = new ValidatePassword(password);
            const isenavledtowfactor = new ValidateTowFactor();

            isValidatePassword.setNext(isAdmin).setNext(isBlocked)
                .setNext(isEmailComfirmed).setNext(isenavledtowfactor);
                
            let result = await this.ValidationManagerForLogin(isValidatePassword, user);

            if (result.HaveError) {
                return OperationResult.BuildFailur(result.Message)
            }
            return OperationResult.BuildSuccessResult(result.Message, 'Token')

        }
        return OperationResult.BuildFailur("Username or password is not currenct")

    }

    // Validatoin Manager Login

    async ValidationManagerForLogin(handler: IHandler, user: UserDoc): Promise<ValidationContext> {

        let result = handler.handle(user);
        return result;
    }

}