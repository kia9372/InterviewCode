import { UserDoc } from "../../../Contenxt/User";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";


export class ValidateBlocked extends Handler {
    
    handle(request: UserDoc): ValidationContext {
   
        if (!request.locked) {
            return super.handle(request);
        } else {
            if (request.lockedDate! < new Date(new Date().toUTCString())) {
                request.accountFail = 0;
                request.locked = false;
                request.lockedDate = undefined;
                request.save();
                return super.handle(request);
            }
        }
        return {
            Context: request,
            HaveError:true,
            Message: `Your Account Blocked to Date : ${request.lockedDate}`
        }

    }
}