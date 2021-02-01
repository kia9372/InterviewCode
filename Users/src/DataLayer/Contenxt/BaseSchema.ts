
import { Schema, model, Document } from 'mongoose';

export default interface BaseSchemaModel extends Document {
    isDelete: boolean;
    owner: string;
    updateDate: string;
    updateBy: string;
    deleteDate: string;
    deleteby: string;
    createDate: string;
    createBy: string;
}
export function BaseSchema(schema: any) {
    schema.add({
        isDelete: { type: Boolean, default: false },
        owner: { type: String },
        updateDate: { type: String },
        updateBy: { type: String },
        deleteDate: { type: String },
        deleteby: { type: String },
        createDate: { type: String },
        createBy: { type: String },
    });

    schema.pre("save", async function (req: any, res: any, next: any) {

        if (schema.isNew) {
            schema.set({ createDate: new Date() })
            schema.set({ createBy: 'kianoush' });
        }
        next();
    });

    schema.pre("updateOne", async function (req: any, res: any, next: any) {
        
        // console.log(schema)

        // // if (schema.getUpdate().$set.isDelete) {
        // //     schema.set({
        // //         deleteDate: new Date(),
        // //         deleteby: `${req.user.firstName} ${req.user.lastName}`,
        // //     });
        // // } else {
        // //     schema.set({
        // //         updateDate: new Date(),
        // //         updateBy: `${req.user.firstName} ${req.user.lastName}`,
        // //     });
        // // }
        // next();
    });
};