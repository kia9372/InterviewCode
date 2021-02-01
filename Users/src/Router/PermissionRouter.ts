import express from 'express';
import PermissionController from '../Http/Controller/PermissionController';

const permissionRouter = express.Router();

permissionRouter.post('/api/PermissionManager', PermissionController.AddPermission);

permissionRouter.put('/api/PermissionManager/:id', PermissionController.UpdatePermissionInfo);

permissionRouter.delete('/api/PermissionManager/:id', PermissionController.DeletePermission);

permissionRouter.get('/api/PermissionManager/GetAll', PermissionController.GetAllPermissionPaging);

permissionRouter.get('/api/PermissionManager/:id', PermissionController.GetPermissionInfo);

export { permissionRouter }