import express from 'express';
import loginController from '../Http/Controller/LoginController';
import UploadHanlder from '../Util/Multer/AvatarUser';

const loginRouter = express.Router();

loginRouter.post('/api/LoginManager', loginController.AdminLogin);

export { loginRouter }
