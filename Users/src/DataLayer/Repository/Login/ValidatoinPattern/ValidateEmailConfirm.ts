import { UserDoc } from "../../../Contenxt/User";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";

export class ValidateEmailConfrim extends Handler {

    handle(request: UserDoc): ValidationContext {
      
        if (request.confirmPhoneNumber) {
            return super.handle(request);
        }
        return {
            Context: request,
            HaveError:true,
            Message: 'Your Email is Not Confirm . Please Click on this link for Send Again Email Activation'
        }

    }

}