import { UserDoc } from "../../../Contenxt/User";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import redisManager from '../../../../Util/Redis/Redis';
import RedisKey from "../../../../Util/Redis/RedisKey";
import utility from "../../../../Util/Util";
import uniqueString from 'unique-string';

export class ValidateTowFactor extends Handler {

    handle(request: UserDoc): ValidationContext {

        if (!request.towFactorEnabled) {
            return super.handle(request);
        }

        redisManager.SetValueWithexiperationTime(RedisKey.TowfactorKey + request.phoneNumber, {
            code: utility.getRandomInt(1111111, 999999),
            hash: uniqueString()
        }, 10).then(data => {
            return {
                Context: request,
                HaveError: false,
                Message: 'we are send code to ypu phone number . plase enter that code in this'
            }
        }).catch(error => {
            return {
                Context: request,
                HaveError: true,
                Message: 'we have error to send yuor activation code . please try again in 10 minutes'
            }
        })
        return {
            Context: request,
            HaveError: false,
            Message: 'we are send code to ypu phone number . plase enter that code in this'
        }
    }

}