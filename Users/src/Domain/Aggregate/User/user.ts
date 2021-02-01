
export default class User {

    //#region BackingField 
    private _firstName: string;
    private _lastName: string;
    private _phoneNumber: string;
    private _password: string;
    private __isAdmin: boolean;
    private _isActive: boolean;
    private _confirmPhoneNumber: boolean;
    private _gender: number;
    private _locked: boolean;
    private _lockedDate?: Date;
    private _avatar?: string;
    private _accountFail: number;
    private _securityStamp: string;
    //#endregion
    //#region getter setter
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get Avatar(): string | undefined {
        return this._avatar;
    }
    public set Avatar(value: string | undefined) {
        this._avatar = value;
    }
    public get PhoneNumber(): string {
        return this._phoneNumber;
    }
    public set PhoneNumber(value: string) {
        this._phoneNumber = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get isAdmin(): boolean {
        return this.__isAdmin;
    }
    public set isAdmin(value: boolean) {
        this.__isAdmin = value;
    }
    public get isActive(): boolean {
        return this._isActive;
    }
    public set isActive(value: boolean) {
        this._isActive = value;
    }
    public get Gender(): number {
        return this._gender;
    }
    public set Gender(value: number) {
        this._gender = value;
    }
    public get Locked(): boolean {
        return this._locked;
    }
    public set Locked(value: boolean) {
        this._locked = value;
    }
    public get LockedDate(): Date | undefined {
        return this._lockedDate;
    }
    public set LockedDate(value: Date | undefined) {
        this._lockedDate = value;
    }
    public get Accountfail(): number {
        return this._accountFail;
    }
    public set Accountfail(value: number) {
        this._accountFail = value;
    }
    public get SecurityStamp(): string {
        return this._securityStamp;
    }
    public set Securotystamp(value: string) {
        this._securityStamp = value;
    }
    public get ConfirmPhoneNumber(): boolean {
        return this._confirmPhoneNumber;
    }
    public set ConfirmPhoneNumber(value: boolean) {
        this._confirmPhoneNumber = value;
    }
    //#endregion

    constructor(
        firstName: string,
        lastName: string, PhoneNumber: string,
        password: string, gender: number,
        isAdmin: boolean = false,
        isActive: boolean = false) {

        this._firstName = firstName;
        this._lastName = lastName;
        this._phoneNumber = PhoneNumber;
        this._password = password;
        this.__isAdmin = isAdmin;
        this._isActive = isActive;
        this.Avatar = undefined;
        this._gender = gender;
        this._locked = false;
        this._confirmPhoneNumber = false;
        this._lockedDate = undefined;
        this._accountFail = 0;
        this._securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    }

    UpdateSecuirtyStamp() {
        this._securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    }

    LockedEnabled() {
        this._locked = true;
        this._lockedDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        this.UpdateSecuirtyStamp();
    }

    ConfirmedPhoneNumber() {
        this._confirmPhoneNumber = true;
        this.UpdateSecuirtyStamp();
    }

    ChangeLockEndStatus(status: boolean) {
        this._locked = !status;
    }

    ChangePhoneNumber(PhoneNumber: string) {
        this._phoneNumber = PhoneNumber;
        this.UpdateSecuirtyStamp();
        this._confirmPhoneNumber = false;
    }

    ChangeUserActiveStatus(status: boolean) {
        this._isActive = !status;
    }

    ChageUserInfo(firstName: string, lastName: string, gender: number, avatar?: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._gender = gender;
        this._avatar = avatar;
        this.UpdateSecuirtyStamp();
    }

    ChangePassword(password: string) {
        this._password = password;
        this.UpdateSecuirtyStamp();
    }

}