import mongoose from 'mongoose';
import uniqueString from 'unique-string';
import { BaseSchema } from './BaseSchema';

interface RoleAttrs {
    name: string;
}

export interface RoleDoc extends mongoose.Document {
    name: string;
    securityStamp: string;
}

interface RoleModel extends mongoose.Model<RoleDoc> {
    build(roleAttrs: RoleAttrs): RoleDoc;
}

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    securityStamp: {
        type: String
    }
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


RoleSchema.statics.build = (attrs: RoleAttrs) => {
    return new RoleModel(attrs);
}


const RoleModel = mongoose.model<RoleDoc, RoleModel>("Role", RoleSchema);

export { RoleModel }