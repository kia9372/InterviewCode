import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { managerRouter } from './Router/ManagerRouter';
import { loginRouter } from './Router/LoginRouter';
import { roleRouter } from './Router/RoleRouter';
import { permissionRouter } from './Router/PermissionRouter';
import redisManager  from './Util/Redis/Redis';

const app = express();

export class Startup {

    constructor() {
        app.use(json());
        app.set('trust proxy', 1) // trust first proxy
        app.use(
            cookieSession({
                signed: false,
                secure: true
            })
        );

        // if (!process.env.MONGO_URI) {
        //     throw new Error("MONGO_URI not Defined")
        // }

        mongoose.connect("mongodb://localhost:27017/users", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        redisManager.Connet();

        app.use(managerRouter)
        app.use(loginRouter)
        app.use(roleRouter)
        app.use(permissionRouter)
        
        app.listen(4000, () => {
            console.log(`User Service listen to port ${4000} `)
        })
    }
}


