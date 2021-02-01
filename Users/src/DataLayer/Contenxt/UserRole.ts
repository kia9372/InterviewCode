import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import uniqueString from 'unique-string';
import { BaseSchema } from './BaseSchema';
import { RoleDoc } from './Role';
import { UserDoc } from './User';

interface UserRoleAttrs {
    roles: string[];
    userId: string;
}

export interface UserRoleDoc extends mongoose.Document {
    roles: RoleDoc[];
    userId: UserDoc;
}

interface UserRoleModel extends mongoose.Model<UserRoleDoc> {
    build(UserRoleAttrs: UserRoleAttrs): UserRoleDoc;
}

const UserRoleSchema = new mongoose.Schema({
    roles: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    toJSON: { virtuals: true },
})

UserRoleSchema.plugin(BaseSchema);

UserRoleSchema.statics.build = (attrs: UserRoleAttrs) => {
    return new UserRoleModel(attrs);
}


const UserRoleModel = mongoose.model<UserRoleDoc, UserRoleModel>("UserRole", UserRoleSchema);

export { UserRoleModel }