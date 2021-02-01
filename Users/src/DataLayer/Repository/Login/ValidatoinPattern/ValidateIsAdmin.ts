import { UserDoc } from "../../../Contenxt/User";
import { Handler } from "./Handler";
import { IHandler } from "./IHandler";
import { ValidationContext } from "./ValidationContext";


export class ValidateIsAdmin extends Handler {

    handle(request: UserDoc): ValidationContext {

        if (request.isAdmin) {
            return super.handle(request);
        }

        return {
            Context: request,
            HaveError:true,
            Message: 'User Not Admin'
        }
    }


}