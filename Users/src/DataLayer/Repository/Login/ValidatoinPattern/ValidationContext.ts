import { UserDoc } from "../../../Contenxt/User";

export interface ValidationContext {
    Message: string;
    HaveError:boolean;
    Context: UserDoc;
}