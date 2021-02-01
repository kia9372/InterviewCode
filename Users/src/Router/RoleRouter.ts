import express from 'express';
import roleController from '../Http/Controller/RoleController';

const roleRouter = express.Router();

roleRouter.post('/api/RoleManager', roleController.AddRole);

roleRouter.put('/api/RoleManager/:id', roleController.UpdateRoleInfo);

roleRouter.delete('/api/RoleManager/:id', roleController.DeleteRole);

roleRouter.post('/api/RoleManager/GetAll', roleController.GetAllRolePaging);

roleRouter.get('/api/RoleManager/:id', roleController.GetAllRolePermissionsByRoleId);

// roleRouter.get('/api/RoleManager/Info/:id', roleController.GetAllRolePermissionsByRoleId);


export { roleRouter }