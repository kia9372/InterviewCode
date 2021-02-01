import { UserDoc } from "../../../Contenxt/User";
import { IHandler } from "./IHandler";
import { ValidationContext } from "./ValidationContext";

export abstract class Handler implements IHandler {

    private nextHandler!: IHandler;

    setNext(handler: IHandler): IHandler {
        this.nextHandler = handler;

        return this.nextHandler;
    }
    handle(request: UserDoc): ValidationContext {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return {
            Context: request,
            HaveError: false,
            Message: ''
        };
    }




}