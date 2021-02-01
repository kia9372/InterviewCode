import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import uniqueString from 'unique-string';
import { BaseSchema } from './BaseSchema';

enum Gender {
    Male = 1,
    Female = 2,
    Trans = 3
}

interface UserAttrs {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    towFactorEnabled: boolean;
    isAdmin: boolean;
    isActive: boolean;
    confirmPhoneNumber: boolean;
    gender: number;
    avatar?: string;
    locked: boolean;
    userRole?:string;
    lockedDate?: Date;
    accountFail: number;
    securityStamp: string;
}

export interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    isAdmin: boolean;
    isActive: boolean;
    confirmPhoneNumber: boolean;
    avatar?: string;
    towFactorEnabled: boolean;
    gender: string;
    locked: boolean;
    lockedDate?: Date;
    accountFail: number;
    userRole?:string;
    securityStamp: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(userAttrs: UserAttrs): UserDoc;
}

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    towFactorEnabled: {
        type: Boolean,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    confirmPhoneNumber: {
        type: Boolean,
        required: true
    },
    gender: {
        required: true,
        type: Object.values(Gender)
    },
    securityStamp: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    accountFail: {
        type: Number,
        required: true
    },
    lockedDate: {
        type: Date
    },
    locked: {
        type: Boolean,
        required: true
    },
    userRole: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserRole',
            },
        ],
        required: false
    },
}, {
    toJSON: { virtuals: true },
})

UserSchema.plugin(BaseSchema);

UserSchema.pre('updateOne', function () {
    this.set({ securityStamp: uniqueString() });
});


UserSchema.statics.build = (attrs: UserAttrs) => {
    return new UserModel(attrs);
}


const UserModel = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { UserModel }