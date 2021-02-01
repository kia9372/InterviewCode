import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import uniqueString from 'unique-string';
import { BaseSchema } from './BaseSchema';
import { PermissionDoc } from './Permission';
import { RoleDoc } from './Role';

interface RolePermissionAttrs {
    roleId: string;
    permissionId: string[];
}

export interface RolePermissionDoc extends mongoose.Document {
    roleId: RoleDoc;
    permissionId: PermissionDoc[];
}

interface RolePermissionModel extends mongoose.Model<RolePermissionDoc> {
    build(roleAttrs: RolePermissionAttrs): RolePermissionDoc;
}

    const RoleSchema = new mongoose.Schema({
        roleId: { type: Schema.Types.ObjectId, ref: "Role" },
        permissionId: [{ type: Schema.Types.ObjectId, ref: "Permission" }]
    }, {
        toJSON: { virtuals: true },
    })

RoleSchema.plugin(BaseSchema);

RoleSchema.pre('save', function () {
    this.set({ securityStamp: uniqueString() });
});

RoleSchema.pre('updateOne', function () {
    this.set({ securityStamp: uniqueString() });
});

RoleSchema.statics.build = (attrs: RolePermissionAttrs) => {
    return new RolePermissionModel(attrs);
}

const RolePermissionModel = mongoose.model<RolePermissionDoc, RolePermissionModel>("RolePermission", RoleSchema);

export { RolePermissionModel }