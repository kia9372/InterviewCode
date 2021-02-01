import mongoose from 'mongoose';
import uniqueString from 'unique-string';
import { BaseSchema } from './BaseSchema';

interface PermissionAttrs {
    name: string;
    parentId?: string;
    permissionId: string;
}

export interface PermissionDoc extends mongoose.Document {
    name: string;
    parentId: string;
    permissionId: string;
}

interface PermissionModel extends mongoose.Model<PermissionDoc> {
    build(PermissionAttrs: PermissionAttrs): PermissionDoc;
}

const PermissionSchema = new mongoose.Schema({
    name: { type: String, require: true },
    parentId: { type: String },
    permissionId: { type: String, require: true }
}, {
    toJSON: { virtuals: true },
})

PermissionSchema.plugin(BaseSchema);


PermissionSchema.statics.build = (attrs: PermissionAttrs) => {
    return new PermissionModel(attrs);
}


const PermissionModel = mongoose.model<PermissionDoc, PermissionModel>("Permission", PermissionSchema);

export { PermissionModel }