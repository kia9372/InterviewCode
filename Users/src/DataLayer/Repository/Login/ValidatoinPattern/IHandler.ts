import { UserDoc } from "../../../Contenxt/User";
import { ValidationContext } from "./ValidationContext";

export interface IHandler {
    setNext(handler: IHandler): IHandler;

    handle(request: UserDoc): ValidationContext;
}