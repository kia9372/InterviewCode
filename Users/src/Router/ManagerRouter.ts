import express from 'express';
import managerController from '../Http/Controller/ManagerController';
import UploadHanlder from '../Util/Multer/AvatarUser';

const managerRouter = express.Router();

managerRouter.post('/api/Manager', managerController.AddManager);

managerRouter.put('/api/ManagerInformation/:id', UploadHanlder.single('avatar'), managerController.UpdateManagerInfo);

managerRouter.put('/api/ManagerAccount/:id', managerController.UpdateManagerAccount);

managerRouter.put('/api/ChangePassword/:id', managerController.ChangePassword);

managerRouter.get('/api/GetManagerInforamtion/:id', managerController.GetManagerInformation);

managerRouter.get('/api/GetManagerAccountInfo/:id', managerController.GetManagerAccountInfo);

managerRouter.post('/api/Manager/GetAll', managerController.GetAllManagerPaging);


export { managerRouter }
